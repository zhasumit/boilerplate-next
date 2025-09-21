'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Plus,
    MessageSquare,
    Search,
    MoreHorizontal,
    Trash2,
    Edit2,
    Calendar,
    Filter
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface ChatSession {
    id: string;
    title: string;
    lastMessage: string;
    timestamp: Date;
    messageCount: number;
    category?: 'career-planning' | 'job-search' | 'skill-development' | 'interview-prep' | 'general';
}

interface ChatSidebarProps {
    sessions: ChatSession[];
    activeSessionId?: string;
    onSelectSession: (sessionId: string) => void;
    onCreateNewChat: () => void;
    onDeleteSession: (sessionId: string) => void;
    onRenameSession: (sessionId: string, newTitle: string) => void;
    isCollapsed?: boolean;
}

const categoryColors = {
    'career-planning': 'bg-blue-100 text-blue-800',
    'job-search': 'bg-green-100 text-green-800',
    'skill-development': 'bg-purple-100 text-purple-800',
    'interview-prep': 'bg-orange-100 text-orange-800',
    'general': 'bg-gray-100 text-gray-800',
};

const categoryLabels = {
    'career-planning': 'Career Planning',
    'job-search': 'Job Search',
    'skill-development': 'Skills',
    'interview-prep': 'Interview',
    'general': 'General',
};

export function ChatSidebar({
    sessions,
    activeSessionId,
    onSelectSession,
    onCreateNewChat,
    onDeleteSession,
    onRenameSession,
    isCollapsed = false
}: ChatSidebarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');

    const filteredSessions = sessions.filter(session =>
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedSessions = {
        today: filteredSessions.filter(s => isToday(s.timestamp)),
        yesterday: filteredSessions.filter(s => isYesterday(s.timestamp)),
        thisWeek: filteredSessions.filter(s => isThisWeek(s.timestamp) && !isToday(s.timestamp) && !isYesterday(s.timestamp)),
        older: filteredSessions.filter(s => !isThisWeek(s.timestamp)),
    };

    const handleStartEdit = (session: ChatSession) => {
        setEditingSessionId(session.id);
        setEditTitle(session.title);
    };

    const handleSaveEdit = () => {
        if (editingSessionId && editTitle.trim()) {
            onRenameSession(editingSessionId, editTitle.trim());
        }
        setEditingSessionId(null);
        setEditTitle('');
    };

    const handleCancelEdit = () => {
        setEditingSessionId(null);
        setEditTitle('');
    };

    if (isCollapsed) {
        return (
            <div className="w-16 border-r bg-white/50 backdrop-blur-sm flex flex-col items-center py-4 gap-3">
                <Button
                    onClick={onCreateNewChat}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Plus className="h-4 w-4" />
                </Button>
                <div className="flex-1 w-full px-2">
                    <ScrollArea className="h-full">
                        <div className="space-y-2">
                            {sessions.slice(0, 10).map((session) => (
                                <Button
                                    key={session.id}
                                    variant={session.id === activeSessionId ? "secondary" : "ghost"}
                                    size="icon"
                                    className="w-full"
                                    onClick={() => onSelectSession(session.id)}
                                >
                                    <MessageSquare className="h-4 w-4" />
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        );
    }

    return (
        <div className="w-80 border-r bg-white/50 backdrop-blur-sm flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="font-semibold text-gray-900">Chat Sessions</h2>
                    <Badge variant="secondary" className="text-xs">
                        {sessions.length}
                    </Badge>
                </div>

                <Button
                    onClick={onCreateNewChat}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Chat
                </Button>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Chat List */}
            <ScrollArea className="flex-1 h-0">
                <div className="p-2 space-y-4">
                    {Object.entries(groupedSessions).map(([period, periodSessions]) => {
                        if (periodSessions.length === 0) return null;

                        return (
                            <div key={period}>
                                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">
                                    {period === 'today' && 'Today'}
                                    {period === 'yesterday' && 'Yesterday'}
                                    {period === 'thisWeek' && 'This Week'}
                                    {period === 'older' && 'Older'}
                                </h3>

                                <div className="space-y-1">
                                    {periodSessions.map((session) => (
                                        <SessionCard
                                            key={session.id}
                                            session={session}
                                            isActive={session.id === activeSessionId}
                                            isEditing={editingSessionId === session.id}
                                            editTitle={editTitle}
                                            onSelect={() => onSelectSession(session.id)}
                                            onStartEdit={() => handleStartEdit(session)}
                                            onSaveEdit={handleSaveEdit}
                                            onCancelEdit={handleCancelEdit}
                                            onDelete={() => onDeleteSession(session.id)}
                                            onEditTitleChange={setEditTitle}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {filteredSessions.length === 0 && (
                        <div className="text-center py-12 px-4">
                            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-sm">
                                {searchQuery ? 'No conversations found' : 'No conversations yet'}
                            </p>
                            {!searchQuery && (
                                <p className="text-gray-400 text-xs mt-1">
                                    Start a new chat to begin
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}

interface SessionCardProps {
    session: ChatSession;
    isActive: boolean;
    isEditing: boolean;
    editTitle: string;
    onSelect: () => void;
    onStartEdit: () => void;
    onSaveEdit: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    onEditTitleChange: (title: string) => void;
}

function SessionCard({
    session,
    isActive,
    isEditing,
    editTitle,
    onSelect,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    onDelete,
    onEditTitleChange
}: SessionCardProps) {
    return (
        <Card className={cn(
            'cursor-pointer transition-all hover:shadow-sm border',
            isActive
                ? 'bg-blue-50 border-blue-200 shadow-sm'
                : 'bg-white hover:bg-gray-50 border-gray-100'
        )}>
            <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0" onClick={onSelect}>
                        {isEditing ? (
                            <div className="flex gap-1">
                                <Input
                                    value={editTitle}
                                    onChange={(e) => onEditTitleChange(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') onSaveEdit();
                                        if (e.key === 'Escape') onCancelEdit();
                                    }}
                                    onBlur={onSaveEdit}
                                    className="text-sm h-6 px-1"
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium text-sm text-gray-900 truncate">
                                        {session.title}
                                    </h4>
                                    {session.category && (
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                'text-xs px-1.5 py-0.5',
                                                categoryColors[session.category]
                                            )}
                                        >
                                            {categoryLabels[session.category]}
                                        </Badge>
                                    )}
                                </div>

                                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                    {session.lastMessage}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{session.messageCount} messages</span>
                                    <span>{formatTimeAgo(session.timestamp)}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {!isEditing && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                                    <MoreHorizontal className="h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={onStartEdit}>
                                    <Edit2 className="h-3 w-3 mr-2" />
                                    Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={onDelete}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-3 w-3 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

function isYesterday(date: Date): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
}

function isThisWeek(date: Date): boolean {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    return date >= startOfWeek;
}

function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString();
}