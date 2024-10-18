"use client";

import { useModal } from "@/providers/modal-provider";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  title?: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CustomModal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="sm:max-w-[425px] h-[90vh] p-0 flex flex-col md:min-w-[500px]">
        <DialogHeader className="p-6 bg-background sticky top-0 z-10">
          <DialogTitle className="text-2xl font-bold text-center">
            {title}
          </DialogTitle>
          {subheading && (
            <DialogDescription className="text-center">
              {subheading}
            </DialogDescription>
          )}
        </DialogHeader>
        <Separator className="w-full" />
        <ScrollArea className="flex-grow px-6 py-4">
          <div className="h-full">{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;