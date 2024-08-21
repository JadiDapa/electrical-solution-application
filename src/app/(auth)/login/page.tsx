import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/pages/Auth/Login/LoginForm";

export default function LoginPage() {
  return (
    <section
      id="login"
      className="relative h-screen w-full overflow-hidden lg:flex"
    >
      <section
        id="login-form"
        className="flex-[1] px-8 py-20 sm:px-32 lg:px-24"
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-full bg-white shadow-lg">
            <ArrowLeft size={20} />
          </div>
          <div className="text-lg font-semibold">Back</div>
        </Link>
        <header className="mt-2">
          <h1 className="text-4xl font-bold text-primary drop-shadow-[0_2px_1px_#00000032]">
            Login
          </h1>
          <p className="mt-2 leading-6">
            Silahkan login terlebih dahulu sebelum masuk lebih lanjut!
          </p>
        </header>
        <div className="mt-2">
          <LoginForm />
        </div>
        <div className="mt-4 text-center text-sm">
          <span>Belum memiliki akun? </span>
          <span>
            <Link className="font-semibold text-primary" href="/register">
              Register sekarang!
            </Link>
          </span>
        </div>
      </section>
      <section
        id="img-container"
        className="absolute left-0 top-0 -z-10 h-full w-full flex-[2] lg:relative lg:block"
      >
        <Image
          src={"/images/logo.png"}
          alt="insects"
          width={160}
          height={80}
          className="absolute right-10 top-10 z-20 object-cover object-center"
        />

        <Image
          src={"/images/auth-image.png"}
          alt="insects"
          fill
          className="-z-10 object-cover object-center brightness-[50%]"
        />
      </section>
    </section>
  );
}
