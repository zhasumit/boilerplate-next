'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

interface ChatInterfaceProps {
    chatId: string;
    messages: Message[];
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
}

export function ChatInterface({
    chatId,
    messages,
    onSendMessage,
    isLoading = false
}: ChatInterfaceProps) {
    const [inputMessage, setInputMessage] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSendMessage = () => {
        if (inputMessage.trim() && !isLoading) {
            onSendMessage(inputMessage.trim());
            setInputMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }
        }
    }, [messages]);

    // Focus input when component mounts
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-hidden">
            {/* Chat Header */}
            <div className="border-b bg-white/80 backdrop-blur-sm p-4 flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/career-counselor-avatar.png" />
                    <AvatarFallback className="bg-blue-600 text-white">
                        <Bot className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold text-gray-900">Career Counselor AI</h3>
                    <p className="text-xs text-gray-500">Your personalized career guidance assistant</p>
                </div>
            </div>

            {/* Messages Area */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 h-0 p-4">
                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <div className="text-center py-12">
                            <Bot className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Welcome to Career Counselor AI
                            </h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                I'm here to help you navigate your career journey. Ask me about career paths,
                                job searching, skill development, or any career-related questions.
                            </p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))
                    )}

                    {isLoading && (
                        <div className="flex justify-start">
                            <Card className="max-w-xs bg-white shadow-sm border-blue-100">
                                <CardContent className="p-3">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="text-sm">Thinking...</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t bg-white/80 backdrop-blur-sm p-4">
                <div className="flex gap-2 max-w-4xl mx-auto">
                    <Input
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me about your career..."
                        disabled={isLoading}
                        className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function MessageBubble({ message }: { message: Message }) {
    const isUser = message.role === 'user';

    return (
        <div className={cn(
            'flex gap-3',
            isUser ? 'justify-end' : 'justify-start'
        )}>
            {!isUser && (
                <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-blue-600 text-white">
                        <Bot className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
            )}

            <Card className={cn(
                'max-w-[80%] sm:max-w-md lg:max-w-lg shadow-sm',
                isUser
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-200'
            )}>
                <CardContent className="p-3">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                    </p>
                    <div className={cn(
                        'text-xs mt-2 opacity-70',
                        isUser ? 'text-blue-100' : 'text-gray-500'
                    )}>
                        {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </CardContent>
            </Card>

            {isUser && (
                <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-gray-600 text-white">
                        <User className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}