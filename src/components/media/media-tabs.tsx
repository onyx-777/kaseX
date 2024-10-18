import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { getMedia } from "@/actions/media";
import dynamic from "next/dynamic";
import { Spinner } from "../spinner";
import MaxWidthWrapper from "../global/wrapper/MaxWidthWrapper";

type Props = {
  containerHeight: string;
  mountedIn : 'media' | 'design';
};

const MediaContainer = dynamic(
  () => import("./media-container").then((mod) => mod.MediaContainer),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0">
        <Spinner />
      </div>
    ),
  }
);

const MediaTabs = async (props: Props) => {
  const media = await getMedia();

  return (
    <Tabs defaultValue="template_images">
      <TabsList className="w-full flex justify-center items-center mb-4 md:mb-10 bg-zinc-600 py-7">
        <TabsTrigger value="template_images" className="text-sm font-semibold text-white">
          Template Images
        </TabsTrigger>
        <TabsTrigger value="user_images" className="text-sm font-semibold text-white">
          Your Images
        </TabsTrigger>
      </TabsList>
      <TabsContent value="template_images">
        <div className="mb-20">
          <MediaContainer
            containerHeight={props.containerHeight}
            type={"template"}
            mountedIn={props.mountedIn}
          />
        </div>{" "}
      </TabsContent>
      <TabsContent value="user_images">
        <div className="mb-20">
          <MediaContainer
            containerHeight={props.containerHeight}
            media={media}
            type="user"
            mountedIn={props.mountedIn}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MediaTabs;
