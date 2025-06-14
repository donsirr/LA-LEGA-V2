import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

export default function ArticleGrid() {
  const articles = [
    {
      id: 1,
      title: "Poland dominates in straight sets victory",
      category: "VNL 2025",
      image: "/placeholder.svg?height=200&width=300",
      time: "2 hours ago",
    },
  ]

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Latest News</h2>
          <Link href="/news" className="flex items-center text-red-500 hover:text-red-400 transition-colors">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer group"
            >
              <div className="relative aspect-video">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4">
                <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs mb-2">
                  {article.category}
                </Badge>
                <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-xs">{article.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
