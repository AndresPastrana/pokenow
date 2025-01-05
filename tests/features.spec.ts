import test, { expect } from "@playwright/test";

test.describe("Favorite Button Tests", () => {
  test("Verify the first non-favorite button and Pokémon name from the button", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(1000);

    // Wait for the first non-favorite button to be visible
    const favoriteButton = await page
      .getByTestId(/btn_is_favorite_false_/)
      .first(); // Match data-testid that starts with "btn_is_favorite_false_"

    // Verify the button text
    await expect(favoriteButton).toHaveText("Add to Favorites");

    // Extract the Pokémon name from the `data-testid` attribute
    const dataTestId = await favoriteButton.getAttribute("data-testid");
    const pokemonName = dataTestId?.split("_")[4]; // The name is now at position 3

    // Click the button to add the Pokémon to favorites
    await favoriteButton.click();

    // Navigate to the Favorites page
    await page.getByText("Go to Favorites").click();
    await page.waitForTimeout(2000);

    // Verify the URL of the Favorites page
    await expect(page).toHaveURL(/\/favorites/);

    // Verify the Pokémon is visible on the Favorites page
    await expect(page.getByText(pokemonName as string)).toBeVisible();
  });
});
