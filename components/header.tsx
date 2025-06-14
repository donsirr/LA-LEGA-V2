import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gamepad2, Heart, Link2 } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 relative">
          {/* Left Navigation */}
          <nav className="flex items-center space-x-8 flex-1">
            <Link href="/schedule" className="text-white hover:text-red-500 transition-colors">
              Schedule
            </Link>
            <Link href="/player-rankings" className="text-white hover:text-red-500 transition-colors">
              Player Rankings
            </Link>
            <Link href="/rankings" className="text-white hover:text-red-500 transition-colors">
              Team Rankings
            </Link>
            {/* <Link href="/news" className="text-white hover:text-red-500 transition-colors">
              News
            </Link> */}
            <Link href="/teams" className="text-white hover:text-red-500 transition-colors">
              Teams
            </Link>
            <Link href="/players" className="text-white hover:text-red-500 transition-colors">
              Players
            </Link>
          </nav>

          {/* Center Logo - Absolutely positioned for perfect centering */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="text-white font-bold text-2xl">
              <div className="w-12 h-12 bg-black-600 rounded-lg flex items-center justify-center hover:bg-red-900 transition-colors">
                <span className="text-white font-bold text-xl">
                <img src="https://media.discordapp.net/attachments/1378750702159134750/1382949414879887482/NEWLOGO.png?ex=684d0382&is=684bb202&hm=be6abe9f4f8056a2f1986cff594115a116ad25a6250f58a901acda06e91c6e18&=&format=webp&quality=lossless"></img>
                </span>
              </div>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <Link2/>
              <Link href="https://discord.gg/zephAMxHeQ" target="_blank" className="w-12 h-4 mr-2">
                Join Now
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <Gamepad2 className="w-4 h-4 mr-2" />
              <Link href="https://www.roblox.com/games/6734275465/Beyond-Volleyball-League" target="_blank">
                Play Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}