"use client"

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import Image from 'next/image'
import Env from '@/lib/config/env'
  

export default function ImageViewer({image}:{image:string}) {
  return (
    <Sheet>
  <SheetTrigger>
  <Image
          src={`${Env.APP_URL}/uploads/${image}`}
          width={100}
          height={100}
          alt="Post Img"
          className="w-full rounded-md mt-2 cursor-pointer object-cover
         h-[400px]"
        />
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Show Image</SheetTitle>
      <SheetDescription className='mb-4 w-full flex justify-center items-center'>
      <Image
          src={`${Env.APP_URL}/uploads/${image}`}
          width={100}
          height={100}
          alt="Post Img"
          className="w-full rounded-md mt-2 cursor-pointer object-contain
         h-[500px]" unoptimized
        />
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

  )
}
