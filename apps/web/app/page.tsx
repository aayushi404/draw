import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}
