import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from 'next/image'; 
import logo from '@/../public/logo.gif'
import Link from "next/link";


export default function Navbar() {

  return (
    <nav className=" sticky w-full h-auto py-4 border-b flex justify-center items-center">

      <div className=" w-full max-w-[900px] flex justify-between items-center px-2">
        <Link href={"/"}>
        <Image src={logo} alt="" className=" w-6 ml-2" />
        </Link>

        <div className=" flex justify-center items-center gap-4 mr-2">
          <Input type="text" placeholder="Search" />
        </div>
      </div>
    </nav>

  )
}
