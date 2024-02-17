import { initializeApp } from "firebase-admin/app"
import { setGlobalOptions } from "firebase-functions/v2"
import { onRequest } from "firebase-functions/v2/https"

import { app } from "@/app"
import { WB_DB_IP, WB_ID, WB_PW } from "@/env"

initializeApp()

// Set the maximum instances to 10 for all functions
// limitations set by quota
setGlobalOptions({ maxInstances: 10 })

export const api = onRequest(
    {
        region: "us-central1",
        memory: "256MiB",
        secrets: [WB_ID, WB_PW, WB_DB_IP],
    },
    app,
)
