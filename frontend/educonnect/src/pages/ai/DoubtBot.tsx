import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { INITIAL_MESSAGES, AI_RESPONSES, type AIMessage } from "@/lib/mock-data/ai-content";
import { useStore } from "@/lib/store";

let responseIndex = 0;

export default function DoubtBot() {
  const { isPro, setIsPro } = useStore();
  const [activeSubject, setActiveSubject] = useState('Biology');
  const [messages, setMessages] = useState<AIMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = AI_RESPONSES[responseIndex % AI_RESPONSES.length];
      responseIndex++;
      const aiMsg: AIMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'ai',
        content: response.content,
        followUps: response.followUps,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }, 1400 + Math.random() * 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      {/* Locked / Upgrade overlay */}
      {!isPro && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="rounded-3xl border-2 border-primary/20 shadow-2xl bg-card p-8 text-center max-w-sm mx-auto">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">AI doubt bot locked</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Unlock unlimited instant answers, custom syllabus scope explanations, and full mock exams with Premium.
            </p>
            <Button 
              className="h-12 rounded-xl px-8 font-semibold bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 border-none text-white transition-all duration-200"
              onClick={() => setIsPro(true)}
            >
              Upgrade to Premium
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-5 border-b animate-[slideInDown_0.4s_ease-out]">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI doubt bot</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Online · Trained on MDCAT, ECAT, O-Level, A-Level syllabi
          </p>
        </div>
      </div>

      {/* Syllabus scope chips */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 shrink-0">
        {['Biology', 'Chemistry', 'Physics'].map(sub => {
          const isActive = activeSubject === sub;
          return (
            <span
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`rounded-full px-4 py-2 text-xs font-semibold border cursor-pointer transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-card border-border text-muted-foreground hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-400'
              }`}
            >
              {sub}
            </span>
          );
        })}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-1">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'ai' && (
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            )}

            <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                ${msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 rounded-2xl rounded-tl-sm text-foreground'
                }`}>
                {msg.content}
              </div>

              <div className="flex flex-col gap-1.5 px-1 items-start">
                <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                {msg.role === 'ai' && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <span className="bg-muted border rounded-full px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 cursor-pointer transition-all duration-200">
                      {activeSubject} Syllabus Ref p. {Math.floor(Math.random() * 80) + 12}
                    </span>
                  </div>
                )}
              </div>

              {msg.role === 'ai' && msg.followUps && msg.followUps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {msg.followUps.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs px-4 py-2 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-950/60 cursor-pointer transition-colors text-left"
                      data-testid="followup-chip"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-2xl w-max animate-pulse">
            <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
            <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-card/80 backdrop-blur-sm p-4 mt-4 rounded-2xl relative">
        <div className="relative">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask anything about ${activeSubject}…`}
            className="rounded-2xl border-2 focus:border-primary resize-none bg-background text-sm leading-relaxed placeholder:text-muted-foreground/60 min-h-[52px] max-h-32 py-3 px-4 pr-14"
            data-testid="input-message"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="absolute right-2 bottom-2 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 text-white shrink-0 transition-all duration-200"
            data-testid="btn-send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          AI responses are generated for learning purposes. Always verify with your tutor.
        </p>
      </div>
    </div>
  );
}
