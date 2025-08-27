import type { Page } from "@playwright/test"

export async function debounceDom(page: Page, pollDelay = 100, stableDelay = 1000) {
    let markupPrevious = ""
    const timerStart = new Date()
    let isStable = false

    while (!isStable) {
      const markupCurrent = await page.evaluate(() => document.body.innerHTML)
      const elapsed = new Date().getTime() - timerStart.getTime()
      if (markupCurrent === markupPrevious) {
        isStable = stableDelay <= elapsed
      } else {
        markupPrevious = markupCurrent
      }
      if (!isStable) {
        await new Promise((resolve) => setTimeout(resolve, pollDelay))
      }
    }
  }