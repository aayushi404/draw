import { getServerSession } from "next-auth"
import Workspace from "../../components/joinspace"
import { authOptions } from "../../lib/auth"
import { redirect } from "next/navigation"

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/")
    }
    return (
        <Workspace session={ session } />
    )
}