'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
    Bot,
    Menu,
    X,
    Target,
    Briefcase,
    MessageCircle,
    GraduationCap,
    Users,
    FileText,
    HelpCircle,
    Mail,
    Phone,
    Moon,
    Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
    onGetStarted?: () => void;
    onSignIn?: () => void;
}

export function Navbar({ onGetStarted, onSignIn }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check for saved theme preference or default to system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);

        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const features = [
        {
            title: "Career Planning",
            description: "Get personalized career roadmaps and goal setting",
            icon: Target,
            href: "/features/career-planning"
        },
        {
            title: "Job Search",
            description: "Master job hunting with AI-powered strategies",
            icon: Briefcase,
            href: "/features/job-search"
        },
        {
            title: "Interview Prep",
            description: "Practice interviews and get real-time feedback",
            icon: MessageCircle,
            href: "/features/interview-prep"
        },
        {
            title: "Skill Development",
            description: "Identify skill gaps and create learning paths",
            icon: GraduationCap,
            href: "/features/skill-development"
        }
    ];

    const resources = [
        {
            title: "Career Blog",
            description: "Latest insights and career advice",
            icon: FileText,
            href: "/blog"
        },
        {
            title: "Success Stories",
            description: "Real stories from our users",
            icon: Users,
            href: "/success-stories"
        },
        {
            title: "Help Center",
            description: "Get answers to common questions",
            icon: HelpCircle,
            href: "/help"
        }
    ];

    const company = [
        {
            title: "About Us",
            description: "Learn about our mission",
            href: "/about"
        },
        {
            title: "Contact",
            description: "Get in touch with our team",
            href: "/contact"
        },
        {
            title: "Privacy",
            description: "How we protect your data",
            href: "/privacy"
        }
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-foreground">
                        CareerAI
                    </span>
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        Beta
                    </Badge>
                </div>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        {/* Features Dropdown */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid w-[600px] grid-cols-2 gap-3 p-6">
                                    {features.map((feature) => (
                                        <NavigationMenuLink key={feature.title} asChild>
                                            <a
                                                href={feature.href}
                                                className="block space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <feature.icon className="h-4 w-4 text-blue-600 group-hover:text-blue-700" />
                                                    <div className="text-sm font-medium leading-none text-foreground">
                                                        {feature.title}
                                                    </div>
                                                </div>
                                                <p className="text-sm leading-snug text-muted-foreground">
                                                    {feature.description}
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    ))}
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Resources Dropdown */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="w-[400px] p-6">
                                    <div className="grid gap-3">
                                        {resources.map((resource) => (
                                            <NavigationMenuLink key={resource.title} asChild>
                                                <a
                                                    href={resource.href}
                                                    className="flex items-start space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                >
                                                    <resource.icon className="h-4 w-4 text-blue-600 mt-1" />
                                                    <div className="space-y-1">
                                                        <div className="text-sm font-medium leading-none">
                                                            {resource.title}
                                                        </div>
                                                        <p className="text-sm leading-snug text-muted-foreground">
                                                            {resource.description}
                                                        </p>
                                                    </div>
                                                </a>
                                            </NavigationMenuLink>
                                        ))}
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {/* Company Dropdown */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="w-[300px] p-6">
                                    <div className="grid gap-3">
                                        {company.map((item) => (
                                            <NavigationMenuLink key={item.title} asChild>
                                                <a
                                                    href={item.href}
                                                    className="block space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                >
                                                    <div className="text-sm font-medium leading-none">
                                                        {item.title}
                                                    </div>
                                                    <p className="text-sm leading-snug text-muted-foreground">
                                                        {item.description}
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        ))}
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Desktop CTA Buttons */}
                <div className="hidden md:flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleDarkMode}
                        className="mr-2"
                    >
                        {isDarkMode ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                    </Button>
                    <Button variant="ghost" onClick={() => window.location.href = '/login'}>
                        Sign In
                    </Button>
                    <Button onClick={() => window.location.href = '/signup'} className="bg-blue-600 hover:bg-blue-700">
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                        <SheetHeader>
                            <SheetTitle className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                                    <Bot className="h-4 w-4 text-white" />
                                </div>
                                CareerAI
                            </SheetTitle>
                            <SheetDescription>
                                Navigate to different sections
                            </SheetDescription>
                        </SheetHeader>

                        <div className="mt-6 space-y-6">
                            {/* Features Section */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                                <div className="space-y-2">
                                    {features.map((feature) => (
                                        <a
                                            key={feature.title}
                                            href={feature.href}
                                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <feature.icon className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm font-medium">{feature.title}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Resources Section */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
                                <div className="space-y-2">
                                    {resources.map((resource) => (
                                        <a
                                            key={resource.title}
                                            href={resource.href}
                                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <resource.icon className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm font-medium">{resource.title}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <div className="space-y-2">
                                    <a
                                        href="/pricing"
                                        className="block p-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Pricing
                                    </a>
                                    {company.map((item) => (
                                        <a
                                            key={item.title}
                                            href={item.href}
                                            className="block p-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.title}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile CTA Buttons */}
                            <div className="space-y-3 pt-6 border-t">
                                <Button
                                    variant="outline"
                                    onClick={toggleDarkMode}
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    {isDarkMode ? (
                                        <>
                                            <Sun className="h-4 w-4" />
                                            Light Mode
                                        </>
                                    ) : (
                                        <>
                                            <Moon className="h-4 w-4" />
                                            Dark Mode
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        window.location.href = '/login';
                                        setIsOpen(false);
                                    }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    onClick={() => {
                                        window.location.href = '/signup';
                                        setIsOpen(false);
                                    }}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}