"use client"
import { useWorkspaceContext } from "../hooks/storeHooks"
import { AnimatedTooltip } from "./ui/animated-tooltip"

const Users = () => {
    const activeUsers = useWorkspaceContext((state) => state.activeUsers)
    const people = activeUsers.map((item, idx) => {return {id:idx, name:item.name, image:item.image, designation:""}})
    return (
        <div className="flex flex-row items-center justify-center mb-10 w-full z-100 top-3">
            <AnimatedTooltip items={people} />
        </div>
    )
}
export default Users