"use client";
import React from "react";
import { Button } from "../ui/button";
import { useModal } from "@/providers/modal-provider";
import { PlusCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { Spinner } from "../spinner";

const UploadFile = dynamic(
  () => import("../upload-box").then((mod) => mod.default),
  {
    ssr: false,
    loading : () => <div className="fixed inset-0"><Spinner /></div>
  }
);
const CustomModal = dynamic(
  () => import("../global/modal/custom-modal").then((mod) => mod.default),
  {
    ssr: false,
    loading : () => <div className="fixed inset-0"><Spinner /></div>
  }
);


type Props = {};

const AddMedia = (props: Props) => {
  const { setOpen } = useModal();
  return (
    <Button
      onClick={() =>
        setOpen(
          <CustomModal title="Media Bucket" subheading="Add images to your media bucket.">
            <UploadFile />
          </CustomModal>
        )
      }
      className="font-semibold w-fit"
    >
     <PlusCircle className="md:mr-2 w-full text-center text-white" /> <span className="hidden md:block text-lg text-white">Add Image</span>
    </Button>
  );
};

export default AddMedia;
