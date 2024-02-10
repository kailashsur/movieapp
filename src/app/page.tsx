import LatestMovie from "@/components/features/latestmovie";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect } from "react";



export default function Home() {


  return (
    <main>
      <h1 className="text-2xl"> SadCM Home Page </h1>

      <LatestMovie />
    </main>
  )
}
