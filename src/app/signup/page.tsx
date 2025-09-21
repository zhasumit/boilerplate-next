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

export default function SignUp() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Fill in your details to sign up
                    </CardDescription>
                </CardHeader>



                <CardContent>
                    <form>
                        <div className="flex flex-col gap-3">
                            {/* Name */}
                            <div className="grid gap-1">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="grid gap-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="grid gap-1">
                                <Label htmlFor="password" className="flex items-center gap-1">
                                    Password
                                </Label>
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

                            {/* Confirm Password */}
                            <div className="grid gap-1">
                                <Label
                                    htmlFor="confirmPassword"
                                    className="flex items-center gap-1"
                                >
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex-col gap-1">
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                    <div className="mt-2 mb-1 flex items-center w-full gap-2">
                        <Separator className="flex-1" orientation="horizontal" />
                        <span className="text-muted-foreground text-sm">or continue with</span>
                        <Separator className="flex-1" orientation="horizontal" />
                    </div>
                    <div className="flex gap-1 w-full">
                        <Button
                            variant="outline"
                            className="flex-1 flex items-center justify-center gap-1"
                        >
                            <GithubIcon className="w-4 h-4" />
                            Github
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 flex items-center justify-center gap-1"
                        >
                            <GoogleIcon size={18} />
                            Google
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {/* Login redirect */}
            <p className="text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Log in
                </Link>
            </p>
        </div>
    )
}
