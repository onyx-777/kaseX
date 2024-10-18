"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import BlurFade from "../ui/blur-fade";
import { ScrollArea } from "../ui/scroll-area";
import { GetUserMedia } from "@/types/media";
import { useConfig } from "@/providers/config-provider";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import UploadFile from "../upload-box";
import {
  CircleEllipsisIcon,
  EllipsisIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteMedia } from "@/actions/media";
import { useToast } from "@/hooks/use-toast";
import { Button, buttonVariants } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

const generateImages = () => {
  return Array.from({ length: 20 }, (_, i) => {
    const isLandscape = i % 2 === 0;
    const width = isLandscape ? 800 : 600;
    const height = isLandscape ? 600 : 800;
    return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
  });
};

interface Props {
  media?: GetUserMedia;
  type: "template" | "user";
  containerHeight: string;
  mountedIn: "media" | "design";
}

export function MediaContainer({
  media,
  type,
  containerHeight,
  mountedIn,
}: Props) {
  const MemoizedUploadbtn = useMemo(() => <UploadFile />, []);
  const router = useRouter();
  const { setImgLink } = useConfig();
  const path = usePathname();
  const { toast } = useToast();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Memoizing the template images
  const templateImages = useMemo(() => generateImages(), []);

  // Memoizing the user media images
  const userMediaImages = useMemo(() => {
    return (
      media?.Media.map((image) => ({
        url: image.url,
        id: image.id,
      })) || []
    );
  }, [media]);

  const handleImageLoad = useCallback((imageUrl: string) => {
    setLoadedImages((prev) => ({ ...prev, [imageUrl]: true }));
  }, []);

  const handleOnDesignClick = (url: string) => {
    if (path === "/media") {
      router.push(`/design?imageUrl=${url}`);
    } else {
      setImgLink(url);
    }
  };

  const handleDeleteImage = async (imgId: string) => {
    await deleteMedia(imgId);
    router.refresh();
    toast({
      title: "Image Deleted",
      variant: "default",
    });
  };

  return (
    <ScrollArea>
      <div
        className={`flex flex-wrap ${containerHeight} w-full flex-grow justify-center items-center`}
      >
        {type === "template" ? (
          templateImages.map((imageUrl, idx) => {
            return (
              <BlurFade
                key={imageUrl}
                delay={0.15 + idx * 0.03}
                duration={0.5}
                inView
                className="relative aspect-square w-60 m-2"
              >
                {!loadedImages[imageUrl] && (
                  <Skeleton className="absolute inset-0 z-10" />
                )}
                <Image
                  className={cn(
                    "size-full cursor-pointer rounded-lg object-contain",
                    !loadedImages[imageUrl] && "invisible"
                  )}
                  src={imageUrl}
                  fill
                  alt={`Random stock image ${idx + 1}`}
                  onClick={() => handleOnDesignClick(imageUrl)}
                  onLoadingComplete={() => handleImageLoad(imageUrl)}
                />
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center bg-black">
                  <p
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "flex justify-start items-center gap-2 rounded-none cursor-pointer w-full"
                    )}
                  >
                    {" "}
                    <p
                      onClick={() => handleOnDesignClick(imageUrl)}
                      className="flex justify-center items-center w-full gap-2"
                    >
                      <span>
                        <PencilIcon size={18} fill="white" />
                      </span>{" "}
                      <span>Design Case</span>
                    </p>
                  </p>
                </div>
              </BlurFade>
            );
          })
        ) : (
          <>
            <BlurFade
              delay={0.15}
              duration={0.2}
              inView
              className="relative aspect-square w-60 m-2"
            >
              {MemoizedUploadbtn}
            </BlurFade>
            {userMediaImages.map((image, idx) => (
              <BlurFade
                key={image.url}
                delay={0.15 + (idx + 1) * 0.03}
                duration={0.2}
                inView
                className="relative aspect-square w-72 m-2"
              >
                {!loadedImages[image.url] && (
                  <Skeleton className="absolute inset-0 z-10" />
                )}
                <Image
                  className={cn(
                    "w-fit cursor-pointer rounded-lg object-contain relative",
                    !loadedImages[image.url] && "invisible"
                  )}
                  src={image.url}
                  fill
                  onClick={() => handleOnDesignClick(image.url)}
                  alt={`User image ${idx + 1}`}
                  onLoadingComplete={() => handleImageLoad(image.url)}
                />
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center bg-black">
                  <p
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "flex justify-start items-center gap-2 rounded-none cursor-pointer w-full"
                    )}
                  >
                    {" "}
                    <p
                      onClick={() => handleOnDesignClick(image.url)}
                      className="flex justify-center items-center w-full gap-2"
                    >
                      <span>
                        <PencilIcon size={18} fill="white" />
                      </span>{" "}
                      <span>Design Case</span>
                    </p>
                  </p>
                  <p
                    onClick={() => handleDeleteImage(image.id)}
                    className={cn(
                      buttonVariants({ variant: "destructive" }),
                      "flex justify-start items-center gap-2 rounded-none cursor-pointer w-full"
                    )}
                  >
                    {" "}
                    <p className="flex justify-center items-center w-full gap-2">
                      <span>
                        <Trash size={18} fill="white" />
                      </span>{" "}
                      <span>Delete Image</span>
                    </p>
                  </p>
                </div>
              </BlurFade>
            ))}
          </>
        )}
      </div>
    </ScrollArea>
  );
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
