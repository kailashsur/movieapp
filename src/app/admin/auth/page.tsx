'use client';
import { Metadata } from "next"
import Link from "next/link"
import { UserAuthForm } from "@/components/user_auth_form"
import { buttonVariants } from "@/components/ui/button"
import { useUserContext } from "@/app/context/context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react'

export default function AuthenticationPage() {
  const { userAuth,userAuth: { data: { access_token } }, setUserAuth } = useUserContext();
  
  const [ pageState, setPageState ] = useState("login");

  const router = useRouter()
  const goToAdmin = () => {
    router.push('/admin');
  }



  useEffect(() => {
    if (access_token) {
      goToAdmin();
    }
  }, [access_token]);

  // Render button for authenticated user
  return (

    <section className="w-full max-w-[900px] mt-40 flex justify-center items-center">
      <div className="container relative h-full flex-col items-center justify-center md:border md:rounded-md  ">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {
                  pageState === "login" ? "Login your account" : "Create an account"
                }
              </h1>
              <p className="text-sm text-muted-foreground">
               Enter your details below to { pageState === "login" ? "login" : "create"} your account
              </p>
            </div>
            <UserAuthForm pagestate={{pageState, setPageState}} auth={{userAuth, setUserAuth}} />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {
              pageState === "login" ?
              <p>Don't have an account? <span className=" underline hover:text-purple-600 cursor-pointer"
              onClick={()=>setPageState("signup")}
              >Create account</span></p>
              : 
              <p> Alredy have an account ? <span className=" underline hover:text-purple-600 cursor-pointer"
              onClick={()=>setPageState("login")}
              >Click here</span></p>
            }
          </div>
        </div>
      </div>
    </section>
  );
}



