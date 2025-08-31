import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 transition-colors duration-300
  dark:bg-black bg-white"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="relative mb-8">
          <div
            className="w-48 h-48 mx-auto rounded-full p-1 transition-colors duration-300
  dark:bg-gradient-to-br dark:from-gray-200 dark:via-white dark:to-gray-300
  bg-gradient-to-br from-gray-800 via-black to-gray-700"
          >
            <div
              className="w-full h-full rounded-full overflow-hidden
    dark:bg-gray-100 bg-gray-900"
            >
              <Image
                src="/placeholder.svg?height=192&width=192"
                alt="Profile"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Gradient ring effect */}
          <div
            className="absolute inset-0 w-48 h-48 mx-auto rounded-full opacity-20 blur-xl
  dark:bg-gradient-to-br dark:from-purple-500 dark:via-pink-500 dark:to-blue-500
  bg-gradient-to-br from-gray-600 via-black to-gray-800"
          ></div>
        </div>

        {/* Name and Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span
            className="transition-colors duration-300
    dark:bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-gray-400 dark:bg-clip-text dark:text-transparent
    text-black"
          >
            Gofurov Murtazokhon
          </span>
        </h1>

        <h2
          className="text-xl md:text-2xl mb-8 transition-colors duration-300
  dark:text-gray-300 text-gray-700"
        >
          Software Engineer at Noor
        </h2>

        {/* Description */}
        <div className="max-w-2xl mx-auto">
          <p
            className="text-lg leading-relaxed mb-8 transition-colors duration-300
  dark:text-gray-400 text-gray-600"
          >
            Code by day, curiosities by night — thoughts on software and life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="px-8 py-3 font-medium rounded-lg transition-all duration-200 transform hover:scale-105
  dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 dark:text-white dark:hover:from-purple-700 dark:hover:to-pink-700
  bg-black text-white hover:bg-gray-800"
            >
              Read Blog
            </Link>
            
            <Link
              href="/about"
              className="px-8 py-3 font-medium rounded-lg transition-all duration-200 border
  dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400 dark:hover:text-white
  border-gray-300 text-gray-700 hover:border-black hover:text-black"
            >
              About Me
            </Link>
          </div>
        </div>

        {/* Floating elements */}
        <div
          className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl
  dark:bg-gradient-to-br dark:from-purple-500/20 dark:to-pink-500/20
  bg-gradient-to-br from-gray-400/20 to-gray-600/20"
        ></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full blur-xl
  dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-purple-500/20
  bg-gradient-to-br from-gray-500/20 to-gray-700/20"
        ></div>
      </div>
    </div>
  )
}
