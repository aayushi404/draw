"use client"
import { redirect } from "next/navigation";
import { Button } from "@repo/ui/button";
import { createRoom, joinRoom } from "./actions";
import { useSession } from "next-auth/react";
import useSocket from "../../hooks/socket";
import { useState, useEffect } from "react";

export default function Workspace() {
    const { data: session, status } = useSession();
    const { socket, loading } = useSocket();
    if (status !== "authenticated") {
        redirect("/")
    }
    if (!loading && socket) {
        return (
            <div>
                <div>Create or Join a workspace</div>
                <div>
                    <Button clickAction={() => joinRoom(socket)} >Join Room</Button>
                    <Button clickAction={() => createRoom(socket)}>Create Room</Button>
                </div>
            </div>
        )
    }
}