import "./globals.css";
import "./pokemon-theme.css";

import { FavoritesProvider } from "./contexts/FavoritesContext";

import { Oxanium } from "next/font/google";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "PokeNow: Your Pokémon Encyclopedia",
  description:
    "Dive into the world of Pokémon! Discover stats, abilities, evolutions, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${oxanium.className} bg-gradient-to-br from-red-100 to-blue-100 min-h-screen `}
      >
        <FavoritesProvider>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-blue-600">
                PokeNow: Unleash the Adventure
              </h1>
              <p className="text-gray-600">
                Dive into the world of Pokémon – discover stats, abilities, and
                more!
              </p>
            </header>

            <main>{children}</main>
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
