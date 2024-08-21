import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="mx-auto overflow-hidden scroll-smooth">{children}</main>
      <Footer />
    </>
  );
}
