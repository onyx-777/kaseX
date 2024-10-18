"use client";
import CustomModal from "@/components/global/modal/custom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import React from "react";
import AddAddressModal from "./add-address-modal";

type Props = {};

const AddAddressBtn = (props: Props) => {
  const { setOpen } = useModal();
  return (
    <Button
      className="w-fit text-lg font-semibold text-white"
      variant={'ghost'}
      onClick={() =>
        setOpen(
          <CustomModal
            title="Set Your Shipping Address"
            subheading="Make Sure Your Package Arrives at the Right Place"
          >
            <AddAddressModal />
          </CustomModal>
        )
      }
    >
      Add Address
    </Button>
  );
};

export default AddAddressBtn;
