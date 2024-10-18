"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { label: string; href: string; icon: React.ReactNode }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { label: string; href: string; icon: React.ReactNode }[];
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        <motion.div
          layoutId="nav"
          className="fixed justify-evenly items-center bottom-0 left-0 right-0 flex gap-2 rounded-l-xl rounded-r-xl bg-white dark:bg-background py-5 mx-1"
        >
          <Tabs value={pathname} className="w-full bg-background">
            <TabsList className="w-full ">
              {items.map((item, idx) => (
                <TabsTrigger
                  key={item.label}
                  value={item.href}
                  asChild
                  className="w-full flex items-center justify-center font-semibold pl-2 rounded-l-xl rounded-r-xl group/sidebar py-2"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      transition: {
                        delay: idx * 0.05,
                      },
                    }}
                    transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="h-14 w-8 flex-col gap-1 rounded-full flex items-center justify-center text-center"
                    >
                      <div className="h-5 w-5 text-muted-foreground">
                        {item.icon}
                      </div>
                      <div className="text-xs mt-4">{item.label === "Dashboard" ? 'Dash' : item.label}</div>
                    </Link>
                  </motion.div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
