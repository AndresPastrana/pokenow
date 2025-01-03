import "./globals.css";
import "./pokemon-theme.css";
import { Inter } from "next/font/google";
import { FavoritesProvider } from "./contexts/FavoritesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PokeNow",
  description: "Search and explore Pokémon information",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-red-100 to-blue-100 min-h-screen p-4 sm:p-6 md:p-8`}
      >
        <FavoritesProvider>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-blue-600">PokeNow</h1>
              <p className="text-gray-600">
                Search and explore Pokémon information
              </p>
            </header>
            <main>{children}</main>
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
