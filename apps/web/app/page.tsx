"use client"
import "./page.module.css";
import Canvas from "../components/canvas";
import { msg } from "../types/common";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMounted } from "../hooks/mounted";
import Background from "@/components/hero";
import SpotlightEffect from "@/components/background";
import Header from "@/components/header";
import Hero from "@/components/hero";

export default function Home() {
  return(
    <SpotlightEffect>
      <Header />
      <Hero />
    </SpotlightEffect>
  )  
}
