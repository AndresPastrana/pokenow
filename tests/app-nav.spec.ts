import test, { expect } from "@playwright/test";

test.describe("App Navigation Tests", () => {
  test("should navigate from the Home page to the Favorites page", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "Go to Favorites" }).click();
    await page.waitForURL("http://localhost:3000/favorites");

    await Promise.all([
      page.getByRole("heading", { name: "Favorites" }).isVisible(),
      page.getByText("Your favorite Pokémon").isVisible(),
    ]);
  });

  test("should navigate from the Home page to a Pokémon's detail page, load its data, and return to Home page", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");

    await page.waitForTimeout(2000);
    const section = page.getByTestId("pokemons_section");

    const firstLink = await page
      .locator('[data-testid="pokemons_section"] a')
      .first();

    await Promise.all([section.isVisible(), firstLink.isVisible()]);
    const href = await firstLink.getAttribute("href");
    const name = href?.split("/pokemon/")[1];

    await firstLink.click();

    await page.waitForTimeout(1000);

    await page.waitForURL(`http://localhost:3000/pokemon/${name}`);
    const detailsContainer = page.getByTestId("pokemon_details_container");
    await detailsContainer.isVisible();
    expect(detailsContainer.getByTestId(name as string)).toHaveText(
      name as string
    );

    const backButton = page.getByRole("button", { name: "Back to List" });
    await backButton.isVisible();
    await backButton.click();

    await expect(page).toHaveURL("http://localhost:3000/");
  });
});
