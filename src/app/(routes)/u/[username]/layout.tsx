// "use client"
import Navbar from "@/components/tier1/Navbar";
import Head from "next/head";
import { setTimeout } from "timers/promises";
import { useUsernameCheck } from "@/hooks/useUsernameCheck";
import axios from "axios";

interface Params {
  username: string;
}

export default async function  Layout({ children, params }: { params: Params , children: React.ReactNode }) {
const url = `http://localhost:3000/api/check-username?username=${params.username}`;  
console.log(`loading`)  
const data = await axios.get(url)
console.log(data)
  return (
    <>
      
    </>
  );
}