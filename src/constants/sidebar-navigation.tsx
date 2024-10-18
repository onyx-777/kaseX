import { ModeToggle } from "@/components/theme-toggle";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconBucket,
  IconDeviceMobile,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Image, PencilIcon } from "lucide-react";


export const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    subheading: "Intuitive tools for a seamless design experience.",
    description : "Manage your custom mobile case designs seamlessly from the dashboard. Easily navigate through media uploads, design tools, and account settings to create and personalize your cases.",
    icon: (
      <IconBrandTabler className=" dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
    ),
  },
  {
    label: "Media",
    href: "/media",
    subheading: "Organize your visuals in one place.",
    description : 'Effortlessly upload and manage your media assets to elevate your projects. Keep everything organized for quick access and easy integration',
    icon: (
      <Image className=" dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
    ),
  },
  {
    label: "Design",
    href: "/design",
    subheading: "Craft your perfect design effortlessly.",
    description : "Unleash your creativity with our intuitive design tools. Customize and visualize your projects to bring your unique vision to life.",
    icon: (
      <PencilIcon className=" dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
    ),
  },
  {
    label: "Cases",
    href: "/cases",
    subheading: "Your custom cases, all in one place.",
    description : "Browse your personalized collection of custom phone cases, each designed to reflect your unique style and preferences.",
    icon: (
      <IconDeviceMobile className=" dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    subheading: "Control your preferences and stay organized.",
    description : "Manage your account settings, customize your theme, manage orders, and update shipping information effortlessly.",
    icon: (
      <IconSettings className=" dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
    ),
  },
];
