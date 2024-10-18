"use client"

import React from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import BlurFade from "@/components/ui/blur-fade"

interface LazyImageProps {
  src: string
  alt: string
  onClick?: () => void
  index: number
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, onClick, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  })

  return (
    <div ref={ref} className="relative aspect-square w-72">
      {inView ? (
        <BlurFade
          delay={0.15 + index * 0.03}
          duration={0.5}
          inView
          className="relative aspect-square w-72"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="cursor-pointer rounded-lg object-cover"
            onClick={onClick}
          />
        </BlurFade>
      ) : (
        <div className="w-full h-full bg-gray-200 rounded-lg" />
      )}
    </div>
  )
}

export default LazyImage