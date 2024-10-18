import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme-toggle";
import MaxWidthWrapper from "../wrapper/MaxWidthWrapper";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";

export default async function NavBar() {
  const user = await currentUser();
  return (
    <nav className="w-full z-50 fixed left-0 right-0 top-0 border-b bg-background/50 backdrop-blur-lg px-4">
      <div className="flex h-16 items-center justify-end w-full">
        <div className="flex justify-center items-center space-x-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
          <div><ShoppingCart /></div>
        </div>
      </div>
    </nav>
  );
}
