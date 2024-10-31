import {cookies} from 'next/headers'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {redirect} from "next/navigation";


export default function Page() {
    const userCookie = cookies().get('user')

    if (!userCookie) {
        redirect('/')
    }

    let user
    try {
        user = JSON.parse(userCookie.value)
    } catch {
        redirect('/')
    }

    return (
        <div className="container mx-auto mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>Admin Dashboard</CardTitle>
                    <CardDescription>Welcome to the admin area!</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>You have successfully logged in.</p>
                    {user && (
                        <p>Logged in as: {user.nama}</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}