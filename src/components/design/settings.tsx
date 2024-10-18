import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import dynamic from 'next/dynamic';
import { Spinner } from "@/components/spinner";
import DesignConfigurator from "./Design-configurator";

const MediaTabs = dynamic(
    () => import("../media/media-tabs").then((mod) => mod.default),
    {
      ssr: false,
      loading: () => <Spinner />
    }
  );
  

type Props = {};

const Settings = (props: Props) => {
  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center w-full">
        <div className="w-full">
            <div className="w-full h-full backdrop-blur-lg bg-black/30" />
          <Tabs defaultValue="configure" className="w-full h-full">
            <TabsList className="flex justify-center items-center w-full gap-5 dark:bg-black bg-zinc-100 py-7 dark:text-white">
              <TabsTrigger value="configure" className="dark:bg-black bg-white font-semibold tracking-wide">Configure</TabsTrigger>
              <TabsTrigger value="images" className="dark:bg-black bg-white font-semibold tracking-wide">Images</TabsTrigger>
            </TabsList>
            <TabsContent value="configure" className="w-full">
              <div className="w-full"><DesignConfigurator /></div>
            </TabsContent>
            <TabsContent value="images">
              <div className="w-full h-full"><MediaTabs mountedIn="design" containerHeight="h-[35rem]" /></div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
