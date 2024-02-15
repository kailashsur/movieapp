'use client'
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react"

interface MoveData {
    title : string,
    banner : string,
    cast : string,
    description : string,
    duration : string,
    genre : string,
    language : string,
    moviestory : string,
    release :string,
    screenshort : string,
    size : string,
    tag : string,
    watchlink : string
}

export default function Movie({ params } : { params : {id : number}}) {
    

    const [data, setData] = useState<MoveData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data,data : {statusCode} } = await axios.post("/api/movies/movie-details", { id : params.id})

                if(statusCode === 200){
                    setData(data.data)
                }else{
                    console.log(data.message)
                }
                
            } catch (error) {
                console.log("Error :: movies/[id]/page.tsx", error);

            }
        }

        fetchData();
    }, [params.id])

console.log(data);

    return (
        <section className=" grid place-items-center max-w-[900px] h-full p-4">
            {
                data ?
                (
                    <>
                    <div> {data.title} Watch Free </div>

                    <div className=" w-52">
                        <img src={data.banner} alt={data.title} />
                    </div>

                    <div><span>Name: </span> {data.title}</div>

                    <div>Genre : <span> {data.genre} </span></div>

                    <div> Duration : <span> {data.duration} </span></div>

                    <div> Release Date : <span> {data.release} </span></div>

                    <div> Language : <span> {data.language}</span></div>

                    <div> Starcast : <span> {data.cast} </span> </div>

                    <div> Quality : <span> {data.size} </span> </div>

                    <hr className=" border text-black" />

                    <div className=" max-w-md grid place-items-center gap-4 mt-4">
                        <p>SCREENSHORT</p>
                        <img src={data.screenshort}  />
                    </div>

                    <a href={data.watchlink}
                    className=" my-16 bg-green-600 text-white px-4 py-2 font-sans"
                    > Watch Now </a>
                    </>
                    
                )
                : 
                <Icons.spinner className="h-10 w-10 animate-spin" />
            }
        </section>
    )
}