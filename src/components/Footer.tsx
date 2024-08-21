import { RiFacebookFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

const resourcesLinks = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Products",
    link: "/product",
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Contact",
    link: "/contact",
  },
];

const categoryLink = [
  {
    label: "Assement",
    link: "/products#asset-management",
  },
  {
    label: "Drawing",
    link: "/products/#build-electrical-installation",
  },
  {
    label: "Manual Calculation",
    link: "/products/#build-electrical-installation",
  },
];

const socialMediaLinks = [
  {
    link: "/",
    Icon: RiInstagramFill,
  },
  {
    link: "/product",
    Icon: RiFacebookFill,
  },
  {
    link: "/categories",
    Icon: RiTwitterFill,
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bottom-0 left-0 border-t bg-primary pb-4 pt-12"
    >
      <div className="flex flex-col gap-6 px-6 lg:px-24">
        <div className="relative mx-auto flex w-full flex-col gap-6">
          <div className="flex flex-col gap-9 text-sm md:gap-20 lg:flex-row">
            <div className="flex flex-col gap-3">
              <figure className="relative h-20 w-20 lg:w-32">
                <Image
                  src={"/images/logo.png"}
                  alt="Logo BEATS"
                  fill
                  className="object-contain"
                />
              </figure>
              <div className="flex flex-col gap-1 text-primary-foreground">
                <h4 className="text-lg font-bold">2P8J+2VQ</h4>
                <p className="text-lg leading-relaxed tracking-wide lg:w-[68%]">
                  Kantor Pusat Gedung 19 PT PLN (Persero) Pusertif Jl.
                  Laboratorium No. 1 Kel. Duren Tiga, Kec. Pancoran, Kota
                  Jakarta Selatan 12760
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-8 tracking-wide max-lg:justify-between md:flex-row lg:gap-14 xl:gap-28">
              <div className="flex flex-col gap-2 md:gap-6">
                <h4 className="w-fit border-b-4 border-background text-lg font-bold text-primary-foreground lg:text-xl">
                  RESOURCES
                </h4>
                <ul className="flex flex-col gap-2 text-base text-slate-500 md:gap-4 md:text-lg">
                  {resourcesLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.link}
                        className="text-primary-foreground duration-200 hover:opacity-75"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 md:gap-6">
                <h4 className="w-fit border-b-4 border-background text-lg font-bold text-primary-foreground lg:text-xl">
                  CATEGORY
                </h4>
                <ul className="flex flex-col gap-2 text-base text-slate-500 md:gap-4 md:text-lg">
                  {categoryLink.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.link}
                        className="text-primary-foreground duration-200 hover:opacity-75"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 md:gap-6">
                <h4 className="w-fit border-b-4 border-background text-lg font-bold text-primary-foreground lg:text-xl">
                  FOLLOW US
                </h4>
                <ul className="flex gap-2 text-base text-slate-500 md:gap-4 md:text-lg">
                  {socialMediaLinks.map((link) => (
                    <a
                      href={link.link}
                      key={link.link}
                      className="text-3xl text-primary-foreground duration-200 hover:opacity-75"
                    >
                      <link.Icon />
                    </a>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex w-full justify-center">
          <small className="text-base font-medium text-primary-foreground">
            &copy; Copyright 2024 PLN Haleyora Power . All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
