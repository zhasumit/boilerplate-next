"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GithubIcon, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import GoogleIcon from "@/components/icons/GoogleIcon"

export default function Login() {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center gap-4 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>

                            {/* Password with reveal */}
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/reset-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>

                    {/* Separator */}
                    <div className="mt-2 mb-1 flex items-center w-full gap-2">
                        <Separator className="flex-1" orientation="horizontal" />
                        <span className="text-muted-foreground text-sm">
                            or continue with
                        </span>
                        <Separator className="flex-1" orientation="horizontal" />
                    </div>

                    {/* Social logins */}
                    <div className="flex gap-2 w-full">
                        <Button
                            variant="outline"
                            className="flex-1 flex items-center justify-center gap-2"
                        >
                            <GithubIcon className="w-4 h-4" />
                            Github
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 flex items-center justify-center gap-2"
                        >
                            <GoogleIcon size={18} />
                            Google
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {/* Signup section outside the card */}
            <p className="text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link
                    href="/signup"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    )
}
