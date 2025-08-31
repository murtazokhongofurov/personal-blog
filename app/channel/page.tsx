import { Play, Users, Calendar } from "lucide-react"
import Image from "next/image"

const videos = [
  {
    id: 1,
    title: "Building a Full-Stack App with Next.js 14",
    description:
      "Learn how to build a complete web application using the latest Next.js features including App Router and Server Components.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "45:32",
    views: "12.5K",
    publishedAt: "2 weeks ago",
  },
  {
    id: 2,
    title: "Mastering TypeScript for React Developers",
    description: "Deep dive into TypeScript patterns and best practices specifically for React development.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "38:15",
    views: "8.9K",
    publishedAt: "1 month ago",
  },
  {
    id: 3,
    title: "Database Design Fundamentals",
    description: "Understanding database design principles and how to structure your data for optimal performance.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "52:18",
    views: "15.2K",
    publishedAt: "1 month ago",
  },
]

export default function Channel() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span
              className="transition-colors duration-300
  dark:bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-gray-400 dark:bg-clip-text dark:text-transparent
  text-black"
            >
              My Channel
            </span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto mb-8 transition-colors duration-300
  dark:text-gray-400 text-gray-600"
          >
            Educational content about web development, programming tutorials, and tech insights.
          </p>

          {/* Channel Stats */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
            <div className="text-center">
              <div
                className="text-2xl font-bold transition-colors duration-300
  dark:text-white text-black"
              >
                50K+
              </div>
              <div
                className="text-sm transition-colors duration-300
  dark:text-gray-400 text-gray-600"
              >
                Subscribers
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold transition-colors duration-300
  dark:text-white text-black"
              >
                120+
              </div>
              <div
                className="text-sm transition-colors duration-300
  dark:text-gray-400 text-gray-600"
              >
                Videos
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold transition-colors duration-300
  dark:text-white text-black"
              >
                2M+
              </div>
              <div
                className="text-sm transition-colors duration-300
  dark:text-gray-400 text-gray-600"
              >
                Total Views
              </div>
            </div>
          </div>
        </div>

        {/* Latest Videos */}
        <div className="mb-12">
          <h2
            className="text-2xl font-semibold mb-8 transition-colors duration-300
  dark:text-white text-black"
          >
            Latest Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="rounded-xl overflow-hidden border transition-all duration-300 group cursor-pointer
  dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:hover:border-gray-600
  bg-white border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
              >
                <div className="relative">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    width={350}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" fill="white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <h3
                    className="text-lg font-semibold mb-2 line-clamp-2 transition-colors duration-300
  dark:text-white text-black"
                  >
                    {video.title}
                  </h3>
                  <p
                    className="text-sm mb-3 line-clamp-2 transition-colors duration-300
  dark:text-gray-400 text-gray-600"
                  >
                    {video.description}
                  </p>

                  <div
                    className="flex items-center justify-between text-xs transition-colors duration-300
  dark:text-gray-500 text-gray-500"
                  >
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{video.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{video.publishedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe Section */}
        <div
          className="text-center rounded-2xl p-8 border transition-colors duration-300
  dark:bg-gradient-to-r dark:from-purple-900/20 dark:to-pink-900/20 dark:border-gray-700
  bg-gray-50 border-gray-200"
        >
          <h3
            className="text-2xl font-semibold mb-4 transition-colors duration-300
  dark:text-white text-black"
          >
            Subscribe for More Content
          </h3>
          <p
            className="mb-6 max-w-md mx-auto transition-colors duration-300
  dark:text-gray-400 text-gray-600"
          >
            Get notified when I upload new tutorials and tech content. Join our growing community of developers!
          </p>
          <button
            className="px-8 py-3 font-medium rounded-lg transition-all duration-200 transform hover:scale-105
  dark:bg-gradient-to-r dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800
  bg-red-600 hover:bg-red-700 text-white"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  )
}
