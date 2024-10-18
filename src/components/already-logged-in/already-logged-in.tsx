import Image from "next/image";
import React from "react";

type Props = {};

const AlreadyLoggedIn = (props: Props) => {
  return (
    <div className="fixed inset-0 bg-black">
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
        <Image src={'/assets/snake.gif'} alt="kaseX login" height={100} width={100} className="mb-2 dark:invert" />
        <h1 className="font-semibold text-2xl">You&apos;re Signed In—No Need for a Season Premiere!</h1>
        <p className="text-muted-foreground text-sm">You&apos;re already signed in! Just like your favorite Netflix show—no need to press play again!</p>
      </div>
    </div>
  );
};

export default AlreadyLoggedIn;
