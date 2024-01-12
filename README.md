# json-to-playwright

## How to use

```
// JSON input (assuming this is read from a file or other sources)
const jsonInput = `
{
    "title": "Recording 12/30/2023 at 8:49:56 AM",
    "steps": [
        {
            "type": "setViewport",
            "width": 723,
            "height": 993
        },
        {
            "type": "navigate",
            "url": "https://vuoriclothing.com/"
        },
        ...
    ]
}
`;

// Convert the JSON string to an object
const data: JsonInput = JSON.parse(jsonInput);

// Generate the script
const playwrightScript = generatePlaywrightScript(data);

// Write to a file (optional)
writeFile('playwrightTest.ts', playwrightScript, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

// Or you can directly log the script
console.log(playwrightScript);
```

## Generating actions only

To skip the `test` wrapper and `expect` assertions, you can output actions only by passing a second config object:

```js
const playwrightScript = generatePlaywrightScript(data, { actionsOnly: true });
```