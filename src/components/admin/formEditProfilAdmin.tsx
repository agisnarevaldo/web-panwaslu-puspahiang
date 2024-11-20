'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import {Save, X} from "lucide-react";

interface User {
    id: number
    username: string
    nama: string
    avatar: string | null
}

interface EditProfileFormProps {
    user: User
    onSave: (updatedUser: User) => void
    onCancel: () => void
}

export function EditProfileForm({ user, onSave, onCancel }: EditProfileFormProps) {
    const [nama, setNama] = useState(user.nama)
    const [username, setUsername ] = useState(user.username)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [avatar, setAvatar] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData()
        formData.append('nama', nama)
        if (currentPassword) formData.append('currentPassword', currentPassword)
        if (newPassword) formData.append('newPassword', newPassword)
        if (avatar) formData.append('avatar', avatar)

        try {
            const response = await fetch(`/api/users/${user.id}`, {
                method: 'PUT',
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to update profile')
            }

            const updatedUser = await response.json()
            toast({
                title: "Profile updated",
                description: "Your profile has been successfully updated.",
            })
            onSave(updatedUser)
        } catch (error) {
            console.error('Update error:', error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to update profile",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                    id="name"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="currentPassword">Password Lama (diperlukan)</Label>
                <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="newPassword">Password Baru</Label>
                <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                />
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Batal
                    <X/>
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <span className="animate-spin">Saving...</span>
                    ) : (
                        <>
                            {"Simpan "} <Save/>
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}