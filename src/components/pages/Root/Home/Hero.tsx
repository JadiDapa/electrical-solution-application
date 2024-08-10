import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex w-full flex-col justify-between gap-12 px-6 pb-6 pt-40 lg:flex-row lg:px-24"
    >
      <div className="flex-[4] space-y-8 pb-6">
        <div className="flex w-full items-center md:space-x-4">
          <h2 className="min-w-fit rounded-full bg-primary/5 px-4 py-1.5 text-sm text-primary ring-2 ring-primary">
            ELSA : PLN Haleyora Power
          </h2>
        </div>
        <h1 className="text-4xl font-bold md:text-5xl lg:text-7xl/none">
          Priority Customer Power{" "}
          <span className="text-primary">Solutions</span>
        </h1>
        <p className="text-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
          voluptas dignissimos ab iusto nemo inventore temporibus?
        </p>
        <div className="flex items-center gap-6">
          <Link href={"/tentang/profil"}>
            <Button className="rounded-full border border-transparent px-6 transition hover:border-primary hover:bg-transparent hover:text-primary">
              Lebih Banyak
            </Button>
          </Link>
          <Link
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSffNLK713o58R2V_0Rh2pTtyyXzWeBahR1Oj_gxmztWRomzpA/viewform"
            }
            className="font-medium text-primary"
          >
            Lebih Banyak
          </Link>
        </div>
      </div>
      <div className="relative w-full flex-[3] md:block">
        <div className="absolute top-6 z-20 flex animate-float items-center gap-2 rounded-full bg-white px-6 py-2 text-lg font-semibold text-primary shadow-sm">
          <div className="grid size-7 place-items-center rounded-full bg-primary text-white">
            <ClipboardList className="" size={18} />
          </div>
          <p>ASSEMENT</p>
        </div>
        <div className="absolute -right-6 top-24 z-20 flex animate-float items-center gap-3 rounded-full bg-white px-6 py-2 text-lg shadow-sm">
          <p>
            <span className="font-bold text-primary">500+ </span> Statisfied
            User
          </p>
        </div>

        <Image
          src="/images/dots.svg"
          alt="Dots Svg"
          width={200}
          height={200}
          className="absolute left-0 top-4"
        />

        <Image
          src="/images/dots-light.svg"
          alt="Dots Svg"
          width={280}
          height={280}
          className="absolute bottom-4 right-0"
        />
        <figure className="relative z-10 mx-auto h-[420px] w-[380px] overflow-hidden border-b-4 border-secondary">
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
