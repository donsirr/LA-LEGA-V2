import type React from "react"
import type { Metadata } from "next"
import { Roboto_Condensed } from "next/font/google"
import "./globals.css"
import BackgroundMusic from "@/components/background-music"

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "LA LEGA",
  description: "Roblox Volleyball coverage and statistics",
  icons: {
    icon: [
      {
        url: "https://media.discordapp.net/attachments/1378750702159134750/1382949414879887482/NEWLOGO.png?ex=684dac42&is=684c5ac2&hm=5870a319e4444815406f2b4f70d0779797b421d82018fdd191fe05652bbe9d34&=&format=webp&quality=lossless",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://media.discordapp.net/attachments/1378750702159134750/1382949414879887482/NEWLOGO.png?ex=684dac42&is=684c5ac2&hm=5870a319e4444815406f2b4f70d0779797b421d82018fdd191fe05652bbe9d34&=&format=webp&quality=lossless",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: {
      url: "https://media.discordapp.net/attachments/1378750702159134750/1382949414879887482/NEWLOGO.png?ex=684dac42&is=684c5ac2&hm=5870a319e4444815406f2b4f70d0779797b421d82018fdd191fe05652bbe9d34&=&format=webp&quality=lossless",
      sizes: "180x180",
      type: "image/png",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        {children}
        <BackgroundMusic />
      </body>
    </html>
  )
}
