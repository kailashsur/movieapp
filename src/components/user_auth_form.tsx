"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Icons } from "./icons"

import axios from 'axios'
import { useToast } from "./ui/use-toast"
import { storeInSession } from "@/app/common/session"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  pagestate: any;
  auth: any;
}

export function UserAuthForm({ className, pagestate, auth, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)


  const { pageState, setPageState } = pagestate;
  const { userAuth: { data: { access_token } }, setUserAuth } = auth;

  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();


    const formData = new FormData(event.currentTarget);

    // Create an object to hold the form field values
    const formDataObject: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value as string;
    });

    if(pageState === "login"){
      try {
        let {data, data : {status}} = await axios.post("/api/user/login", {
          email : formDataObject.email,
          password : formDataObject.password
        }, {
          headers : {
            'Authorization' : `Bearer ${access_token}`
          }
        })
  
        console.log(status); // if error comes the data {data : {Error, status}} = loginRes
        if(status == 200){
          let userData = {data : data.data};
  
          setUserAuth(userData)
          storeInSession('user', userData);

          toast({description : "Loged In Successfull"})
          
        }
        else{
          toast({
            variant : "destructive",
            description: `${data.Error}`,
          })
        }
      
      } catch (error) {
        console.log(error);
        
      }
    }
    else{
      try {
        let {data, data : {status}} = await axios.post("/api/user/signup", {
          name : formDataObject.name,
          email : formDataObject.email,
          password : formDataObject.password
        })

        // if error comes the data {data : {Error, status}} = loginRes
        if(status == 200){
          let userData = {data : data.data};
  
          setUserAuth(userData)
          storeInSession('user', userData);
          toast({description : `${data.success}`})
          
        }
        else{
          toast({
            variant : "destructive",
            description: `${data.Error}`,
          })
        }
      
      } catch (error) {
        console.log(error);
        
      }
      
    }


    setIsLoading(true)


    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }





  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">

          {
            pageState === "signup" ?
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Allu Arjun"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              : ""
          }

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Password@123"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>


          <Button disabled={isLoading} type="submit" >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {
              pageState === "login" ? "Login" : "Sign Up"
            }
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}