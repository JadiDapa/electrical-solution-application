import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User } from "lucide-react";
import Image from "next/image";

export default function SendMessage() {
  return (
    <section
      id="contact-message"
      className="space-y-12 bg-primary/5 px-6 py-12 lg:px-24 lg:py-24"
    >
      <div className="flex flex-col items-center gap-12 space-y-3 lg:flex-row lg:gap-28">
        <div className="space-y-6">
          <h1 className="max-w-lg text-4xl font-semibold">
            Or you can <span className="text-primary">directly</span> sent
            message to us
          </h1>
          <p className="max-w-md font-medium">
            Your message will direcly sent into our email, so happily contact us
            right now!
          </p>
          <div className="flex-1 space-y-3">
            <div className="flex gap-3">
              <div className="relative w-1/2 overflow-hidden rounded-full border border-border">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  size={20}
                  strokeWidth={1.7}
                />
                <Input
                  className="border-none ps-12"
                  placeholder="Your full name"
                />
              </div>
              <div className="relative w-1/2 overflow-hidden rounded-full border border-border">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  size={20}
                  strokeWidth={1.7}
                />
                <Input
                  className="border-none ps-12"
                  placeholder="Your email addrress "
                />
              </div>
            </div>
            <Textarea
              className="h-36 rounded-2xl border-border"
              placeholder="Type your messages here"
            />
            <Button className="w-full rounded-full px-6 lg:w-auto">
              Send Message
            </Button>
          </div>
        </div>
        <div className="">
          <figure className="relative z-30 aspect-video w-[600px] overflow-hidden">
            <Image
              src="/images/map.png"
              alt="Map area operaional"
              fill
              className="object-contain object-center"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
