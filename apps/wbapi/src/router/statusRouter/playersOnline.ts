import {
    playersOnline,
    responseSchema,
} from "@warbrokers/fetch/src/status/playersOnline"
import { z } from "zod"

import { reason2TRPCError } from "@/errors"
import { publicProcedure } from "@/trpc"

export default (tag: string) =>
    publicProcedure
        .meta({
            openapi: {
                method: "GET",
                path: "/status/playersOnline",
                tags: [tag],
            },
        })
        .input(z.undefined())
        .output(responseSchema)
        .query(async () => {
            const res = await playersOnline()

            if (!res.success) throw reason2TRPCError(res.reason)

            return res.data
        })
