"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation"
import Bat from "@/components/Bat"

export default function ResetPassword() {
    const [otpVerified, setOtpVerified] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [verifyPassword, setVerifyPassword] = useState("")
    const [showVerifyPassword, setShowVerifyPassword] = useState(false)
    const [timeLeft, setTimeLeft] = useState(180)
    const router = useRouter()

    const handleVerifyOtp = () => {
        setOtpVerified(true)
    }

    const handleSavePassword = () => {
        if (newPassword !== verifyPassword) {
            alert("Passwords do not match")
            return
        }
        console.log("Password saved:", newPassword)
    }

    useEffect(() => {
        if (otpVerified) return
        if (timeLeft <= 0) {
            router.push("/login")
            return
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
        return () => clearInterval(timer)
    }, [timeLeft, otpVerified, router])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className="relative min-h-[85vh] flex flex-col items-center justify-center gap-3">
            <div className="absolute top-40 right-10">
                <Bat scale={.4} speed={.8} />
            </div>

            {!otpVerified ? (
                <div className="flex flex-col items-start gap-2">
                    <span className="font-semibold text-lg">Verify OTP</span>
                    <p className="text-sm text-gray-500">
                        Check your email for a recently sent OTP.
                        <span className={timeLeft <= 60 ? "text-red-500 mx-1" : "text-gray-700 mx-1"}>
                            {formatTime(timeLeft)}
                        </span>
                        remaining:
                    </p>
                    <div className="flex flex-col gap-4 items-center w-full">
                        <InputOTP maxLength={9}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={6} />
                                <InputOTPSlot index={7} />
                                <InputOTPSlot index={8} />
                            </InputOTPGroup>
                        </InputOTP>
                        <Button onClick={handleVerifyOtp}>Verify OTP</Button>
                    </div>
                </div>
            ) : (
                <Tabs defaultValue="password" className="w-80">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you&apos;re done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-name">Name</Label>
                                    <Input id="tabs-demo-name" placeholder="Username" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Username</Label>
                                    <Input id="tabs-demo-username" placeholder="@username" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Set New Password</CardTitle>
                                <CardDescription>
                                    Enter your new password and confirm it. After saving, you&apos;ll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="new-password">New password</Label>
                                    <div className="relative">
                                        <Input
                                            id="new-password"
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="verify-password">Verify password</Label>
                                    <div className="relative">
                                        <Input
                                            id="verify-password"
                                            type={showVerifyPassword ? "text" : "password"}
                                            value={verifyPassword}
                                            onChange={(e) => setVerifyPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                                            onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                                        >
                                            {showVerifyPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSavePassword}>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
            <p className="text-sm text-muted-foreground">
                Login with existing password{" "}
                <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Login
                </Link>
            </p>
        </div>
    )
}
