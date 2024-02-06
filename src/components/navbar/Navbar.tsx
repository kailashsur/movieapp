import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from 'next/image'; 
import logo from '@/../public/logo.gif'


export default function Navbar() {

  return (
    <nav className=" sticky w-full h-auto py-2 border-b flex justify-center items-center">

      <div className=" w-full max-w-[900px] flex justify-between items-center px-2">
        <Image src={logo} alt="" className=" w-6" />

        <div className=" flex justify-center items-center gap-4">
          <Input type="text" placeholder="Search" />
        </div>
      </div>
    </nav>

  )
}
