import test from "@playwright/test";

test.describe("Ui render", () => {
  test("should display main elements on the homepage", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await Promise.all([
      page.getByRole("heading", { name: "PokeNow" }).isVisible(),
      page.getByText("Search and explore Pokémon").isVisible(),
      page.getByPlaceholder("Search Pokémon by name or ID").isVisible(),
      page.getByRole("button", { name: "Go to Favorites" }).isVisible(),
      page
        .locator("div")
        .filter({ hasText: /^base experience$/ })
        .isVisible(),
      page
        .locator("div")
        .filter({ hasText: /^height$/ })
        .isVisible(),
      page
        .locator("div")
        .filter({ hasText: /^weight$/ })
        .isVisible(),
    ]);
  });
});
