import HomeNav from "@/components/global/Navigation/home-nav";
import MaxWidthWrapper from "@/components/global/wrapper/MaxWidthWrapper";
import { Icons } from "@/components/icon";
// import Phone from '@/components/Phone'
// import { Reviews } from '@/components/Reviews'
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper className="bg-slate-50 dark:bg-background grainy-light dark:text-white">
      <div className="fixed top-0 left-0 right-0 bg-black z-50 w-full">
        <HomeNav />
      </div>
      <section className="mt-16 md:mt-7">
        <MaxWidthWrapper className="pb-24 flex justify-center gap-2 flex-col items-center w-full">
          <div className="col-span-2 w-full px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center flex flex-col items-center justify-center">
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 dark:text-slate-50 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="text-green-600 rounded-xl px-2">Custom</span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 mr-10 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories with your own,{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                kaseX allows you to protect your memories, not just your phone
                case.
              </p>

              <ul className="mt-8 space-y-2 justify-center font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    High-quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />5 year
                    print guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-black dark:text-white dark:fill-white fill-black" />
                    <Star className="h-4 w-4 text-black dark:text-white dark:fill-white fill-black" />
                    <Star className="h-4 w-4 text-black dark:text-white dark:fill-white fill-black" />
                    <Star className="h-4 w-4 text-black dark:text-white dark:fill-white fill-black" />
                    <Star className="h-4 w-4 text-black dark:text-white dark:fill-white fill-black" />
                  </div>

                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-10 aspect-video md:w-[30rem] md:h-[30rem] w-[18rem] h-[18rem] shadow-lg shadow-zinc-700 ring-2 ring-white">
            {" "}
            <Image
              src={"/assets/WhatsApp Image 2024-09-26 at 19.25.06.jpeg"}
              alt="Personalized phone case design"
              fill
              className="rounded-xl"
            />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className="bg-slate-100 dark:bg-zinc-900 grainy-dark py-24 rounded-xl">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900 dark:text-slate-50">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
              </span>{" "}
              say
            </h2>
            <img
              src="/assets/snake-2.png"
              className="w-24 order-0 lg:order-2"
            />
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "The case feels durable and I even got a compliment on the
                  design. Had the case for two and a half months now and{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it."
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex flex-col">
                  <p className="font-semibold">Jonathan</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second user review */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
                <Star className="h-5 w-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "I usually keep my phone together with my keys in my pocket
                  and that led to some pretty heavy scratchmarks on all of my
                  last phone cases. This one, besides a barely noticeable
                  scratch on the corner,{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    looks brand new after about half a year
                  </span>
                  . I dig it."
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex flex-col">
                  <p className="font-semibold">Josh</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        {/* <div className='pt-16'>
          <Reviews />
        </div> */}
      </section>

      <section>
        <MaxWidthWrapper className="py-24 gap-20 flex flex-col justify-center items-center">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900 dark:text-slate-50">
                Upload your photo and get{" "}
                <p className="relative px-2 text-green-600 rounded-xl">
                  your own case
                </p>{" "}
                now
              </h2>
            </div>
          </div>

          <div className="mx-auto md:max-w-6xl md:px-6 max-w-fit lg:px-8 mt-10">
            <div className="relative md:max-w-xl md:-mt-20">
              <Image
                src="/assets/your-image.png"
                alt="image"
                className="absolute dark:invert w-40 lg:w-52 left-36 md:left-56 -top-20 select-none sm:block lg:hidden xl:block z-10"
                width={100}
                height={100}
              />
              <Image
                src="/assets/line.png"
                alt="image"
                className="absolute dark:invert hidden md:block w-20 -left-6 -bottom-6 select-none"
                width={44}
                height={44}
              />
              {/* <Phone className="w-64 h-96" imgSrc="/testimonials/1.jpg" /> */}
              <div className="relative aspect-video md:w-[30rem] md:h-[30rem] w-[18rem] h-[18rem]">
                <Image
                  src="/assets/WhatsApp Image 2024-09-26 at 20.04.14 (1).jpeg"
                  alt="customized-image"
                  fill
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
              High-quality silicone material
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
              Scratch- and fingerprint resistant coating
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
              Wireless charging compatible
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 inline mr-1.5" />5 year
              print warranty
            </li>

            <div className="flex justify-center">
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8 text-white",
                })}
                href="/dashboard"
              >
                Create your case now{" "}
                <ArrowRight className="h-4 w-4 ml-1.5 text-white" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </MaxWidthWrapper>
  );
}
