"use client";
import FormGenerator from "@/components/forms/form-generator";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useShipping } from "@/hooks/settings/use-shipping";
import React from "react";

type Props = {
  id?: string;
};

const AddAddressModal = ({ id }: Props) => {
  const { upsertAddress, Loading, errors, register } = useShipping();
  return (
    <div className="w-full h-full -mt-4">
      <form
        onSubmit={upsertAddress}
        className="flex flex-col justify-center items-center w-full h-full p-2 gap-4"
      >
        <div className="flex justify-between w-full items-center gap-4">
          <FormGenerator
            inputType="input"
            name="house"
            placeholder="223-A"
            register={register}
            type="text"
            label="House No."
            errors={errors}
          />
          <FormGenerator
            inputType="input"
            name="street"
            placeholder="Baker Street"
            register={register}
            type="text"
            label="Street"
            errors={errors}
          />
        </div>
        <div className="flex justify-center items-center gap-4 w-full">
          <FormGenerator
            inputType="input"
            name="phoneNumber"
            placeholder="2451369878"
            register={register}
            type="number"
            label="House No."
            errors={errors}
          />
        </div>
        <div className="flex justify-between w-full items-center gap-4">
          <FormGenerator
            inputType="input"
            name="city"
            placeholder="New York"
            register={register}
            type="text"
            label="City"
            errors={errors}
          />
          <FormGenerator
            inputType="input"
            name="postalCode"
            placeholder="223458"
            register={register}
            type="text"
            label="Postal Code"
            errors={errors}
          />
        </div>
        <FormGenerator
          inputType="input"
          name="country"
          placeholder="United States"
          register={register}
          type="text"
          label="Country"
          errors={errors}
        />
        <FormGenerator
          inputType="input"
          name="state"
          placeholder="New York"
          register={register}
          type="text"
          label="State"
          errors={errors}
        />
        <Button type="submit" className="w-full" disabled={Loading}>
          {Loading ? <Spinner /> : id ? "Update Address" : "Add Address"}
        </Button>
      </form>
    </div>
  );
};

export default AddAddressModal;
