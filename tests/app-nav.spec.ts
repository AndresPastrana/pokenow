import test from "@playwright/test";

test.describe("App Navigation Tests", () => {
  test("should navigate from the Home page to the Favorites page", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Go to Favorites" }).click();
    await page.waitForURL("/favorites");

    await Promise.all([
      page.getByRole("heading", { name: "Favorites" }).isVisible(),
      page.getByText("Your favorite Pokémon").isVisible(),
    ]);
  });
});
