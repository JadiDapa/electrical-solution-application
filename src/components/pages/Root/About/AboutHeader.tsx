import React from "react";
import Image from "next/image";

export default function AboutHeader() {
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
        loading="eager"
      />
      <h3 className="max-w-4xl text-center text-2xl font-bold text-yellow-300">
        PLN Haleyora Power
      </h3>
      <h1 className="max-w-4xl text-center text-4xl font-bold text-primary md:text-5xl lg:text-7xl/none">
        ELSA
      </h1>
      <h2 className="text-center text-3xl font-thin text-background md:text-5xl lg:text-7xl/none">
        Electronic Solution Application
      </h2>
      <p className="max-w-3xl text-center text-lg text-background">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim voluptas
        dignissimos ab iusto nemo inventore temporibus? Lorem ipsum dolor sit
        amet consectetur adipisicing.
      </p>
    </section>
  );
}
