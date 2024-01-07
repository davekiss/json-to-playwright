"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function to generate Playwright script
function generatePlaywrightScript(data) {
    let script = `test.describe("${data.title}", () => {\n`;
    script += `  test("tests ${data.title}", async ({ page }) => {\n`;
    data.steps.forEach(step => {
        if (step.type === "setViewport") {
            script += setViewport(step);
        }
        else if (step.type === "navigate") {
            script += navigateToUrl(step);
        }
        else if (step.type === "click" || step.type === "change") {
            script += performAction(step);
        }
        if (step.assertedEvents) {
            step.assertedEvents.forEach(event => {
                if (event.type === "navigation") {
                    script += `    expect(page.url()).toBe('${event.url}');\n`;
                }
            });
        }
    });
    script += `  });\n`;
    script += `});\n`;
    return script;
}
exports.default = generatePlaywrightScript;
;
const setViewport = (step) => {
    return `    await page.setViewportSize({ width: ${step.width}, height: ${step.height} });\n`;
};
const navigateToUrl = (step) => {
    return `    await page.goto("${step.url}");\n`;
};
const performAction = (step) => {
    const action = step.type === "click" ? "click()" : `type("${step.value}")`;
    const selector = chooseBestSelector(step.selectors);
    return selector ? `    await page.locator("${selector}").${action};\n` : '';
};
const chooseBestSelector = (selectors) => {
    if (!selectors)
        return undefined;
    return selectors.flatMap(s => s).find(sel => !sel.startsWith("xpath") && !sel.startsWith("pierce") && !sel.startsWith("aria"));
};
// module.exports = generatePlaywrightScript
