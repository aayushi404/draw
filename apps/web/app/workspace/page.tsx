"use client"

import { getServerSession } from "next-auth"
import Workspace from "../../components/joinspace"
import { authOptions } from "../../lib/auth"
import { redirect } from "next/navigation"
import Navbar from "@/components/header"
import { useMounted } from "@/hooks/mounted"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { msg } from "@/types/common"
import Canvas from "@/components/canvas"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/*
export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/")
    }
    return (
        <div className="flex-col gap-5">
            <Navbar />
            <Workspace session={ session } />
        </div>
    )
}
*/

export default function Page(){
    const mount = useMounted()
    const { data: session } = useSession()
    const [tempState, setTempState] = useState<msg[]>([{ message: "", createdAt: "", userId: session?.user?.id ?? "" }])
    function updateState(newMsg: msg[]) {
        setTempState((prev) => [...prev, ...newMsg])
    }
    if (mount){
        return (
        <div className="">
            {session && <Workspace session={session}/>}
            <Canvas roomId={null} messages={tempState!} updateMessage={updateState} socket={null} />
        </div>
        )
    }
}