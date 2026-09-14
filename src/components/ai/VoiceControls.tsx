"use client";

import React from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceControlsProps {
  isListening: boolean;
  onToggleListen: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function VoiceControls({ isListening, onToggleListen, isMuted, onToggleMute }: VoiceControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 rounded-full transition-colors", isListening && "bg-destructive text-destructive-foreground animate-pulse")}
        onClick={onToggleListen}
        title={isListening ? "Stop Listening" : "Start Voice Input"}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={onToggleMute}
        title={isMuted ? "Unmute AI" : "Mute AI"}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}
