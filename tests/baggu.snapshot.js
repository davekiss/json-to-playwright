test.describe("Baggu", () => {
  test("tests Baggu", async ({ page }) => {
    await page.setViewportSize({ width: 935, height: 989 });
    await page.goto("https://www.baggu.com/");
    expect(page.url()).toBe('https://www.baggu.com/');
    await page.locator("input").click();
    await page.locator("input").type("abc@example.com");
    await page.locator("#footer button").click();
  });
});
