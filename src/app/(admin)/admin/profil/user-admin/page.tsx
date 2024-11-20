import {cookies} from "next/headers";
import UserProfile from "@/components/admin/userProfile";
import {redirect} from "next/navigation";

export default async function ProfilePage() {
    const cookieStore = cookies()
    const userCookie = cookieStore.get('user')?.value

    if (!userCookie) {
        redirect('/login')
    }

    try {
        const user = JSON.parse(userCookie)
        return (
            <div className="container mx-auto mt-8">
                <UserProfile userId={user.id} />
            </div>
        )
    } catch (error) {
        console.error('User cookie parsing failed:', error)
        redirect('/login')
    }
}