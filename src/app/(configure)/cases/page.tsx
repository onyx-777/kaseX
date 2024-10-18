import { deleteCase, getAllCases } from "@/actions/case";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Trash } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteCase from "@/components/case/delete-case";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {};

const Cases = async (props: Props) => {
  const cases = await getAllCases();
  if (!cases)
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center">
        You currently have 0 cases
      </div>
    );

  return (
    <div className="w-fit h-full">
      <Card>
        <CardHeader>
          <CardTitle>Your Cases</CardTitle>
          <CardDescription>This is the collection of cases you created.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center w-fit gap-10 p-10 border-t-2">
            {cases.map(({ createdAt, croppedImageUrl, id }) => {
              return (
                <div key={id} className="w-44 relative h-full bg-zinc-950 p-7 rounded-xl">
                  <Link href={`/cases/${id}`}>
                    <AspectRatio
                      ratio={170 / 347}
                      className="bg-none rounded-[1rem]"
                    >
                      <div className="relative w-full h-full rounded-[1rem] overflow-hidden">
                        <Image
                          src={croppedImageUrl}
                          fill
                          alt="Your image"
                          className="pointer-events-none object-cover"
                        />
                        <Image
                          fill
                          alt="Phone frame"
                          src="/assets/phone-template-dark-edges.png"
                          className="pointer-events-none select-none object-contain rounded-[1rem]"
                        />
                      </div>
                    </AspectRatio>
                  </Link>
                  {/* <div className="absolute bottom-0 left-0 right-0 w-full">
                    <DeleteCase caseId={id} />
                  </div> */}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cases;
