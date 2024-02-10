'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { Icons } from "../icons"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"



export default function LatestMovie() {

    const [latestMovie, setLatestMovie] = useState([])
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        axios.post("/api/movies/get-movie", { page: 1 })
            .then(({ data: { movies } }) => {
                setLatestMovie(movies)
                setLoader(false)
            })
            .catch(err => {
                setLoader(false)
                console.log(err);

            })
    }, [])
    console.log(latestMovie);

    return (

        loader ?
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            :
            <div className=" grid grid-cols-2 md:grid-cols-1 mx-2 my-4 max-w-[900px] h-auto justify-start">
                {
                    latestMovie.map(({ title, banner, tag }, i) => {
                        return <div key={i} className="px-2 ">
                            <article className="mx-auto my-2 w-full h-auto md:max-h-40 flex flex-col rounded-md bg-transparent md:flex-row border overflow-hidden items-center">

                                <div className="shrink-0 mr-2 max-w-40 w-full h-40">
                                    <img className=" w-full h-full" src={banner} alt={title} />
                                </div>

                                <div className="p-4  w-full">
                                    <div className="">
                                        <Link href="#" className="block  md:text-xl font-medium capitalize text-gray-700 line-clamp-2 overflow-ellipsis"> {title} </Link>
                                    </div>

                                    <div className="mt-4 w-full text-xs px-2 py-1 rounded-full bg-pink-600 text-white overflow-hidden whitespace-nowrap overflow-ellipsis">
                                        {tag}
                                    </div>


                                </div>
                            </article>
                        </div>

                    })
                }
            </div>
    )
}