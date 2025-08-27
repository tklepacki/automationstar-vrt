import { chromium } from "@playwright/test"

const start = async () => {
  console.log("STARTING")
  const server = await chromium
    .launchServer({
      headless: true,
      ignoreDefaultArgs: false,
      devtools: false,
      port: 9292,
      wsPath: "/pw",
      args:[],
      logger: {
        isEnabled: (name, severity) => severity === "error" || severity === "warning",
        log: (name, severity, message, args, metadata) => {
          console.log({ name, severity, message, args, metadata })
        },
      },
    })
    .catch((e) => console.error(e))
  console.log(`SERVER STARTED AT ${server.wsEndpoint()}`)
}

start()
