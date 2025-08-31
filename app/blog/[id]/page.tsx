import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react"

// This would typically come from a database or CMS
const blogPosts = [
  {
    id: 1,
    title: "#1 Golang kirish",
    excerpt:
      "Go o’zi qanday til? Go statik, tez kompilyatsiya bo’ladigan, garbage collection ga ega, open source, cross platform, sintaksis jihatdan C tiliga o’xshab ketadigan dasturlash tili hisoblanadi.",
    content: `
      
    `,
    author: "Gofurov",
    date: "2023-07-23",
    readTime: "3 min read",
    category: "Golang",
    tags: ["Golang", "Google", "Go"],
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  {
    id: 2,
    title: "#2 Golang birinchi dastur",
    excerpt:
      "Ananaga ko’ra dasturlash tillarini o’rganishdagi birinchi dastur “Salom dunyo” ya’ni “Hello World” deb nomlanadi. Bu oddiygina satrni consolga chop etadi.",
    content: `
    `,
    author: "Gofurov",
    date: "2023-07-30",
    readTime: "2 min read",
    category: "Golang",
    tags: ["Golang", "FirstProgram", "Hello"],
    image: "/placeholder.svg?height=400&width=800",
    featured: false,
  },
  {
    id: 3,
    title: "Microservice arxitekturasi || Microservice architecture",
    excerpt:
      "Microservice arxitekturasi eng yaxshi va eng foydali arxitekturalardan biri software dasturlar orasida.",
    content: `
    `,
    author: "Gofurov",
    date: "2023-08-31",
    readTime: "5 min read",
    category: "Golang",
    tags: ["Golang", "Microservices", "Monolith"],
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  
]

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === Number.parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-8 transition-colors duration-200
  dark:text-gray-400 dark:hover:text-white
  text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4 text-sm">
              <span
                className="px-3 py-1 rounded-md text-xs transition-colors duration-300
  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
  bg-gray-100 text-gray-700 border border-gray-300"
              >
                {post.category}
              </span>
              <div
                className="flex items-center gap-1 transition-colors duration-300
  dark:text-gray-400 text-gray-500"
              >
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div
                className="flex items-center gap-1 transition-colors duration-300
  dark:text-gray-400 text-gray-500"
              >
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300
  dark:text-white text-black"
            >
              {post.title}
            </h1>

            <p
              className="text-lg mb-6 transition-colors duration-300
  dark:text-gray-400 text-gray-600"
            >
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 text-sm rounded-md transition-colors duration-300
  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
  bg-gray-100 text-gray-600 border border-gray-300"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-80 object-cover rounded-xl mb-8"
            />
          </header>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none transition-colors duration-300
  dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white
  prose-headings:text-black prose-p:text-gray-700 prose-strong:text-black"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author Info */}
        <div
          className="mt-12 p-6 rounded-xl border transition-colors duration-300
  dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700
  bg-gray-50 border-gray-200"
        >
          <h3
            className="text-lg font-semibold mb-2 transition-colors duration-300
  dark:text-white text-black"
          >
            About the Author
          </h3>
          <p
            className="transition-colors duration-300
  dark:text-gray-400 text-gray-600"
          >
            {post.author} is a Backend developer passionate about modern web technologies and sharing knowledge with
            the developer community.
          </p>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  // bu yerda barcha post id'larini ro'yxat qilib berasiz
  // misol uchun:
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

