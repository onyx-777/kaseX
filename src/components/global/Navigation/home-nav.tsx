import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme-toggle";
import MaxWidthWrapper from "../wrapper/MaxWidthWrapper";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function HomeNav() {
  const user = await currentUser();
  return (
    <nav className="w-full border-b bg-white dark:bg-black px-4">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-28 w-28 md:h-32 md:w-32">
              <Image
                src="/assets/logo-black.svg"
                alt="kaseX"
                fill
                className="dark:invert"
              />
            </div>
            {/* <span className="hidden font-bold sm:inline-block">kaseX</span> */}
          </Link>
          <div className="flex items-center space-x-4">
            <Button className="hover:bg-green-600 text-white">
              {user ? (
                <Link href={"/dashboard"}>Dashboard</Link>
              ) : (
                <Link href={"/sign-in"}>Sign In</Link>
              )}
            </Button>
            {/* {user ? (
              <div>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                />
              </div>
            ) : (
              <Button className="hover:translate-x-2 duration-75 transition-all">
                <Link href={"/sign-in"}>Sign-In</Link>
              </Button>
            )} */}

            <div className="hidden md:block">
              <ModeToggle />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
