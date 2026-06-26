import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, MonitorUp, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "wouter";
import { mockUser } from "@/lib/mock-data/mock-user";

export default function ActiveSession() {
  const [, setLocation] = useLocation();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="h-[calc(100vh-8rem)] -mx-4 md:-mx-8 -mt-4 flex flex-col md:flex-row overflow-hidden bg-black text-white">
      {/* Video Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Remote Video */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden flex items-center justify-center">
            <Avatar className="h-32 w-32 border-4 border-zinc-800">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed%20Khan" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-2xl text-sm font-medium">
              Ahmed Khan (Tutor)
            </div>
          </div>
          
          {/* Local Video */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden flex items-center justify-center">
             {isVideoOff ? (
               <Avatar className="h-32 w-32 border-4 border-zinc-800">
                 <AvatarImage src={mockUser.avatar} />
                 <AvatarFallback>Me</AvatarFallback>
               </Avatar>
             ) : (
               <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-500">
                 [ Camera Feed ]
               </div>
             )}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-2xl text-sm font-medium">
              You
            </div>
            {isMuted && (
              <div className="absolute top-4 right-4 bg-red-500/80 p-1.5 rounded-xl backdrop-blur-sm">
                <MicOff className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="h-20 bg-zinc-950 flex items-center justify-between px-6 border-t border-zinc-900">
          <div className="flex items-center gap-4 text-zinc-400 text-sm hidden sm:flex">
            <span className="bg-red-500/20 border border-red-500/40 text-red-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Recording
            </span>
            <span>45:21</span>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className={`h-[52px] w-[52px] rounded-full border-none ${isMuted ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-zinc-800 text-white hover:bg-zinc-700'} transition-all duration-200`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={`h-[52px] w-[52px] rounded-full border-none ${isVideoOff ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-zinc-800 text-white hover:bg-zinc-700'} transition-all duration-200`}
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-[52px] w-[52px] rounded-full border-none bg-zinc-800 text-white hover:bg-zinc-700 hidden sm:flex transition-all duration-200"
            >
              <MonitorUp className="h-5 w-5" />
            </Button>
            <Button 
              variant="destructive" 
              className="h-12 px-8 rounded-full font-semibold bg-red-600 hover:bg-red-700 border-none text-white flex items-center justify-center transition-all duration-200"
              onClick={() => setLocation("/sessions")}
            >
              <PhoneOff className="h-5 w-5 mr-2" /> End
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className={`h-[52px] w-[52px] rounded-full border-none ${chatOpen ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-zinc-800 text-white hover:bg-zinc-700'} transition-all duration-200`}
              onClick={() => setChatOpen(!chatOpen)}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      {chatOpen && (
        <div className="w-full md:w-80 bg-zinc-950 border-l border-zinc-900 flex flex-col h-full absolute md:relative z-10 right-0">
          <div className="p-4 border-b border-zinc-900 font-medium flex items-center justify-between">
            Chat
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white md:hidden transition-all duration-200" onClick={() => setChatOpen(false)}>
              <span className="sr-only">Close</span>✕
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="text-xs text-center text-zinc-600 font-medium my-2">Session Started</div>
              
              <div className="flex flex-col gap-1 items-start">
                <span className="text-xs text-zinc-500 ml-1">Ahmed Khan</span>
                <div className="bg-zinc-800 rounded-2xl rounded-tl-sm px-3 py-2.5 text-sm max-w-[85%]">
                  Hi Hamza, can you hear me?
                </div>
              </div>
              
              <div className="flex flex-col gap-1 items-end">
                <span className="text-xs text-zinc-500 mr-1">You</span>
                <div className="bg-indigo-600 rounded-2xl rounded-tr-sm px-3 py-2.5 text-sm max-w-[85%]">
                  Yes sir, loud and clear.
                </div>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <span className="text-xs text-zinc-500 ml-1">Ahmed Khan</span>
                <div className="bg-zinc-800 rounded-2xl rounded-tl-sm px-3 py-2.5 text-sm max-w-[85%]">
                  Great! Let's start with the Cell Biology past paper questions we discussed.
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-zinc-900">
            <div className="relative">
              <Input 
                className="bg-zinc-900 border border-zinc-800 text-white pr-10 focus-visible:ring-zinc-700 placeholder:text-zinc-500 rounded-xl" 
                placeholder="Type a message..." 
              />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-zinc-400 hover:text-white transition-all duration-200">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
