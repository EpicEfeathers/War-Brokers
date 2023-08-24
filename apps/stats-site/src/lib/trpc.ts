import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "@warbrokers/wbapi/build/router"

export default createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: "https://wbp-wbapi.web.app/trpc" })],
})
