'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {RotateCcw} from "lucide-react";
import {login} from "@/app/actions/login";
import Link from "next/link";
import {Icon} from "@iconify/react/dist/iconify.js";

const initialState = {
    error: null,
    success: false
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending ? (
                <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </>
            ) : (
                'Sign In'
            )}
        </Button>
    )
}

export default function LoginForm() {
    const [state, formAction] = useFormState(login, initialState)
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            router.push('/admin')
        }
    }, [state.success, router])

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <Link href="/" className="text-red-600 text-xl">
                    <Icon icon="ion:arrow-back" />
                </Link>
                <CardTitle className="text-center">
                    Login
                </CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" name="username" type="username" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-4">
                    <SubmitButton />
                    {state.error && (
                        <Alert variant="destructive">
                            <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </form>
        </Card>
    )
}