import NewsGrid from "@/components/news-grid"
import FeaturedNews from "@/components/featured-news"
import Header from "@/components/header"
import CompetitionBadges from "@/components/competition-badges"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <CompetitionBadges />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">News</h1>
          <p className="text-gray-400">Latest volleyball news, updates, and stories</p>
        </div>
        <FeaturedNews />
        <NewsGrid />
      </div>
    </div>
  )
}
