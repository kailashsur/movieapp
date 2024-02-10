"use client";
import React, {useEffect, useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useUserContext } from "../context/context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { removeFromSession } from "../common/session";




export default function Admin() {  

  const [showMobileMenu, setShowMbileMenu] = useState(false);
  const { userAuth: { data: { access_token } }, setUserAuth } = useUserContext();

  const router = useRouter()
  const goToAuth = () => {
    router.push('/admin/auth');
  }

  useEffect(() => {
    !access_token ? goToAuth() : ""
  }, [access_token]);

  return (
   
<section className="px-2 w-full flex justify-center ">

<div className=" border-b py-4 px-4 w-full max-w-[900px] flex justify-end">
  <div className="">
    <DropdownMenu >
      <DropdownMenuTrigger>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem ><Link href="/admin/add">Add Movie</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem> 
          <Button 
        onClick={()=> {
          setUserAuth({data : { access_token : null}})
          removeFromSession('user')
        
        }}
        >Logout</Button>
         </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


  </div>
</div>

</section>
  )
}


