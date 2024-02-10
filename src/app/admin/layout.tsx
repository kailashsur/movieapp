'use client'
import React from "react";
import { useEffect, useState } from "react";
import { UserContextProvider } from "../context/context";
import { lookInSession } from "../common/session";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {

  return (
    <UserContextProvider >
      {children}
    </UserContextProvider>
  )
}
