"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { links } from "@/constants/sidebar-navigation";
import { UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { ModeToggle } from "@/components/theme-toggle";

interface Props {
  children: React.ReactNode;
}

export function SidebarNav({ children }: Props) {
  const [open, setOpen] = useState(false);

  const memoizedLinks = useMemo(
    () =>
      links.map((link, idx) => (
        <SidebarLink key={idx} link={link} className="hover:text-green-600" />
      )),
    []
  );

  return (
    <div
      className={cn(
        "rounded-md absolute inset-0 flex flex-col md:flex-row dark:bg-zinc-950 min:w-screen min:h-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between z-[999] gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-5">{memoizedLinks}</div>
          </div>
          <div className="ml-2">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="w-full -mx-10">{children}</div>
    </div>
  );
}
export const Logo = () => {
  const [open, setOpen] = useState(false);

  return (
    <Link
      href="/"
      className="font-normal pl-3 flex space-x-2 items-center text-sm text-black py-1 relative z-[999]"
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-black dark:text-white whitespace-pre text-xl"
      >
        KaseX
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal pl-3 flex space-x-2 items-center text-sm text-black py-1 relative z-[999]"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
