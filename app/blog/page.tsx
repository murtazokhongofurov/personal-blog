"use client"

import { useState, useMemo } from "react"
import { Search, Calendar, Tag } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "#1 Golang kirish",
    excerpt:
      "Go o’zi qanday til? Go statik, tez kompilyatsiya bo’ladigan, garbage collection ga ega, open source, cross platform, sintaksis jihatdan C tiliga o’xshab ketadigan dasturlash tili hisoblanadi.",
    author: "Gofurov",
    date: "2023-07-23",
    readTime: "3 min read",
    category: "Golang",
    tags: ["Golang", "Google", "Go"],
    featured: true,
  },
  {
    id: 2,
    title: "#2 Golang birinchi dastur",
    excerpt:
      "Ananaga ko’ra dasturlash tillarini o’rganishdagi birinchi dastur “Salom dunyo” ya’ni “Hello World” deb nomlanadi. Bu oddiygina satrni consolga chop etadi.",
    author: "Gofurov",
    date: "2023-07-24",
    readTime: "2 min read",
    category: "Golang",
    tags: ["Golang", "FirstProgram", "Hello"],
    featured: false,
  },
  {
    id: 3,
    title: "Microservice arxitekturasi || Microservice architecture",
    excerpt:
      "Microservice arxitekturasi eng yaxshi va eng foydali arxitekturalardan biri software dasturlar orasida.",
    author: "Gofurov",
    date: "2023-08-31",
    readTime: "5 min read",
    category: "Golang",
    tags: ["Golang", "Microservices", "Monolith"],
    featured: true,
  },
]

const categories = ["Golang", "Insights"]

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span
              className="transition-colors duration-300
  dark:bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-gray-400 dark:bg-clip-text dark:text-transparent
  text-black"
            >
              Blog
            </span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto transition-colors duration-300
  dark:text-gray-400 text-gray-600"
          >
            Thoughts, tutorials, and insights about web development, programming, and technology.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300
    dark:text-gray-400 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg transition-colors duration-300
    dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500
    bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 dark:text-white bg-black text-white"
                      : "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-600 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2
              className="text-2xl font-semibold mb-6 transition-colors duration-300
  dark:text-white text-black"
            >
              Featured Posts
            </h2>
            <div className="space-y-6">
              {featuredPosts.map((post) => (
                <article key={post.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300
    dark:bg-purple-600 dark:text-white
    bg-black text-white"
                    >
                      Featured
                    </span>
                    <div
                      className="flex items-center gap-4 text-sm transition-colors duration-300
    dark:text-gray-400 text-gray-500"
                    >
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.id}`} className="group">
                    <h3
                      className="text-2xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300
  dark:text-white text-black"
                    >
                      {post.title}
                    </h3>
                  </Link>

                  <p
                    className="text-lg mb-4 leading-relaxed transition-colors duration-300
  dark:text-gray-400 text-gray-600"
                  >
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1 text-sm rounded-full transition-colors duration-300
    dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
    bg-gray-100 text-gray-600 border border-gray-300"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2
            className="text-2xl font-semibold mb-6 transition-colors duration-300
  dark:text-white text-black"
          >
            All Posts
          </h2>
          <div className="space-y-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="px-3 py-1 text-xs rounded-full transition-colors duration-300
  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
  bg-gray-100 text-gray-700 border border-gray-300"
                  >
                    {post.category}
                  </span>
                  <div
                    className="flex items-center gap-4 text-sm transition-colors duration-300
  dark:text-gray-400 text-gray-500"
                  >
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.id}`} className="group">
                  <h3
                    className="text-xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300
  dark:text-white text-black"
                  >
                    {post.title}
                  </h3>
                </Link>

                <p
                  className="mb-4 leading-relaxed transition-colors duration-300
  dark:text-gray-400 text-gray-600"
                >
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 text-sm rounded-full transition-colors duration-300
  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
  bg-gray-100 text-gray-600 border border-gray-300"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3
              className="text-xl font-semibold mb-2 transition-colors duration-300
  dark:text-white text-black"
            >
              No posts found
            </h3>
            <p
              className="transition-colors duration-300
  dark:text-gray-400 text-gray-600"
            >
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
