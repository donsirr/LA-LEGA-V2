import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ArticleGrid from "@/components/article-grid"
import DatabaseStoryBoxes from "@/components/database-story-boxes"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <HeroSection />
      <DatabaseStoryBoxes />
      {/* <ArticleGrid /> */}
    </div>
  )
}
