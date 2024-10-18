import React from "react";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import { links } from "@/constants/sidebar-navigation";
import dynamic from 'next/dynamic'

const FloatingDock = dynamic(()=> import('@/components/ui/floating-dock').then((mod)=>mod.FloatingDock), {
  ssr : false
})

export function FloatingDockMobile() {
  return (
    <div className="md:hidden flex sticky bottom-0 items-center justify-center w-full">
      <FloatingDock items={links} />
    </div>
  );
}
