'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/widget.css';

// Backend API URL - Production Cloud Run
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://scoop-ai-sdk-358331686110.europe-west1.run.app';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface Conversation {
    id: string;
    title: string;
    messages: Message[];
}

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Sidebar Component
function Sidebar({
    conversations,
    activeId,
    onNewChat,
    onSelect,
}: {
    conversations: { id: string; title: string }[];
    activeId: string | null;
    onNewChat: () => void;
    onSelect: (id: string) => void;
}) {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <button className="new-chat-btn" onClick={onNewChat}>
                    <span>✨</span> ახალი საუბარი
                </button>
            </div>
            <div className="chat-history">
                <div className="history-title">ბოლო საუბრები</div>
                {conversations.length === 0 ? (
                    <div className="history-item">საუბრები არ არის...</div>
                ) : (
                    conversations.map((conv) => (
                        <div
                            key={conv.id}
                            className={`history-item ${activeId === conv.id ? 'active' : ''}`}
                            onClick={() => onSelect(conv.id)}
                        >
                            {conv.title}
                        </div>
                    ))
                )}
            </div>
            <button className="about-btn">
                <span>ℹ️</span> ასისტენტის შესახებ
            </button>
        </div>
    );
}

// Welcome Section with Suggestion Cards
function WelcomeSection({ onCardClick }: { onCardClick: (text: string) => void }) {
    const suggestions = [
        { icon: '💪', text: 'პროტეინი მინდა კუნთის ზრდისთვის' },
        { icon: '⚡', text: 'კრეატინი მირჩიე ძალა და ენერგიისთვის' },
        { icon: '💊', text: 'ვიტამინები მინდა გამძლეობელობისთვის' },
    ];

    return (
        <div className="welcome-section">
            <div className="avatar">
                <div className="avatar-inner">🍨</div>
            </div>
            <h2 className="welcome-title">
                გამარჯობა. მე ქირონი ვარ<br />
                რით შემიძლია დაგეხმაროთ?
            </h2>
            <p className="welcome-subtitle">
                აირჩიე 4 თემიდან ერთ-ერთი ან მოწერეთ თქვენი საკუთარი შეკითხვა.
            </p>
            <div className="suggestion-cards">
                {suggestions.map((s, i) => (
                    <div key={i} className="suggestion-card" onClick={() => onCardClick(s.text)}>
                        <div className="suggestion-icon">{s.icon}</div>
                        <div className="suggestion-text">{s.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Quick Replies Component
function QuickReplies({
    replies,
    onSelect,
}: {
    replies: string[];
    onSelect: (text: string) => void;
}) {
    if (replies.length === 0) return null;

    return (
        <div className="quick-replies-container">
            <div className="quick-replies-label">💡 შემდეგი ნაბიჯები:</div>
            <div className="quick-replies">
                {replies.map((reply, i) => (
                    <button key={i} className="quick-reply-btn" onClick={() => onSelect(reply)}>
                        {reply}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Message Bubble Component with Markdown
function MessageBubble({ message }: { message: Message }) {
    // Remove QUICK_REPLIES section from content
    const cleanContent = (content: string) => {
        return content.replace(/\[QUICK_REPLIES\][\s\S]*?\[\/QUICK_REPLIES\]/, '').trim();
    };

    const text = cleanContent(message.content);

    return (
        <div className={`message ${message.role}`}>
            <div className="message-avatar" />
            <div className="message-content markdown-content">
                {text ? (
                    <ReactMarkdown
                        components={{
                            a: ({ href, children }) => (
                                <a href={href} target="_blank" rel="noopener noreferrer">
                                    {children}
                                </a>
                            ),
                        }}
                    >
                        {text}
                    </ReactMarkdown>
                ) : (
                    <span className="typing-indicator">იწერება...</span>
                )}
            </div>
        </div>
    );
}

// Loading phases based on input
const getLoadingPhases = (input: string): string[] => {
    const lower = input.toLowerCase();
    if (lower.includes('პროტეინ')) {
        return ['🔍 ვეძებ პროტეინებს', '📊 ვადარებ ფასებს', '🏷️ ვამოწმებ ხელმისაწვდომობას'];
    }
    if (lower.includes('კრეატინ')) {
        return ['🔍 ვეძებ კრეატინებს', '📊 ვადარებ ფასებს', '⚡ ვამზადებ რეკომენდაციას'];
    }
    if (lower.includes('ვიტამინ')) {
        return ['🔍 ვეძებ ვიტამინებს', '💊 ვაანალიზებ შემადგენლობას', '✍️ ვამზადებ პასუხს'];
    }
    return ['🔮 ვფიქრობ', '🔍 ვეძებ', '📊 ვამზადებ პასუხს'];
};

// Main Chat Component
export default function Chat() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [quickReplies, setQuickReplies] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeConversation = conversations.find((c) => c.id === activeId);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeConversation?.messages]);

    // Create new conversation
    const createNewConversation = useCallback(() => {
        const newId = generateId();
        const newConv: Conversation = {
            id: newId,
            title: 'ახალი საუბარი',
            messages: [],
        };
        setConversations((prev) => [newConv, ...prev]);
        setActiveId(newId);
        setQuickReplies([]);
        return newId;
    }, []);

    // Send message using /chat endpoint (like Chainlit)
    const sendMessage = useCallback(
        async (text: string) => {
            if (!text.trim() || isLoading) return;

            let convId = activeId;
            if (!convId) {
                convId = createNewConversation();
            }

            setInput('');
            setIsLoading(true);
            setQuickReplies([]);

            // Add user message
            const userMessage: Message = {
                id: generateId(),
                role: 'user',
                content: text.trim(),
            };

            // Add assistant placeholder with loading
            const assistantId = generateId();
            const phases = getLoadingPhases(text);
            const assistantMessage: Message = {
                id: assistantId,
                role: 'assistant',
                content: phases[0] + '...',
            };

            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === convId
                        ? {
                            ...conv,
                            title: conv.messages.length === 0 ? text.slice(0, 25) + '...' : conv.title,
                            messages: [...conv.messages, userMessage, assistantMessage],
                        }
                        : conv
                )
            );

            const updateContent = (content: string) => {
                setConversations((prev) =>
                    prev.map((conv) =>
                        conv.id === convId
                            ? {
                                ...conv,
                                messages: conv.messages.map((msg) =>
                                    msg.id === assistantId ? { ...msg, content } : msg
                                ),
                            }
                            : conv
                    )
                );
            };

            // Animate loading phases
            let phaseIndex = 0;
            let dotCount = 1;
            const animationInterval = setInterval(() => {
                const basePhase = phases[phaseIndex % phases.length];
                const dots = '.'.repeat(dotCount);
                updateContent(`${basePhase}${dots}`);
                dotCount = dotCount >= 3 ? 1 : dotCount + 1;
                if (dotCount === 1) phaseIndex++;
            }, 800);

            try {
                console.log('[Scoop] Fetching from:', BACKEND_URL);
                const response = await fetch(`${BACKEND_URL}/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: `widget_${convId}`,
                        message: text,
                        conversation_id: convId,
                    }),
                });

                clearInterval(animationInterval);

                console.log('[Scoop] Response status:', response.status);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();

                // Extract response text (V7 compatible)
                const responseText = data.response_text_geo || data.response || data.text || '';

                // Update with final response
                updateContent(responseText);

                // Parse quick replies from API response
                if (data.quick_replies && Array.isArray(data.quick_replies)) {
                    const replies = data.quick_replies.map((qr: { title: string }) => qr.title);
                    setQuickReplies(replies);
                    console.log('[Scoop] Quick replies:', replies.length);
                }
            } catch (error) {
                clearInterval(animationInterval);
                console.error('[Scoop] Fetch error:', error);
                updateContent('⚠️ კავშირის შეცდომა. გთხოვთ სცადოთ თავიდან.');
            } finally {
                setIsLoading(false);
            }
        },
        [activeId, createNewConversation, isLoading]
    );

    // Handle input submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <div className="widget-container">
            <Sidebar
                conversations={conversations.map((c) => ({ id: c.id, title: c.title }))}
                activeId={activeId}
                onNewChat={createNewConversation}
                onSelect={setActiveId}
            />
            <div className="chat-area">
                <div className="chat-header">
                    <div className="chat-header-title">🍨 Scoop AI ასისტენტი</div>
                    <div className="chat-header-actions">
                        <button className="chat-header-btn">⚙️</button>
                    </div>
                </div>
                <div className="chat-content">
                    {!activeConversation || activeConversation.messages.length === 0 ? (
                        <WelcomeSection onCardClick={sendMessage} />
                    ) : (
                        <div className="messages-container">
                            {activeConversation.messages.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} />
                            ))}
                            <QuickReplies replies={quickReplies} onSelect={sendMessage} />
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
                <div className="input-area">
                    <form className="input-wrapper" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="message-input"
                            placeholder="დაწერე Scoop ასისტენტს..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" className="send-btn" disabled={isLoading || !input.trim()}>
                            →
                        </button>
                    </form>
                </div>
                <div className="chat-footer">Scoop AI • ქირონი • სპორტული კვების კონსულტანტი</div>
            </div>
        </div>
    );
}
