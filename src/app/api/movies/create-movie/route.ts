// Import required modules and Prisma Client instance

import prisma from "../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import verifyJWT from "@/middleware/verifyJWT";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await verifyJWT(request, response);

    // Parse incoming request body to extract movie data
    const {
      id,
      banner,
      title,
      genre,
      duration,
      release,
      language,
      cast,
      size,
      moviestory,
      description,
      authorId,
      watchlink,
      screenshort,
      tag
    } = await request.json();

    // Query the database to check if the movie already exists
    let existingMovie = id ?  await prisma.movie.findUnique({
      where: {
        id: id,
      },
    }) : null

    // If the movie exists, update its data
    if (existingMovie) {
      existingMovie = await prisma.movie.update({
        where: {
          id: existingMovie.id,
        },
        data: {
          banner : banner,
          title: title,
          genre: genre,
          duration: duration,
          release: release,
          language: language,
          cast: cast,
          size: size,
          moviestory: moviestory,
          description: description,
          authorId: authorId,
          watchlink: watchlink,
          screenshort: screenshort,
          tag : tag
        },
      });
      return NextResponse.json({
        statusCode: 200,
        status: "success",
        message: "Movie updated successfully",
        movie: existingMovie,
      });
    } else {
      // If the movie doesn't exist, create a new movie entry
      const newMovie = await prisma.movie.create({
        data: {
          banner : banner,
          title: title,
          genre: genre,
          duration: duration,
          release: release,
          language: language,
          cast: cast,
          size: size,
          moviestory: moviestory,
          description: description,
          authorId: authorId,
          watchlink: watchlink,
          screenshort: screenshort,
          tag : tag
        },
      });
      return NextResponse.json({
        statusCode: 201,
        status: "success",
        message: "Movie created successfully",
        movie: newMovie,
      });
    }

    // console.log("Verify res is ", verifyRes);

    return NextResponse.json({
        status : 200,
        message : "Movie created successfully"
    })
  } catch (error) {
    console.error("Error processing movie request:", error);
    return NextResponse.json({
      statusCode: 500,
      status: "error",
      message: "Internal Server Error",
    });
  }
}
