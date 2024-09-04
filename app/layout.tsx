import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Littan",
  description:
    "Descubre nuestra tienda de ropa en línea, especializada en diseños únicos inspirados en la cianotipia. Cada prenda combina arte y estilo para ofrecerte una moda original y auténtica.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.className}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
