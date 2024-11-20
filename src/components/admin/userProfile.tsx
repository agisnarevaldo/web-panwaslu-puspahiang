"use client";

import {useState, useEffect} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {toast} from "@/hooks/use-toast"
import {EditProfileForm} from '@/components/admin/formEditProfilAdmin'
import {SquarePen, User2} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface User {
    id: number
    username: string
    nama: string
    avatar: string | null
}

export default function UserProfile({userId}: { userId: number }) {
    const [user, setUser] = useState<User | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    // const [imageError, setImageError] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admin/${userId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch user data')
                }
                const userData = await response.json()
                setUser(userData)
            } catch (error) {
                console.error('Error fetching user data:', error)
                toast({
                    title: "Error",
                    description: "Failed to load user profile",
                    variant: "destructive",
                })
            }
        }

        fetchUser()
    }, [userId])

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Profil Admin</CardTitle>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <EditProfileForm
                        user={user}
                        onSave={(updatedUser) => {
                            setUser(updatedUser)
                            setIsEditing(false)
                        }}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (

                    <div className="flex items-center justify-between">
                        {/*<div className="relative w-24 h-24 ring-2 ring-red rounded-full">*/}
                        {user.avatar ? (
                            <Avatar className="w-24 h-24 ring-2 ring-red ring-offset-2">
                                <AvatarImage src={user.avatar}/>
                                <AvatarFallback>{user.nama}</AvatarFallback>
                            </Avatar>
                        ) : (
                            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                                <User2 className="w-12 h-12 text-gray-500"/>
                            </div>
                        )}
                        {/*</div>*/}
                        <div>
                            <h2 className="text-xl font-semibold">{user.nama}</h2>
                            <p className="text-gray-500">@{user.username}</p>
                        </div>
                        <Button onClick={() => setIsEditing(true)}>
                            Edit
                            <SquarePen />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}