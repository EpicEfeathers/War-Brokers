import { z } from "zod"

import { PlayerNotFoundTRPCError, reason2TRPCError } from "@/errors"
import { db } from "@/index"
import { uid } from "@/querySchema"
import { publicProcedure } from "@/trpc"
import { FailReason } from "@/types"

export default (tags: string[]) =>
    publicProcedure
        .meta({
            openapi: {
                method: "GET",
                path: "/players/percentile/gamesElo",
                description: "Retrieves percentile of player's games Elo",
                tags,
            },
        })
        .input(z.object({ uid }))
        .output(z.number())
        .query(async ({ input }) => {
            const { uid } = input

            const res = await db.getPercentile("gamesELO", uid)

            if (!res.success) {
                if (res.reason === FailReason.PlayerNotFound)
                    throw PlayerNotFoundTRPCError(uid)

                throw reason2TRPCError(res.reason)
            }

            return res.data
        })
