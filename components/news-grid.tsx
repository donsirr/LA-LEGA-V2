"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { newsArticles } from "@/data/news"
import { Calendar, Filter } from "lucide-react"

export default function NewsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Get all non-featured articles
  const regularArticles = newsArticles.filter((article) => !article.featured)

  // Get unique categories for filtering
  const categories = Array.from(new Set(regularArticles.map((article) => article.category)))

  // Filter articles based on selected category
  const filteredArticles =
    selectedCategory === "all"
      ? regularArticles
      : regularArticles.filter((article) => article.category === selectedCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-gray-800 rounded-lg overflow-x-auto">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-white font-medium whitespace-nowrap">Categories:</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Link key={article.id} href={`/news/${article.slug}`}>
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-300 h-full flex flex-col">
              {/* Article Image */}
              <div className="relative aspect-video">
                <Image
                  src={article.image || "/placeholder.svg?height=300&width=500"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-600 text-white">{article.category}</Badge>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>

                <div className="flex items-center mt-auto">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold mr-2">
                    {article.author.charAt(0)}
                  </div>
                  <span className="text-gray-300 text-sm">{article.author}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No articles found in this category.</p>
          <Button
            variant="outline"
            className="mt-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            onClick={() => setSelectedCategory("all")}
          >
            View All Articles
          </Button>
        </div>
      )}
    </div>
  )
}
