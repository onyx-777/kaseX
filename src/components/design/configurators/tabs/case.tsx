"use client"
import React from 'react'
import { ImageUrl } from '../image-url'
import CaseMaterial from '../radio-group'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useConfig } from '@/providers/config-provider'
import ColorCanvasPalette from "../../configurators/color-palette";


type Props = {}

const Case = (props: Props) => {
    const { caseColor, canvasBgColor, imageOpacity, caseColorOpacity } =
    useConfig();

  return (
    <div className="w-full h-screen flex flex-col text-white md:-mt-16 pb-20 md:pb-10 md:pt-14 font-semibold">
    
    <ScrollArea className="w-full h-full">
      <div className="md:p-10 pt-7 p-5 -mt-4 h-full flex flex-col justify-center items-center gap-10">
        <div className="w-full bg-neutral-900 p-2 h-full rounded-xl">
          <p className="w-full text-center text-lg py-2 rounded-full mb-5 bg-neutral-800">
            Case
          </p>
          {/* <Separator className="h-px my-3 mb-5 bg-neutral-500 rounded-full" /> */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4">
            {/* <div className="hidden md:flex flex-col gap-3 justify-center items-center w-full">
              <div>
                <div className="flex justify-start items-center gap-2">
                  Canvas :{" "}
                  <p
                    className="h-6 w-6 rounded-full border-2 border-white"
                    style={{ backgroundColor: canvasBgColor }}
                  />
                </div>
              </div>
              <div className="w-full flex-1 ">
                <ColorCanvasPalette type="canvasColor" />
              </div>
            </div> */}
            <div className="flex flex-col gap-3 justify-center items-center w-full">
              <div>
                {/* <div className="flex items-center gap-2">
                  Case :{" "}
                  <p
                    className="h-6 w-6 rounded-full border-2 border-white"
                    style={{ backgroundColor: caseColor }}
                  />
                </div> */}
              </div>
              <div className="w-full flex-1">
                <ColorCanvasPalette type="caseColor" />
              </div>
            </div>
          </div>
          <div className=" w-full h-fit flex flex-col justify-center items-center gap-5 dark:bg-neutral-950 bg-neutral-900 text-white p-5 rounded-xl">
            <div className="flex flex-col gap-5 justify-center items-center w-full">
              <div className="w-full">
                <div className="flex justify-center items-center gap-2 text-lg">
                  Material
                </div>
              </div>
              <div className="w-full flex-1">
                <CaseMaterial type="material" />
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-5 justify-center items-center w-full">
              <div className="w-full">
                <div className="flex justify-center items-center gap-2 text-lg">
                  Finish
                </div>
              </div>
              <div className="w-full flex-1">
                <CaseMaterial type="finish" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col justify-center items-center gap-10 w-full h-full dark:bg-neutral-950 bg-neutral-900 text-white p-5 rounded-xl">
          <div></div>
          <div className="flex flex-col flex-1 gap-5 justify-center items-center w-full">
            <div className="w-full">
              <div className="flex justify-between items-center gap-2">
                Image Opacity
                <p className="font-semibold">{imageOpacity} %</p>
              </div>
            </div>
            <div className="w-full flex-1">
              <RangeSlider />
            </div>
          </div>
        </div> */}
      </div>
    </ScrollArea>
  </div>  )
}

export default Case