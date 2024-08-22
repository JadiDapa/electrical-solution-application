import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex w-full flex-col justify-between gap-12 px-6 pb-6 pt-32 lg:flex-row lg:px-24 lg:pt-40"
    >
      <div className="space-y-4 pb-6 md:space-y-6 lg:flex-[4] lg:space-y-8">
        <div className="flex w-full items-center justify-center md:space-x-4 lg:justify-normal">
          <h2 className="min-w-fit rounded-full bg-primary/5 px-4 py-1.5 text-sm text-primary ring-2 ring-primary">
            ELSA : PLN Haleyora Power
          </h2>
        </div>
        <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-start lg:text-7xl/none">
          Priority Customer Power{" "}
          <span className="text-primary">Solutions</span>
        </h1>
        <p className="text-center md:text-lg lg:text-start">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
          voluptas dignissimos ab iusto nemo inventore temporibus?
        </p>
        <div className="flex items-center justify-center gap-4 md:gap-6 lg:justify-normal">
          <Link href={"/products"}>
            <Button className="rounded-full border border-transparent px-6 transition hover:border-primary hover:bg-transparent hover:text-primary">
              Our Products
            </Button>
          </Link>
          <Link
            href={"#product-core-business"}
            className="font-medium text-primary"
          >
            Explore More
          </Link>
        </div>
      </div>
      <div className="relative w-full md:block lg:flex-[3]">
        <div className="absolute top-0 z-20 flex animate-float items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm lg:top-6 lg:px-6">
          <div className="grid size-6 place-items-center rounded-full bg-primary text-white lg:size-7">
            <ClipboardList className="size-4 lg:size-5" />
          </div>
          <p className="font-semibold text-primary lg:text-lg">ASSEMENT</p>
        </div>

        <figure className="absolute left-0 top-4 size-48">
          <Image
            src="/images/dots.svg"
            alt="Dots Svg"
            fill
            className="object-contain object-center"
          />
        </figure>

        <figure className="absolute right-0 top-10 h-16 w-36 animate-float lg:h-20 lg:w-48">
          <Image
            src="/images/logo-elsa-full.png"
            alt="Logo"
            fill
            className="object-contain object-center lg:object-center"
          />
        </figure>

        <figure className="absolute bottom-4 right-0 size-52 lg:size-72">
          <Image
            src="/images/dots-light.svg"
            alt="Dots Svg"
            fill
            className="object-contain object-center"
          />
        </figure>
        <figure className="relative z-10 mx-auto h-[360px] w-[300px] overflow-hidden border-b-4 border-secondary lg:h-[420px] lg:w-[380px]">
          <Image
            src="/images/hero.png"
            alt="Hero Image"
            fill
            className="object-contain object-bottom"
          />
        </figure>
      </div>
    </section>
  );
}
