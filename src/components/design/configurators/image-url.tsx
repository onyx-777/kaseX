"use client";
import FormGenerator from "@/components/forms/form-generator";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/providers/config-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type UrlProps = {
  url: string;
};

export const UrlSchema = z.object({
  url: z.string().url(),
});

export const ImageUrl = () => {
  const { setImgLink } = useConfig();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UrlProps>({
    resolver: zodResolver(UrlSchema),
  });

  return (
    <form onSubmit={handleSubmit((values)=>setImgLink(values.url))} className="w-full">
      <div className="flex justify-center items-center w-full gap-3">
        <FormGenerator
          inputType="input"
          name="url"
          placeholder="https://picsum.photos/seed/10/600/800"
          register={register}
          type="text"
          errors={errors}
        />
        <Button type="submit" className="w-fit text-white">
          Fetch
        </Button>
      </div>
    </form>
  );
};
