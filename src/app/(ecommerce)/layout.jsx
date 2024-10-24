import localFont from "next/font/local";
import "../globals.css";
import SideBar from "@/components/ecommerce/sidebar/SideBar";
import Footer from "@/components/ecommerce/footer/Footer";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Rous Boutique",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white dark:bg-black text-zinc-500 dark:text-zinc-400  antialiased`}
      >
        <SideBar />
        <main className=" pt-20 px-4 md:px-16 pb-16 ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
