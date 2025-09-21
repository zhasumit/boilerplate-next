'use client';

import React, { useState, useEffect } from 'react';
import { ChatInterface } from './ChatInterface';
import { ChatSidebar, type ChatSession } from './ChatSidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

// Mock data - replace with actual data from your backend
const mockSessions: ChatSession[] = [
    {
        id: '1',
        title: 'Career Change to Tech',
        lastMessage: 'Thanks for the advice on transitioning from marketing to software development!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        messageCount: 12,
        category: 'career-planning'
    },
    {
        id: '2',
        title: 'Interview Preparation Tips',
        lastMessage: 'What are the most common behavioral interview questions?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        messageCount: 8,
        category: 'interview-prep'
    },
    {
        id: '3',
        title: 'Remote Job Search Strategy',
        lastMessage: 'How can I find remote opportunities in my field?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        messageCount: 15,
        category: 'job-search'
    },
    {
        id: '4',
        title: 'Skill Development Plan',
        lastMessage: 'Should I focus on technical or soft skills first?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        messageCount: 6,
        category: 'skill-development'
    },
    {
        id: '5',
        title: 'Salary Negotiation Advice',
        lastMessage: 'What\'s the best way to negotiate a higher salary?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        messageCount: 10,
        category: 'general'
    }
];

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

// Mock messages for demonstration
const mockMessages: Record<string, Message[]> = {
    '1': [
        {
            id: 'm1',
            content: 'Hi! I\'m currently working in marketing but I\'ve always been interested in technology. I\'m considering a career change to software development. What would you recommend as the first steps?',
            role: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 45)
        },
        {
            id: 'm2',
            content: 'That\'s an exciting career transition! Here\'s what I\'d recommend as your first steps:\n\n1. **Assess your transferable skills** - Your marketing background gives you valuable skills in communication, project management, and understanding user needs.\n\n2. **Choose a learning path** - Start with beginner-friendly languages like Python or JavaScript. Consider online platforms like freeCodeCamp, Codecademy, or The Odin Project.\n\n3. **Build a portfolio** - Create small projects that showcase your skills. Even simple websites or applications demonstrate your capabilities.\n\n4. **Network in the tech community** - Attend local meetups, join online communities, and connect with developers on LinkedIn.\n\nWhat aspect of software development interests you most? Frontend, backend, or full-stack development?',
            role: 'assistant',
            timestamp: new Date(Date.now() - 1000 * 60 * 44)
        },
        {
            id: 'm3',
            content: 'I think I\'m most interested in full-stack development. I like the idea of being able to work on both the user interface and the behind-the-scenes functionality. How long does it typically take to become job-ready?',
            role: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 42)
        },
        {
            id: 'm4',
            content: 'Full-stack development is a great choice! It gives you versatility and a comprehensive understanding of how applications work.\n\nTypically, becoming job-ready takes:\n- **6-12 months** with dedicated full-time study (40+ hours/week)\n- **12-18 months** with part-time study while working (15-20 hours/week)\n\nFor full-stack, I recommend this learning sequence:\n1. **HTML, CSS, JavaScript** (2-3 months)\n2. **Frontend framework** like React or Vue (2-3 months)\n3. **Backend basics** - Node.js, databases, APIs (2-3 months)\n4. **Full-stack projects** - combining everything (2-3 months)\n\nYour marketing background is actually an advantage - you understand user experience and business needs, which many developers lack. Have you started learning any programming concepts yet?',
            role: 'assistant',
            timestamp: new Date(Date.now() - 1000 * 60 * 40)
        }
    ],
    '2': [
        {
            id: 'm5',
            content: 'I have a job interview next week and I\'m nervous about the behavioral questions. What are some common ones I should prepare for?',
            role: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
        },
        {
            id: 'm6',
            content: 'Great question! Behavioral interviews are very common. Here are the most frequently asked behavioral questions you should prepare for:\n\n**Leadership & Teamwork:**\n- Tell me about a time you led a team\n- Describe a conflict you had with a coworker and how you resolved it\n- Give an example of when you had to work with a difficult person\n\n**Problem Solving:**\n- Describe a challenging problem you faced and how you solved it\n- Tell me about a time you failed and what you learned\n- Give an example of when you had to think outside the box\n\n**Communication:**\n- Tell me about a time you had to explain something complex to someone\n- Describe a presentation you gave that didn\'t go as planned\n\n**Use the STAR method:** Situation, Task, Action, Result. This structure helps you give complete, compelling answers.',
            role: 'assistant',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 300)
        }
    ]
};

export default function ChatLayout() {
    const [sessions, setSessions] = useState<ChatSession[]>(mockSessions);
    const [activeSessionId, setActiveSessionId] = useState<string | null>('1');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setMobileSheetOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load messages for active session
    useEffect(() => {
        if (activeSessionId) {
            setMessages(mockMessages[activeSessionId] || []);
        }
    }, [activeSessionId]);

    const handleSelectSession = (sessionId: string) => {
        setActiveSessionId(sessionId);
        setMobileSheetOpen(false); // Close mobile sheet when selecting
    };

    const handleCreateNewChat = () => {
        const newSession: ChatSession = {
            id: Date.now().toString(),
            title: 'New Chat',
            lastMessage: '',
            timestamp: new Date(),
            messageCount: 0,
            category: 'general'
        };

        setSessions(prev => [newSession, ...prev]);
        setActiveSessionId(newSession.id);
        setMessages([]);
        setMobileSheetOpen(false);
    };

    const handleDeleteSession = (sessionId: string) => {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        if (activeSessionId === sessionId) {
            const remainingSessions = sessions.filter(s => s.id !== sessionId);
            setActiveSessionId(remainingSessions[0]?.id || null);
        }
    };

    const handleRenameSession = (sessionId: string, newTitle: string) => {
        setSessions(prev =>
            prev.map(session =>
                session.id === sessionId
                    ? { ...session, title: newTitle }
                    : session
            )
        );
    };

    const handleSendMessage = async (content: string) => {
        if (!activeSessionId) return;

        // Add user message immediately
        const userMessage: Message = {
            id: Date.now().toString(),
            content,
            role: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        // Update session with last message and increment message count
        setSessions(prev =>
            prev.map(session =>
                session.id === activeSessionId
                    ? {
                        ...session,
                        lastMessage: content,
                        timestamp: new Date(),
                        messageCount: session.messageCount + 1,
                        title: session.title === 'New Chat' ? content.slice(0, 30) + '...' : session.title
                    }
                    : session
            )
        );

        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: generateMockResponse(content),
                role: 'assistant',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);

            // Update session with assistant message count
            setSessions(prev =>
                prev.map(session =>
                    session.id === activeSessionId
                        ? {
                            ...session,
                            lastMessage: assistantMessage.content.slice(0, 100) + '...',
                            messageCount: session.messageCount + 1
                        }
                        : session
                )
            );
        }, 1500);
    };

    const generateMockResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('career change') || lowerMessage.includes('transition')) {
            return `Career transitions can be exciting but challenging. Here are some key steps to consider:\n\n1. **Assess your transferable skills** - Identify what you already know that applies to your target field\n2. **Research the new industry** - Understand requirements, salary expectations, and growth opportunities\n3. **Network actively** - Connect with professionals in your target field\n4. **Consider gradual transition** - Part-time courses, freelance projects, or volunteering\n5. **Update your brand** - LinkedIn, resume, and portfolio should reflect your new direction\n\nWhat specific field are you considering transitioning into?`;
        }

        if (lowerMessage.includes('interview') || lowerMessage.includes('preparation')) {
            return `Interview preparation is crucial for success. Here's a comprehensive approach:\n\n**Research Phase:**\n- Company background, mission, recent news\n- Role requirements and expectations\n- Common interview questions for the position\n\n**Practice Phase:**\n- Mock interviews with friends or professionals\n- Record yourself answering questions\n- Prepare STAR method examples\n\n**Day of Interview:**\n- Arrive 10-15 minutes early\n- Bring multiple copies of your resume\n- Prepare thoughtful questions about the role and company\n\nWhat type of interview are you preparing for?`;
        }

        if (lowerMessage.includes('salary') || lowerMessage.includes('negotiation')) {
            return `Salary negotiation is a crucial skill. Here's how to approach it effectively:\n\n**Research First:**\n- Use sites like Glassdoor, PayScale, LinkedIn Salary Insights\n- Consider location, experience, and company size\n- Know your market value\n\n**Negotiation Strategy:**\n- Wait for the offer before discussing salary\n- Express enthusiasm for the role first\n- Present your case with data and examples\n- Consider the entire package (benefits, PTO, flexibility)\n\n**Sample Script:**\n"I'm excited about this opportunity. Based on my research and experience, the market rate for this position is $X-Y. Would there be flexibility to discuss compensation?"\n\nWhat's your current situation with salary discussions?`;
        }

        // Default response
        return `Thank you for your question about "${userMessage.slice(0, 50)}${userMessage.length > 50 ? '...' : ''}"\n\nI'd be happy to help you with your career-related inquiry. As a career counselor AI, I can assist with:\n\n• Career planning and transitions\n• Job search strategies\n• Interview preparation\n• Salary negotiation\n• Skill development\n• Professional networking\n• Resume and LinkedIn optimization\n\nCould you provide more specific details about your situation so I can give you more targeted advice?`;
    };

    const activeSession = sessions.find(s => s.id === activeSessionId);

    const SidebarContent = () => (
        <ChatSidebar
            sessions={sessions}
            activeSessionId={activeSessionId || undefined}
            onSelectSession={handleSelectSession}
            onCreateNewChat={handleCreateNewChat}
            onDeleteSession={handleDeleteSession}
            onRenameSession={handleRenameSession}
            isCollapsed={sidebarCollapsed}
        />
    );

    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">
            {/* Desktop Sidebar */}
            {!isMobile && <SidebarContent />}

            {/* Mobile Sidebar */}
            {isMobile && (
                <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                    <SheetContent side="left" className="p-0 w-80">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Bar */}
                <div className="flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        {isMobile ? (
                            <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                            </Sheet>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            >
                                {sidebarCollapsed ? (
                                    <PanelLeftOpen className="h-5 w-5" />
                                ) : (
                                    <PanelLeftClose className="h-5 w-5" />
                                )}
                            </Button>
                        )}

                        {activeSession && (
                            <div className="min-w-0">
                                <h1 className="font-semibold text-gray-900 truncate">
                                    {activeSession.title}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    {activeSession.messageCount} messages
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Interface */}
                {activeSessionId && activeSession ? (
                    <ChatInterface
                        chatId={activeSessionId}
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
                        <div className="text-center max-w-md mx-auto p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Menu className="h-8 w-8 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Welcome to Career Counselor AI
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Start a new conversation to get personalized career guidance and advice.
                            </p>
                            <Button
                                onClick={handleCreateNewChat}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Start New Chat
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}