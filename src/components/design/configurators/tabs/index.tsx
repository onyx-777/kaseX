import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Case from "./case";
import ImageTab from "./image";

type Props = {};

const ConfigureTabs = (props: Props) => {
  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center w-full">
        <div className="w-full">
          <div className="w-full h-full backdrop-blur-lg bg-black/30" />
          <Tabs defaultValue="configure" className="w-full h-full pt-2">
            <TabsList className="flex justify-center items-center w-full gap-5 bg-zinc-700 py-7 text-white">
              <TabsTrigger
                value="configure"
                className=" font-semibold tracking-wide"
              >
                Configure
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className=" font-semibold tracking-wide"
              >
                Images
              </TabsTrigger>
            </TabsList>
            <TabsContent value="configure" className="w-full">
              <div className="w-full">
                <Case />
              </div>
            </TabsContent>
            <TabsContent value="images">
              <div className="w-full h-full">
                <ImageTab />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ConfigureTabs;
