import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const session = await auth();

  console.log(session);

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <main className="overflow-hidden">{children}</main>
    </>
  );
}
