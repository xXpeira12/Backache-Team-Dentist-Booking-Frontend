import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function UserDashboardPage() {
    const session = await getServerSession(authOptions)
    return (
        <div>
            <h1>{session?.user._id}</h1>
        </div>
    )
}