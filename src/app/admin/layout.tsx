'use client'
import { useEffect, useState } from "react";
import { UserContextProvider } from "../context/context";
import { lookInSession } from "../common/session";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <UserContextProvider>

      <>
        {children}
      </>
    </UserContextProvider>
  )
}
