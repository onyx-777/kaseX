import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { material, finish } from "@/constants/configuration";
import { useConfig } from "@/providers/config-provider";

type Props = {
  type: "material" | "finish";
};

export default function CaseMaterial({ type }: Props) {
  // const [selected, setSelected] = useState(
  //   type === "material" ? material[0] : finish[0]
  // );

  const {
    material: caseMaterial,
    setMaterial,
    finish : caseFinish,
    setFinish,
  } = useConfig();

  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={type === "material" ? material[0] : finish[0]}
          onChange={({title})=>type === "material" ? setMaterial(title) : setFinish(title)}
          aria-label="case material"
          className="space-y-5"
        >
          {type === "material"
            ? material.map((plan) => (
                <Radio
                  key={plan.title}
                  value={plan}
                  className={({ checked }) => {
                    return `${
                      checked && "border-2 border-primary"
                    } group relative flex cursor-pointer rounded-lg dark:bg-white/5 py-4 px-5 dark:text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10`;
                  }}
                >
                  <div className="flex w-full gap-2 items-center justify-between">
                    <div className="text-sm/6">
                      <p className="font-medium dark:text-white">
                        {plan.title}
                      </p>
                      <div className="flex gap-2 dark:text-white/50">
                        {plan.subtitle && (
                          <div className="flex gap-2 dark:text-white/50 text-black/50">
                            <div>{plan.subtitle}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    {plan.price > 0 && (
                      <div className="flex gap-2 dark:text-white">
                        <div>${plan.price}</div>
                      </div>
                    )}{" "}
                  </div>
                </Radio>
              ))
            : finish.map((plan) => (
                <Radio
                  key={plan.title}
                  value={plan}
                  className={({ checked }) => {
                    return `${
                      checked && "border-2 border-primary"
                    } group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10`;
                  }}
                >
                  <div className="flex gap-2 w-full items-center justify-between">
                    <div className="text-sm/6">
                      <p className="font-medium dark:text-white text-black">
                        {plan.title}
                      </p>
                      <div className="flex gap-2 dark:text-white/50">
                        {plan.subtitle && (
                          <div className="flex gap-2 dark:text-white/50 text-black/50">
                            <div>{plan.subtitle}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    {plan.price > 0 && (
                      <div className="flex gap-2 dark:text-white">
                        <div>${plan.price}</div>
                      </div>
                    )}{" "}
                  </div>
                </Radio>
              ))}
        </RadioGroup>
      </div>
    </div>
  );
}
