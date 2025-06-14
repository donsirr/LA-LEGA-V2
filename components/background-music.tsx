"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, SkipForward, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

const MUSIC_FILES = [
  "/music/Art.mp3",
  "/music/Essence.mp3",
  "/music/Fountains.mp3",
  "/music/Free Mind.mp3",
]

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [playlist, setPlaylist] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  // Shuffle playlist on mount
  useEffect(() => {
    const shuffled = [...MUSIC_FILES].sort(() => Math.random() - 0.5)
    setPlaylist(shuffled)
  }, [])

  // Handle track end - play next track
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      const nextTrack = (currentTrack + 1) % playlist.length
      setCurrentTrack(nextTrack)
    }

    audio.addEventListener("ended", handleEnded)
    return () => audio.removeEventListener("ended", handleEnded)
  }, [currentTrack, playlist.length])

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || playlist.length === 0) return

    audio.src = playlist[currentTrack]
    if (isPlaying) {
      audio.play().catch(console.error)
    }
  }, [currentTrack, playlist, isPlaying])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(console.error)
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const skipTrack = () => {
    const nextTrack = (currentTrack + 1) % playlist.length
    setCurrentTrack(nextTrack)
  }

  const getCurrentTrackName = () => {
    if (playlist.length === 0) return "Loading..."
    const trackPath = playlist[currentTrack]
    return trackPath.split("/").pop()?.replace(".mp3", "") || "Unknown Track"
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-white text-xs font-medium min-w-0 flex-1">
            <div className="truncate">{getCurrentTrackName()}</div>
            <div className="text-gray-400 text-xs">
              {currentTrack + 1} of {playlist.length}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={togglePlay} className="h-8 w-8 p-0 text-white hover:bg-gray-700">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button size="sm" variant="ghost" onClick={skipTrack} className="h-8 w-8 p-0 text-white hover:bg-gray-700">
            <SkipForward className="h-4 w-4" />
          </Button>

          <Button size="sm" variant="ghost" onClick={toggleMute} className="h-8 w-8 p-0 text-white hover:bg-gray-700">
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <audio ref={audioRef} loop={false} volume={0.1} preload="metadata" />
    </div>
  )
}
