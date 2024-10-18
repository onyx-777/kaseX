"use client"

import React, { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import dynamic from "next/dynamic"
import { Spinner } from "@/components/spinner"

const SidebarNav = dynamic(
  () => import("./desktop-nav").then((mod) => mod.SidebarNav),
  { ssr: false }
)

const FloatingDockMobile = dynamic(
  () => import("./mobile-nav").then((mod) => mod.FloatingDockMobile),
  { ssr: false }
)

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMounted) {
    return <Spinner/>
  }

  if (isMobile) {
    return (
      <>
        <div className="p-10 z-10">{children}</div>
        <FloatingDockMobile />
      </>
    )
  }

  return (
    <SidebarNav>
      <ScrollArea className="h-screen">
        <div className="p-16 z-10">{children}</div>
      </ScrollArea>
    </SidebarNav>
  )
}