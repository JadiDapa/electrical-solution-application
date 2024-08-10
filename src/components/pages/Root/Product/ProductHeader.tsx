import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductHeader() {
  return (
    <section
      id="product-header"
      className="relative flex min-h-screen w-full flex-col items-center gap-7 px-6 pb-6 pt-40 lg:px-24"
    >
      <Image
        src="/images/product-header.jpg"
        alt="Product header background image"
        fill
        className="absolute -z-10 object-cover object-top brightness-[30%]"
      />
      <h2 className="flex min-w-fit items-center gap-3 rounded-full bg-sky-50 px-4 py-1.5 text-sm text-primary ring-2 ring-primary">
        <Zap size={20} />
        PRODUCT
      </h2>
      <h1 className="max-w-4xl text-center text-4xl font-bold text-background md:text-5xl lg:text-7xl/none">
        Electrical Solution <span className="text-primary">Product</span>
      </h1>
      <p className="max-w-3xl text-center text-lg text-background">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim voluptas
        dignissimos ab iusto nemo inventore temporibus? Lorem ipsum dolor sit
        amet consectetur adipisicing.
      </p>
      <div className="mx-auto flex max-w-fit items-center gap-6">
        <Link href={"/tentang/profil"}>
          <Button className="rounded-full border border-transparent px-6 transition hover:border-primary hover:bg-transparent hover:text-primary">
            Assets Management
          </Button>
        </Link>
        <Link
          href={
            "https://docs.google.com/forms/d/e/1FAIpQLSffNLK713o58R2V_0Rh2pTtyyXzWeBahR1Oj_gxmztWRomzpA/viewform"
          }
          className="font-medium text-primary"
        >
          <Button
            variant="outline"
            className="rounded-full border border-primary bg-transparent px-6 transition hover:bg-primary hover:text-background"
          >
            Build Electrical Installation
          </Button>
        </Link>
      </div>
    </section>
  );
}
