"use client"
import "./page.module.css";
import Canvas from "../components/canvas";
import { msg } from "../types/common";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMounted } from "../hooks/mounted";

export default function Home() {
  const mount = useMounted()
  const { data: session } = useSession()
  const [tempState, setTempState] = useState<msg[]>([{ message: "", createdAt: "", userId: session?.user?.id ?? "" }])
  function updateState(newMsg: msg[]) {
    setTempState((prev) => [...prev, ...newMsg])
  }
  if (mount){
    return (
      <div>
        <Canvas roomId={null} messages={tempState!} updateMessage={updateState} socket={null} />
      </div>
    )
  }
}
