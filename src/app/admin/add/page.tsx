"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

import { toast } from "@/components/ui/use-toast"
 

export default function AddMovie() {

  const { handleSubmit, register } = useForm();

  const onSubmit = (data : any) => {
    // Handle form submission here
    console.log({movieData : data});
    toast({
      title: "Form Submitted!",
      description: "Form data submitted successfully.",
    });
  };

  return (
    <section className="w-full max-w-[900px] flex flex-col gap-4 justify-center items-center py-6 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="banner">Banner</Label>
          <Input
            id="banner"
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            {...register("banner")}
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Title"
            {...register("title")}
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="genre">Genre</Label>
          <Input
            type="text"
            id="genre"
            placeholder="Genre"
            {...register("genre")}
          />
        </div>

        {/* Repeat the above pattern for other input fields */}

        <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="duration">Duration</Label>
        <Input type="text" id="duration" placeholder="Duration" 
        {...register("duration")}
        />
      </div>

      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="release">Release Date</Label>
        <Input type="date" id="release" 
        {...register("release")}
        />
      </div>

      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="language">Language</Label>
        <Input type="text" id="language" placeholder="Language"
        {...register("language")}
        />
      </div>

      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="cast">Cast</Label>
        <Input type="text" id="cast" placeholder="Starcast"
        {...register("cast")}
        />
      </div>
      
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="size">Size</Label>
        <Input type="text" id="size" placeholder="Size"
        {...register("size")}
        />
      </div>

      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="moviestory">Movie Story</Label>
        <Input type="text" id="moviestory" placeholder="Movie Story"
        {...register("moviestory")}
        />
      </div>

      <div className="grid w-full max-w-md gap-1.5">
      <Label htmlFor="description">Description</Label>
      <Textarea placeholder="Type Description here." id="description"
      {...register("description")}
      />
    </div>
        
        <Button type="submit">Add Movie</Button>
      </form>
    </section>
  );
}
