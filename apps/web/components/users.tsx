const Users = ({roomId}:{roomId:string}) => {
    const users = getUsers(roomId)
    return (
        <div>
            {JSON.stringify(users)}
        </div>
    )
}
export default Users