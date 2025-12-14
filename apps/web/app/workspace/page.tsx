import { getServerSession } from "next-auth"
import Workspace from "../../components/joinspace"
import { authOptions } from "../../lib/auth"
import { redirect } from "next/navigation"
import Navbar from "@/components/header"

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