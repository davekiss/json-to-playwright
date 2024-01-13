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

export default function generatePlaywrightScript(data: JsonInput, options?: { actionsOnly: boolean }): string;

declare const setViewport: (step: Step) => string;

declare const navigateToUrl: (step: Step) => string;

declare const performAction: (step: Step) => string;

declare const chooseBestSelector: (selectors: string[][] | undefined) => string | undefined;
