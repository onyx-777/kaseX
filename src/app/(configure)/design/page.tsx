import Canvas from "@/components/design/canvas";
import DesignConfigurator from "@/components/design/Design-configurator";
import Settings from "@/components/design/settings";
import MaxWidthWrapper from "@/components/global/wrapper/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { ConfigProvider, useConfig } from "@/providers/config-provider";
import React from "react";

type Props = {
  searchParams: {
    imageUrl: string;
  };
};

const Design = ({ searchParams }: Props) => {
  return (
    <MaxWidthWrapper className="px-5">
      <div className="flex justify-center gap-10 items-center w-full h-full flex-wrap">
        <ConfigProvider>
          <div className="w-[30rem] h-[100vh] min-w-[22rem] flex-grow">
            <Canvas imageUrl={searchParams.imageUrl} />
          </div>
          <Separator className="h-screen hidden md:block w-px dark:bg-zinc-900 bg-zinc-200" />
          <div className="w-[30rem] h-[100vh] min-w-[22rem] dark:bg-black bg-white flex-grow">
            <Settings />
          </div>
        </ConfigProvider>
      </div>
    </MaxWidthWrapper>
  );
};  

export default Design;
