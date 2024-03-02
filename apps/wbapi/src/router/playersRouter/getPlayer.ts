import { TRPCError } from "@trpc/server"
import type { Player } from "@warbrokers/types/src/player"
import { playerSchema } from "@warbrokers/types/src/player"
import { z } from "zod"

import { reason2TRPCError } from "@/errors"
import { env } from "@/index"
import { publicProcedure } from "@/trpc"
import type { Result } from "@/util/types"
import { FailReason } from "@/util/types"

export default (tag: string) =>
    publicProcedure
        .meta({
            openapi: {
                method: "GET",
                path: "/players/getPlayer",
                description: "Retrieves player data",
                tags: [tag],
            },
        })
        .input(z.object({ uid: z.string() }))
        .output(playerSchema)
        .query(async ({ input }) => {
            const { uid } = input

            const res = await getPlayer(uid)

            if (!res.success) {
                if (res.reason === FailReason.DBConnectionFail)
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: `Player with UID "${uid}" was not found. Is the UID valid?`,
                    })

                throw reason2TRPCError(res.reason)
            }

            return res.data
        })

export async function getPlayer(uid: Player["uid"]): Promise<Result<Player>> {
    const res = await fetch(
        `${env.WB_DB_BASE}/get_player_stats.php?uid=${uid}`,
        {
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(`${env.WB_DB_ID}:${env.WB_DB_PW}`).toString(
                        "base64",
                    ),
            },
        },
    )

    if (!res.ok) {
        console.log(
            `failed to get player stats of ${uid}. DB responded:`,
            await res.text(),
        )
        return {
            success: false,
            reason: FailReason.DBConnectionFail,
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = await res.json()

    // this check works on both null and undefined values because JS
    if (raw["time_alive_longest"] != null)
        raw["time_alive_longest"] = Number(raw["time_alive_longest"])

    const parseResult = playerSchema.safeParse(raw)
    if (!parseResult.success)
        return {
            success: false,
            reason: FailReason.SchemaValidationFail,
        }

    return {
        success: true,
        data: parseResult.data,
    }
}
