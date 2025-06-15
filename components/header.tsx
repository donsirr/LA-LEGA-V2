import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gamepad2, Link2 } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 flex-wrap justify-between py-2 md:py-0">
          <nav className="hidden md:flex items-center space-x-8 flex-1 order-1 w-full md:w-auto">
            <Link href="/schedule" className="text-white hover:text-red-500 transition-colors">
              Schedule
            </Link>
            <Link href="/player-rankings" className="text-white hover:text-red-500 transition-colors">
              Player Rankings
            </Link>
            <Link href="/rankings" className="text-white hover:text-red-500 transition-colors">
              Team Rankings
            </Link>
            <Link href="/teams" className="text-white hover:text-red-500 transition-colors">
              Teams
            </Link>
            <Link href="/players" className="text-white hover:text-red-500 transition-colors">
              Players
            </Link>
          </nav>
          <div className="flex justify-center items-center flex-shrink-0 order-2 md:order-2 mx-auto md:mx-0">
            <Link href="/" className="text-white font-bold text-2xl">
              <div className="w-12 h-12 bg-black-600 rounded-lg flex items-center justify-center hover:bg-red-900 transition-colors">
                <span className="text-white font-bold text-xl">
                  {/* Added alt attribute for accessibility and object-contain for image scaling */}
                  <img src="/NEWLOGO.png" alt="Team Logo" className="w-full h-full object-contain" />
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end order-3 w-full md:w-auto">
            <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <Link2 className="w-4 h-4 mr-2"/>
              <Link href="https://discord.gg/zephAMxHeQ" target="_blank">
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