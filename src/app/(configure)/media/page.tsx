import { getMedia } from "@/actions/media";
import { MediaContainer } from "@/components/media/media-container";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import React from "react";

const MediaTabs = dynamic(
  () => import("@/components/media/media-tabs").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0"><Spinner /></div>,
  }
);
const AddMedia = dynamic(
  () => import("@/components/media/add-media").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0"><Spinner /></div>,
  }
);


type Props = {};

const Media = (props: Props) => {
  return (
    <div className="w-full h-full mb-20">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-semibold text-3xl">Media</h1>
          <AddMedia />
        </div>
        <div>
          <MediaTabs mountedIn="media" containerHeight="h-full" />
        </div>
      </div>
    </div>
  );
};

export default Media;
