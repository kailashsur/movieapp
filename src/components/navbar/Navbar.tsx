import { Button } from "../ui/button";
import { Input } from "../ui/input";


export default function Navbar() {

  return (
    <nav className="w-full h-auto py-2 border-b flex justify-center items-center">

      <div className=" w-full max-w-[900px] flex justify-between items-center px-2">
        <div className=" font-bold">Filmy4Wap</div>

        <div className=" flex justify-center items-center gap-4">
          <Input type="text" placeholder="Search" />
        </div>
      </div>
    </nav>

  )
}
