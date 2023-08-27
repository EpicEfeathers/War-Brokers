import { error } from "@sveltejs/kit"
import type { Player } from "@warbrokers/types/src/player"
import { ObjectId } from "bson"
import dayjs from "dayjs"

import trpc from "$lib/trpc"

import type { PageServerLoad } from "./$types"

export const load = (async ({ params }) => {
    const { uid } = params

    if (!uid) throw error(404, "Not Found")

    try {
        const player: Player = await trpc.players.getPlayer.query({ uid })
        return {
            player,
            timestamp: dayjs(new ObjectId(player.uid).getTimestamp()).format(
                "MMMM D, YYYY",
            ),
        }
    } catch {
        throw error(404, "Not Found")
    }
}) satisfies PageServerLoad
