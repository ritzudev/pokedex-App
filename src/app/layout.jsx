import { TopScroll } from "@/components/topscroll";

export const metadata = {
  title: "Pokedex - Ritzudev",
  description: "Pokedex development by Ritzudev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <title>Pokedex App</title>
      </head>
      <body>
        {/* <Navigation /> */}
        {children}
        <TopScroll />
      </body>
    </html>
  );
}