"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  return !path.includes('aiform') && (
    <div>
      <div className="p-4 flex justify-between border">
        <Image src={"/logo.svg"} width={250} height={250} alt="logo" />
        {isSignedIn ? (
          <div className="flex items-center gap-5">
            
            <Link href={'/dashboard'}><Button
              className="hover:bg-[rgba(0,26,73,0.34)] hover:text-primary"
              varient="outline"
            >
              Dashboard
            </Button></Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button className="hover:bg-[rgba(0,26,73,0.34)] hover:text-primary">
              Get Started
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default Header;
