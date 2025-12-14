"use client"
import { useWorkspaceContext } from "../hooks/storeHooks"

const Users = () => {
    const activeUsers = useWorkspaceContext((state) => state.activeUsers)
    return (
        <div className="bg-gray-600">
            {JSON.stringify(activeUsers)}
        </div>
    )
}
export default Users