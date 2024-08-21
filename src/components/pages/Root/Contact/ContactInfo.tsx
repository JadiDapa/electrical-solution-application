import ContactCard from "@/components/pages/Root/Contact/ContactCard";
import { Globe, Mail, MapPin, MessagesSquare } from "lucide-react";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const contactCardContent = [
  {
    Icon: MessagesSquare,
    title: "Call or Message Us",
    description: "from your device",
    content: (
      <div className="space-y-1 text-start">
        <div className="flex gap-3">
          <div className="w-24">Phone :</div>(021) 7919 2517
        </div>
        <div className="flex gap-3">
          <div className="w-24">Fax :</div>(021) 7919 2517
        </div>
        <div className="flex gap-3">
          <div className="w-24">Whatsapp :</div>0811 1011 810
        </div>
      </div>
    ),
  },
  {
    Icon: MapPin,
    title: "Visit Us",
    description: "lets discusss in our location",
    content: (
      <div className="space-y-1">
        <p>Kantor Pusat</p>
        <p>Gedung 19 PT PLN (Persero) Pusertif</p>
        <p>Jl. Laboratorium No. 1</p>
        <p>Kel. Duren Tiga, Kec. Pancoran,</p>
        <p>Kota Jakarta Selatan 12760</p>
      </div>
    ),
  },
];

export default function ContactInfo() {
  return (
    <section
      id="product-header"
      className="relative flex min-h-screen w-full flex-col items-center gap-7 px-6 pb-24 pt-40 lg:px-24"
    >
      <Image
        src="/images/product-header.jpg"
        alt="Product header background image"
        fill
        className="absolute -z-10 object-cover object-top brightness-[30%]"
        loading="eager"
      />
      <div className="w-full space-y-12">
        <div className="flex flex-col items-center justify-center gap-3 text-center lg:text-start">
          <h1 className="max-w-2xl text-center text-4xl font-semibold text-background lg:text-6xl">
            We are here for you, contact us at{" "}
            <span className="text-primary">anytime</span>
          </h1>
          <p className="font-medium text-background">
            Have any question about any product or our services? please reach
            out
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex-[2] space-y-6">
            <div className="flex items-center gap-3">
              <div className="grid size-14 place-items-center rounded-lg bg-primary text-background">
                <FaInstagram className="size-8" />
              </div>
              <div className="">
                <p className="text-lg font-medium text-background">Instagram</p>
                <p className="text-xl font-semibold text-primary">
                  @haleyorapower
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-14 place-items-center rounded-lg bg-primary text-background">
                <FaXTwitter className="size-8" />
              </div>
              <div className="">
                <p className="text-lg font-medium text-background">Twitter/X</p>
                <p className="text-xl font-semibold text-primary">
                  pthaleyorapower
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-14 place-items-center rounded-lg bg-primary text-background">
                <FaFacebookF className="size-8" />
              </div>
              <div className="">
                <p className="text-lg font-medium text-background">Facebook</p>
                <p className="text-xl font-semibold text-primary">
                  PT Haleyora Power
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-14 place-items-center rounded-lg bg-primary text-background">
                <FaLinkedin className="size-8" />
              </div>
              <div className="">
                <p className="text-lg font-medium text-background">Linked In</p>
                <p className="text-xl font-semibold text-primary">
                  pt-haleyora-power
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-14 place-items-center rounded-lg bg-primary text-background">
                <FaYoutube className="size-8" />
              </div>
              <div className="">
                <p className="text-lg font-medium text-background">Youtube</p>
                <p className="text-xl font-semibold text-primary">
                  pthaleyorapower_id
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-[3] justify-end gap-6 text-slate-800">
            {contactCardContent.map((contact, index) => (
              <ContactCard
                index={index}
                key={contact.title}
                Icon={contact.Icon}
                title={contact.title}
                description={contact.description}
                content={contact.content}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
