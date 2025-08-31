import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react"

// This would typically come from a database or CMS
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14 and App Router",
    excerpt:
      "Learn how to build modern web applications with the latest Next.js features including App Router, Server Components, and more.",
    content: `
      <h2>Introduction</h2>
      <p>Next.js 14 introduces several exciting features that make building modern web applications easier and more efficient. In this comprehensive guide, we'll explore the App Router, Server Components, and other key features that make Next.js 14 a game-changer for React developers.</p>
      
      <h2>What's New in Next.js 14</h2>
      <p>The latest version of Next.js brings significant improvements in performance, developer experience, and new features that streamline the development process.</p>
      
      <h3>App Router</h3>
      <p>The App Router is a new paradigm for building Next.js applications. It provides a more intuitive file-based routing system and better support for layouts, loading states, and error handling.</p>
      
      <h3>Server Components</h3>
      <p>Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client and improving performance.</p>
      
      <h2>Getting Started</h2>
      <p>To get started with Next.js 14, you can create a new project using the following command:</p>
      <pre><code>npx create-next-app@latest my-app</code></pre>
      
      <h2>Conclusion</h2>
      <p>Next.js 14 represents a significant step forward in React-based web development. With its improved performance, better developer experience, and powerful new features, it's an excellent choice for building modern web applications.</p>
    `,
    author: "Gofurov",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript"],
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  {
    id: 2,
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    excerpt:
      "Dive deep into TypeScript's advanced features and learn how to write more maintainable and type-safe code.",
    content: `
      <p>TypeScript opens a world of possibilities for large-scale JavaScript projects …</p>
      <h2>Utility Types</h2>
      <p>Learn how to use <code>Partial&lt;T&gt;</code>, <code>Pick&lt;T&gt;</code>, and <code>Record&lt;K,T&gt;</code> effectively.</p>
      <h2>Generics Everywhere</h2>
      <p>Leverage generics to create reusable, strongly-typed APIs.</p>
    `,
    author: "Gofurov",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Programming",
    tags: ["TypeScript", "JavaScript", "Programming"],
    image: "/placeholder.svg?height=400&width=800",
    featured: false,
  },
  {
    id: 3,
    title: "Building Scalable React Applications: Architecture and Patterns",
    excerpt:
      "Explore architectural patterns and best practices for building large-scale React applications that are maintainable and performant.",
    content: `
      <h2>Component-Driven Architecture</h2>
      <p>Design your React app around reusable components and composition.</p>
      <h2>State Management</h2>
      <p>Compare Context API, Redux, Zustand, and Recoil for different use-cases.</p>
    `,
    author: "Gofurov",
    date: "2024-01-05",
    readTime: "15 min read",
    category: "React",
    tags: ["React", "Architecture", "Scalability"],
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  {
    id: 4,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Discover the emerging trends and technologies that will shape web development in 2024 and beyond.",
    content: `
      <h2>Edge Computing</h2>
      <p>Why running code closer to the user matters.</p>
      <h2>AI-Powered Tooling</h2>
      <p>How AI assistants will change a developer’s workflow.</p>
    `,
    author: "Gofurov",
    date: "2024-01-01",
    readTime: "10 min read",
    category: "Industry",
    tags: ["Trends", "Web Development", "Future"],
    image: "/placeholder.svg?height=400&width=800",
    featured: false,
  },
  {
    id: 5,
    title: "CSS Grid vs Flexbox: When to Use Which Layout Method",
    excerpt:
      "A comprehensive guide to understanding the differences between CSS Grid and Flexbox and when to use each layout method.",
    content: `
      <h2>One-Dimensional vs Two-Dimensional</h2>
      <p>Flexbox is ideal for one-dimensional layouts, Grid for two.</p>
    `,
    author: "Gofurov",
    date: "2023-12-28",
    readTime: "7 min read",
    category: "CSS",
    tags: ["CSS", "Layout", "Grid", "Flexbox"],
    image: "/placeholder.svg?height=400&width=800",
    featured: false,
  },
  {
    id: 6,
    title: "Database Design Principles for Modern Applications",
    excerpt:
      "Learn the fundamental principles of database design and how to structure your data for optimal performance and scalability.",
    content: `
      <h2>Normalization &amp; Denormalization</h2>
      <p>Balance data integrity with query performance.</p>
    `,
    author: "Gofurov",
    date: "2023-12-20",
    readTime: "14 min read",
    category: "Database",
    tags: ["Database", "Design", "SQL", "Performance"],
    image: "/placeholder.svg?height=400&width=800",
    featured: false,
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
            {post.author} is a full-stack developer passionate about modern web technologies and sharing knowledge with
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

