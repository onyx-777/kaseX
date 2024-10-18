import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import { ClientLayout } from "@/components/global/Navigation/client-layout";
import { Spinner } from "@/components/spinner";
import { Toaster } from "@/components/ui/toaster";
import HomeNav from "@/components/global/Navigation/home-nav";
import { UserButton } from "@clerk/nextjs";
import NavBar from "@/components/global/Navigation/nav-bar";

const ConfigProvider = dynamic(
  () => import("@/providers/config-provider").then((mod) => mod.ConfigProvider),
  {
    ssr: true,
  }
);
const ModalProvider = dynamic(
  () => import("@/providers/modal-provider").then((mod) => mod.ModalProvider),
  {
    ssr: true,
  }
);

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <ModalProvider>
      <ClientLayout>
        <div className="mb-10">
          <NavBar />
        </div>
        {children}
      </ClientLayout>
      <Toaster />
    </ModalProvider>
  );
};

export default Layout;
