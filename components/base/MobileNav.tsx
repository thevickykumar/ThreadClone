"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Users2 } from "lucide-react";
import Image from "next/image";
import Sidebarlinks from "../common/SideBarLinks";
import Link from "next/link";

export default function MobileNav() {
  return (
    <nav className="md:hidden flex justify-between items-center">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu height={30} width={30} className="font-bold" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-center items-center">
                  <Image
                    src="/images/logo.svg"
                    width={50}
                    height={50}
                    alt="logo"
                  />
                  <h1 className="font-bold text-xl ml-2">Threads</h1>
                </div>
              </SheetTitle>
              <SheetDescription>
                <Sidebarlinks />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <Image src="/images/logo.svg" width={30} height={30} alt="Logo" />
      <Link href="/profile">
        <Users2 height={25} width={25} />
      </Link>
    </nav>
  );
}
