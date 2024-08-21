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

const socialMediaData = [
  {
    name: "Instagram",
    Icon: FaInstagram,
    handle: "@haleyorapower",
  },
  {
    name: "Twitter/X",
    Icon: FaXTwitter,
    handle: "pthaleyorapower",
  },
  {
    name: "Facebook",
    Icon: FaFacebookF,
    handle: "PT Haleyora Power",
  },
  {
    name: "Linked In",
    Icon: FaLinkedin,
    handle: "pt-haleyora-power",
  },
  {
    name: "Youtube",
    Icon: FaYoutube,
    handle: "pthaleyorapower_id",
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
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:gap-0">
          <div className="order-2 mx-auto flex-[2] space-y-4 lg:order-1 lg:mx-0 lg:space-y-6">
            {socialMediaData.map((social, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-primary text-background lg:size-14">
                  <social.Icon className="size-6 lg:size-8" />
                </div>
                <div>
                  <p className="font-medium text-background lg:text-lg">
                    {social.name}
                  </p>
                  <p className="text-lg font-semibold text-primary lg:text-xl">
                    {social.handle}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-1 flex flex-[3] flex-col justify-end gap-6 text-slate-800 lg:order-2 lg:flex-row">
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
