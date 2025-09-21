'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ArrowRight,
    Bot,
    Users,
    Target,
    TrendingUp,
    MessageCircle,
    Briefcase,
    GraduationCap,
    Star
} from 'lucide-react';
import { Footer } from './Footer';

interface HeroProps {
    onGetStarted?: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
    const features = [
        {
            icon: Target,
            title: "Career Planning",
            description: "Get personalized career roadmaps tailored to your goals"
        },
        {
            icon: Briefcase,
            title: "Job Search Strategy",
            description: "Master the art of finding and landing your dream job"
        },
        {
            icon: MessageCircle,
            title: "Interview Prep",
            description: "Practice with AI and get ready for any interview"
        },
        {
            icon: GraduationCap,
            title: "Skill Development",
            description: "Identify gaps and create learning plans for growth"
        }
    ];

    const stats = [
        { value: "10K+", label: "Career Conversations" },
        { value: "95%", label: "Success Rate" },
        { value: "24/7", label: "Available Support" }
    ];

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-black dark:to-gray-900">
                {/* Main Hero Section */}
                <div className="container mx-auto px-4 pt-20 pb-16">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2">
                            <Bot className="h-4 w-4 mr-2" />
                            AI-Powered Career Guidance
                        </Badge>

                        {/* Main Headlines */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                            Your AI Career
                            <span className="block text-blue-600">Counselor</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            Get personalized career guidance, interview preparation, and job search strategies
                            powered by advanced AI. Your path to success starts here.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Button
                                onClick={() => window.location.href = '/signup'}
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg group"
                            >
                                Start Your Journey
                                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-border px-8 py-4 text-lg hover:bg-accent"
                            >
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mb-16">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
                            Everything you need to succeed
                        </h2>
                        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                            Our AI counselor provides comprehensive support for every stage of your career journey
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                                            <feature.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-3 text-lg">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial Section */}
                    <div className="max-w-4xl mx-auto mt-20 text-center">
                        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="flex justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <blockquote className="text-lg md:text-xl text-foreground mb-6 italic">
                                    "The AI Career Counselor helped me transition from marketing to tech in just 8 months.
                                    The personalized guidance and interview preparation were game-changers."
                                </blockquote>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                        JD
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-foreground">John Doe</div>
                                        <div className="text-muted-foreground text-sm">Software Developer at TechCorp</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center mt-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Ready to accelerate your career?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of professionals who have transformed their careers with AI-powered guidance.
                        </p>
                        <Button
                            onClick={() => window.location.href = '/signup'}
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg"
                        >
                            Get Started Free
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}