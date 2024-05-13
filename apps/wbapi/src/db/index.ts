import type { Player } from "@warbrokers/types/src/player"
import { and, count, desc, eq, isNotNull, like, sql } from "drizzle-orm"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import { env } from "@/index"
import type { Response as SearchByNameResponse } from "@/router/playersRouter/searchByName"
import type { Result } from "@/types"
import { FailReason } from "@/types"

import type { PlayerSelect } from "./schema"
import { players } from "./schema"

let client: postgres.Sql
let db: PostgresJsDatabase

export async function initDB() {
    client = postgres(
        env.DATABASE_URL,
        // Disable prefetch as it is not supported for "Transaction" pool mode
        { prepare: false },
    )
    db = drizzle(client)
}

export async function setPlayer(player: Player) {
    const newPlayer = {
        nick: player.nick,
        nicklower: player.nicklower,
        gamesELO: player.gamesELO,
        killsELO: player.killsELO,
        level: player.level,
        xp: player.xp,
        squad: player.squad,
        coins: player.coins,
        steam: player.steam,
        number_of_jumps: player.number_of_jumps,
    }

    return await db
        .insert(players)
        .values({
            uid: player.uid,
            ...newPlayer,
        })
        .onConflictDoUpdate({
            target: players.uid,
            set: newPlayer,
            where: eq(players.uid, player.uid),
        })
}

/**
 * case-agnostic player search by nickname
 */
export async function searchPlayerByName(
    query: string,
): Promise<SearchByNameResponse> {
    return await db
        .select({
            uid: players.uid,
            nick: players.nick,
        })
        .from(players)
        // I know this is shit code but it does its job and is quite performant
        .where(like(players.nicklower, `%${query.toLocaleLowerCase()}%`))
        .limit(20)
}

export async function getSquads(): Promise<string[]> {
    return (
        await db
            .selectDistinct({ squad: players.squad })
            .from(players)
            .orderBy(players.squad)
    )
        .map(({ squad }) => squad)
        .filter((x) => x) // remove empty string
}

export async function getSquadMembers(
    squadName: string,
): Promise<PlayerSelect[]> {
    return await db.select().from(players).where(eq(players.squad, squadName))
}

/**
 * Calculates the percentile of a player's statistic.
 * i.e. This player is better than X percent of players.
 */
export async function getPercentile(
    key: "xp" | "gamesELO" | "killsELO",
    uid: Player["uid"],
): Promise<Result<number>> {
    let n: number // number of players with worse stats than the player we're comparing with
    let N: number // total number of players

    {
        const subQuery = db
            .select({
                uid: players.uid,
                n: sql
                    .raw(`RANK() OVER (ORDER BY "${key}" ASC)`)
                    .as<number>("n"),
            })
            .from(players)
            .as("sq")

        const arr = await db
            .select({ n: subQuery.n })
            .from(subQuery)
            .where(eq(subQuery.uid, uid))

        if (arr.length < 1)
            return {
                success: false,
                reason: FailReason.PlayerNotFound,
            }

        n = arr[0].n - 1 // exclude self
    }

    {
        const arr = await db.select({ N: sql<number>`count(*)` }).from(players)

        N = arr[0].N
    }

    return {
        success: true,
        data: 100 * (n / N),
    }
}

export async function getDBPlayerCount(): Promise<number> {
    return (await db.select({ count: count() }).from(players))[0].count
}

type RankingFunc = (limit: number, offset: number) => Promise<unknown[]>

export const getKillsEloRanking = (async (
    limit: number,
    offset: number = 0,
) => {
    return db
        .select({
            uid: players.uid,
            nick: players.nick,
            killsELO: players.killsELO,
        })
        .from(players)
        .where(isNotNull(players.killsELO))
        .orderBy(desc(players.killsELO))
        .limit(limit)
        .offset(offset) as Promise<
        {
            uid: string
            nick: string
            killsELO: number
        }[]
    >
}) satisfies RankingFunc

export const getGamesEloRanking = (async (
    limit: number,
    offset: number = 0,
) => {
    return db
        .select({
            uid: players.uid,
            nick: players.nick,
            gamesELO: players.gamesELO,
        })
        .from(players)
        .where(isNotNull(players.gamesELO))
        .orderBy(desc(players.gamesELO))
        .limit(limit)
        .offset(offset) as Promise<
        {
            uid: string
            nick: string
            gamesELO: number
        }[]
    >
}) satisfies RankingFunc

export const getXPRanking = (async (limit: number, offset: number = 0) => {
    return db
        .select({
            uid: players.uid,
            nick: players.nick,
            xp: players.xp,
            level: players.level,
        })
        .from(players)
        .where(and(isNotNull(players.xp), isNotNull(players.level)))
        .orderBy(desc(players.xp))
        .limit(limit)
        .offset(offset) as Promise<
        {
            uid: string
            nick: string
            xp: number
            level: number
        }[]
    >
}) satisfies RankingFunc
