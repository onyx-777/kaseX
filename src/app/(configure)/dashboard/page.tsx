import Beam from "@/components/dashboard/animated-beam";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { links } from "@/constants/sidebar-navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="w-full h-full">
      <div className="hidden md:block -mt-10">
        <Beam />
      </div>
      <Separator className="mb-10 hidden md:block" />
      <div className='flex gap-5 justify-center items-center w-full flex-wrap mb-20'>
        {links.map(({ href, icon, label, subheading, description }) => (
          <Card className="max-w-sm mx-auto shadow-md rounded-lg min-h-72" key={href}>
            <CardHeader className="p-4">
              <h2 className="text-lg font-bold flex justify-start items-center w-full gap-3">
                <span>{icon}</span>{label}
              </h2>
              <h3 className="text-sm text-muted-foreground">{subheading}</h3>
            </CardHeader>
            <CardContent className="p-4">
              <p>
                {description}
              </p>
            </CardContent>
            <CardFooter className="p-4">
              <Link href={href} className={buttonVariants({variant: 'link'})}>
                {label==='Dashboard' ? 'You are here!' : `Go to ${label}`}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
