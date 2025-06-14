import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { newsArticles } from "@/data/news"
import { Calendar, ChevronRight } from "lucide-react"

export default function FeaturedNews() {
  // Get the most recent featured article
  const featuredArticle = newsArticles.find((article) => article.featured)

  if (!featuredArticle) return null

  return (
    <div className="mb-12">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Featured Image */}
          <div className="relative aspect-video md:aspect-auto">
            <Image
              src={featuredArticle.image || "/placeholder.svg?height=600&width=800"}
              alt={featuredArticle.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-red-600 text-white">{featuredArticle.category}</Badge>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(featuredArticle.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{featuredArticle.title}</h2>
              <p className="text-gray-300 mb-6 line-clamp-3">{featuredArticle.excerpt}</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold mr-3">
                  {featuredArticle.author.charAt(0)}
                </div>
                <span className="text-gray-300">{featuredArticle.author}</span>
              </div>
              <Link href={`/news/${featuredArticle.slug}`}>
                <Button className="bg-red-600 hover:bg-red-700">
                  Read More
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
