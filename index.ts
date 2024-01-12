// Define the structure of your JSON
export interface Step {
    type: string;
    width?: number;
    height?: number;
    url?: string;
    selectors?: string[][];
    value?: string;
    assertedEvents?: { type: string; url: string; title: string }[];
    deviceScaleFactor?: number;
    isMobile?: boolean;
    hasTouch?: boolean;
    isLandscape?: boolean;
    offsetX?: number;
    offsetY?: number;
    target?: string;
}

export interface JsonInput {
    title: string;
    steps: Step[];
}

// Function to generate Playwright script
export default function generatePlaywrightScript(data: JsonInput, options?: { actionsOnly: boolean }): string {
    let script = '';

    if (options?.actionsOnly !== true) {
        script += `test.describe("${data.title}", () => {\n`;
        script += `  test("tests ${data.title}", async ({ page }) => {\n`;
    }

    data.steps.forEach(step => {
        if (step.type === "setViewport") {
            script += setViewport(step);
        } else if (step.type === "navigate") {
            script += navigateToUrl(step);
        } else if (step.type === "click" || step.type === "change") {
            script += performAction(step);
        }

        if (step.assertedEvents && options?.actionsOnly !== true) {
            step.assertedEvents.forEach(event => {
                if (event.type === "navigation") {
                    script += `    expect(page.url()).toBe('${event.url}');\n`;
                }
            });
        }
    });

    if (options?.actionsOnly !== true) {
        script += `  });\n`;
        script += `});\n`;
    }

    return script;
};

const setViewport = (step: Step): string => {
    return `    await page.setViewportSize({ width: ${step.width}, height: ${step.height} });\n`;
};

const navigateToUrl = (step: Step): string => {
    return `    await page.goto("${step.url}");\n`;
};

const performAction = (step: Step): string => {
    const action = step.type === "click" ? "click()" : `type("${step.value}")`;
    const selector = chooseBestSelector(step.selectors);
    return selector ? `    await page.locator("${selector}").${action};\n` : '';
};

const chooseBestSelector = (selectors: string[][] | undefined): string | undefined => {
    if (!selectors) return undefined;
    return selectors.flatMap(s => s).find(sel => !sel.startsWith("xpath") && !sel.startsWith("pierce") && !sel.startsWith("aria"));
};
