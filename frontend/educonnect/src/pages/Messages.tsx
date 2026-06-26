import { useState } from "react";
import { Search, Send, MoreVertical, Phone, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const mockThreads = [
  { id: 1, name: 'Ahmed Khan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed%20Khan', lastMessage: 'Great! Let\'s start with the Cell Biology past...', time: '10:42 AM', unread: 2, online: true },
  { id: 2, name: 'Sara Ali', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara%20Ali', lastMessage: 'Can we reschedule our session to tomorrow?', time: 'Yesterday', unread: 0, online: false },
  { id: 3, name: 'Dr. Tariq Mahmood', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tariq%20Mahmood', lastMessage: 'I have reviewed your personal statement.', time: 'Monday', unread: 0, online: true },
  { id: 4, name: 'STUTAP Support', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support', lastMessage: 'Your refund has been processed.', time: 'Oct 12', unread: 0, online: false },
];

export default function Messages() {
  const [activeThread, setActiveThread] = useState(mockThreads[0]);

  return (
    <div className="h-[calc(100vh-8rem)] -mt-4 border rounded-2xl overflow-hidden flex bg-card shadow-md">
      {/* Sidebar - Conversation List */}
      <div className="w-full md:w-80 border-r flex flex-col bg-muted/20">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="rounded-xl bg-background border pl-9" />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {mockThreads.map((thread) => (
              <div 
                key={thread.id}
                className={`p-4 flex items-start gap-3 cursor-pointer transition-colors border-b border-border/50 ${activeThread.id === thread.id ? 'bg-primary/8 border-l-[3px] border-l-primary' : 'hover:bg-muted/50 border-l-[3px] border-l-transparent'}`}
                onClick={() => setActiveThread(thread)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={thread.avatar} />
                    <AvatarFallback>{thread.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {thread.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={`text-sm font-semibold truncate pr-2 ${thread.unread ? 'text-foreground' : 'text-foreground/80'}`}>{thread.name}</span>
                    <span className={`text-[10px] text-muted-foreground shrink-0 ${thread.unread ? 'text-primary font-medium' : ''}`}>{thread.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-xs text-muted-foreground truncate ${thread.unread ? 'text-foreground font-medium' : ''}`}>
                      {thread.lastMessage}
                    </p>
                    {thread.unread > 0 && (
                      <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                        {thread.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 hidden md:flex flex-col bg-background relative">
        {/* Chat Header */}
        <div className="h-16 border-b flex items-center justify-between px-5 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={activeThread.avatar} />
              <AvatarFallback>{activeThread.name.substring(0,2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{activeThread.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center">
                {activeThread.online ? (
                  <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-green-500" /> Online</span>
                ) : 'Last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-all duration-200"><Phone className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-all duration-200"><Video className="h-5 w-5" /></Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="icon" className="text-muted-foreground"><MoreVertical className="h-5 w-5" /></Button>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            <div className="text-center">
              <span className="bg-muted rounded-xl px-3 py-1 text-xs text-muted-foreground">Today</span>
            </div>

            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0 mt-1">
                <AvatarImage src={activeThread.avatar} />
              </Avatar>
              <div className="flex flex-col items-start max-w-[75%]">
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                  Hello! Just confirming our session for today at 6 PM.
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 ml-1">10:30 AM</span>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <div className="flex flex-col items-end max-w-[75%]">
                <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
                  Hi sir! Yes, I am ready. Do I need to prepare anything specific?
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 mr-1">10:35 AM</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0 mt-1">
                <AvatarImage src={activeThread.avatar} />
              </Avatar>
              <div className="flex flex-col items-start max-w-[75%]">
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                  Great! Let's start with the Cell Biology past paper questions we discussed last time. Please have year 2022 ready.
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 ml-1">10:42 AM</span>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-card/80">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <Input 
              placeholder="Type your message..." 
              className="flex-1 bg-background rounded-full h-12 px-5 border focus:border-primary"
            />
            <Button size="icon" className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shrink-0 text-white border-none flex items-center justify-center transition-all duration-200">
              <Send className="h-5 w-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
