'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
    Bot,
    Mail,
    Phone,
    MapPin,
    Twitter,
    Linkedin,
    Facebook,
    Instagram,
    Youtube,
    ArrowRight,
    Target,
    Briefcase,
    MessageCircle,
    GraduationCap,
    FileText,
    Users,
    HelpCircle,
    Shield,
    Cookie,
    Scale,
    Award,
    Clock,
    Globe
} from 'lucide-react';

interface FooterProps {
    onNewsletterSubmit?: (email: string) => void;
}

export function Footer({ onNewsletterSubmit }: FooterProps) {
    const [email, setEmail] = React.useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            onNewsletterSubmit?.(email.trim());
            setEmail('');
        }
    };

    const productLinks = [
        { label: 'Career Planning', href: '/features/career-planning', icon: Target },
        { label: 'Job Search', href: '/features/job-search', icon: Briefcase },
        { label: 'Interview Prep', href: '/features/interview-prep', icon: MessageCircle },
        { label: 'Skill Development', href: '/features/skill-development', icon: GraduationCap },
        { label: 'AI Chat', href: '/chat', icon: Bot },
        { label: 'Resume Builder', href: '/resume', icon: FileText }
    ];

    const resourceLinks = [
        { label: 'Career Blog', href: '/blog', icon: FileText },
        { label: 'Success Stories', href: '/success-stories', icon: Users },
        { label: 'Help Center', href: '/help', icon: HelpCircle },
        { label: 'Career Guides', href: '/guides', icon: FileText },
        { label: 'Webinars', href: '/webinars', icon: Globe },
        { label: 'Templates', href: '/templates', icon: FileText }
    ];

    const companyLinks = [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press Kit', href: '/press' },
        { label: 'Partners', href: '/partners' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Brand Guidelines', href: '/brand' }
    ];

    const legalLinks = [
        { label: 'Privacy Policy', href: '/privacy', icon: Shield },
        { label: 'Terms of Service', href: '/terms', icon: Scale },
        { label: 'Cookie Policy', href: '/cookies', icon: Cookie },
        { label: 'GDPR', href: '/gdpr', icon: Shield },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Security', href: '/security' }
    ];

    const socialLinks = [
        { icon: Twitter, href: 'https://twitter.com/careerai', label: 'Twitter' },
        { icon: Linkedin, href: 'https://linkedin.com/company/careerai', label: 'LinkedIn' },
        { icon: Facebook, href: 'https://facebook.com/careerai', label: 'Facebook' },
        { icon: Instagram, href: 'https://instagram.com/careerai', label: 'Instagram' },
        { icon: Youtube, href: 'https://youtube.com/careerai', label: 'YouTube' }
    ];

    const features = [
        { icon: Award, text: 'ISO 27001 Certified' },
        { icon: Clock, text: '24/7 AI Support' },
        { icon: Users, text: '50K+ Users Trust Us' },
        { icon: Globe, text: 'Global Career Database' }
    ];

    return (
        <footer className="bg-background border-t">
            {/* Newsletter Section */}
            <div className="border-b border-border">
                <div className="container mx-auto px-4 py-12">
                    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white">
                        <CardContent className="p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                                        Stay ahead in your career
                                    </h3>
                                    <p className="text-blue-100 text-lg mb-4 md:mb-0">
                                        Get weekly career tips, job market insights, and exclusive resources
                                        delivered to your inbox.
                                    </p>
                                </div>
                                <div>
                                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-100"
                                            required
                                        />
                                        <Button
                                            type="submit"
                                            className="bg-white text-blue-600 hover:bg-gray-100 whitespace-nowrap"
                                        >
                                            Subscribe
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </form>
                                    <p className="text-xs text-blue-100 mt-2">
                                        Join 10,000+ professionals. Unsubscribe anytime.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Bot className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">CareerAI</span>
                            <Badge className="bg-blue-600 text-white">Beta</Badge>
                        </div>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Empowering careers through AI-powered guidance. Get personalized advice,
                            interview preparation, and job search strategies tailored to your goals.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <feature.icon className="h-4 w-4 text-blue-400" />
                                    <span className="text-sm text-gray-300">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-400" />
                                <a href="mailto:support@careerai.com" className="hover:text-white transition-colors">
                                    support@careerai.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-blue-400" />
                                <a href="tel:+1-555-0123" className="hover:text-white transition-colors">
                                    +1 (555) 012-3456
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-blue-400" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Products</h4>
                        <ul className="space-y-2">
                            {productLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <link.icon className="h-3 w-3 text-gray-400 group-hover:text-blue-400" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Resources</h4>
                        <ul className="space-y-2">
                            {resourceLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <link.icon className="h-3 w-3 text-gray-400 group-hover:text-blue-400" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Company</h4>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <Separator className="my-4 bg-gray-700" />

                        <h5 className="font-medium mb-3 text-white text-sm">Legal</h5>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        {link.icon && <link.icon className="h-3 w-3 text-gray-400 group-hover:text-blue-400" />}
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Connect</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.href}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4 text-gray-300 group-hover:text-white" />
                                </a>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h5 className="font-medium mb-2 text-white text-sm">Download App</h5>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm" className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-gray-400 rounded"></div>
                                            App Store
                                        </div>
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-gray-400 rounded"></div>
                                            Google Play
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Bottom Footer */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>© 2024 CareerAI. All rights reserved.</span>
                        <Separator orientation="vertical" className="h-4 bg-gray-700" />
                        <span>Made with ❤️ for career growth</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Status: All systems operational</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <Separator orientation="vertical" className="h-4 bg-gray-700" />
                        <a href="/status" className="hover:text-white transition-colors">
                            System Status
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}