'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { Icons } from "../icons"

import Link from "next/link"
import Image from "next/image"
import ban from "../../../public/29.jpg"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "../ui/button"




export default function LatestMovie() {

    
    const [latestMovie, setLatestMovie] = useState({movies : []})

    const [loader, setLoader] = useState(true);
    const [pageNo, setPageNo] = useState(1)

    useEffect(() => {
        axios.post("/api/movies/get-movie", { page: pageNo })
            .then(({ data: { movies } }) => {
                
                const newMovieList = [...latestMovie.movies, movies]
                setLatestMovie({ movies : newMovieList})


                setLoader(false)
            })
            .catch(err => {
                setLoader(false)
                console.log(err);

            })
    }, [pageNo])
    // console.log(latestMovie.length);
    const handelLoadMore =()=>{
        setPageNo(pageNo+1);
    }

console.log(latestMovie);

    return (

        loader ?
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            :
            <div className=" grid grid-cols-1 md:grid-cols-2 mx-2 my-4 max-w-[900px] h-auto justify-start">
                {
                    latestMovie.movies.map(({ title, banner, tag, id }, i) => {
                        return <div key={i} className="px-2 ">
                            <article className="mx-auto my-2 w-full h-auto md:max-h-40 flex rounded-md bg-transparent md:flex-row border overflow-hidden items-center">

                                <div className="w-40 h-40">
                                    <img src={banner} alt={title} className="h-full" />

                                </div>

                                <div className="w-full flex flex-col justify-between h-full">
                                    <div className=" px-3">
                                        <Link href={`/movies/${id}`} className="block  md:text-xl font-medium capitalize text-gray-700 line-clamp-2 overflow-ellipsis"> {title} </Link>
                                    </div>

                                </div>
                            </article>
                        </div>

                    })
                }

                {
                    latestMovie.movies.length == 10 ?
                        <div className=" mt-4 grid place-items-center">
                            <Button variant={"outline"} size={"sm"} onClick={handelLoadMore} >Load more</Button>
                        </div>
                        : ""
                }
            </div>
    )
}