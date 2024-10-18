import {
  deleteShippingAddress,
  getAllShippingAddresses,
  upsertShippingAddress,
} from "@/actions/settings/shipping";
import { useModal } from "@/providers/modal-provider";
import { ShippingSchema } from "@/schemas/shipping.schema";
import { ShippingProps } from "@/types/shipping";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useShipping = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingProps>({
    resolver: zodResolver(ShippingSchema),
  });

  const [Loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {setClose} = useModal();

  const upsertAddress = handleSubmit(async (values) => {
    try {
      setLoading(true);
      await upsertShippingAddress(values);
      console.log('created')
      router.refresh();
      setLoading(false);
      setClose();
    } catch (error) {
      console.log("error in addNewAddress use-shipping hook : ", error);
    }
  });

  const deleteAddress = async (id: string) => {
    try {
      setLoading(true);
      await deleteShippingAddress(id);
      router.refresh();
      setLoading(false);
    } catch (error) {
      console.log("error in deleteAddress use-shipping hook : ", error);
    }
  };

  const getShippingAddresses = async () => {
    try {
      await getAllShippingAddresses();
    } catch (error) {
      console.log("error in getShippingAddresses use-shipping hook : ", error);
    }
  };

  return {
    upsertAddress,
    getAllShippingAddresses,
    deleteAddress,
    register,
    errors,
    Loading,
  };
};
