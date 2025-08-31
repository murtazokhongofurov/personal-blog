"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import ThemeSwitcher from "@/components/theme-switcher"

const navItems = [
  { name: "Blog", href: "/blog" },
  { name: "Channel", href: "/channel" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors duration-300
  dark:bg-black/90 dark:border-gray-800
  bg-white/90 border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold transition-colors duration-200
    dark:bg-gradient-to-r dark:from-white dark:to-gray-400 dark:bg-clip-text dark:text-transparent
    text-black"
          >
            Gofurov's Blog
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 dark:text-white bg-black text-white"
                      : "dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 text-gray-700 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Add ThemeSwitcher to desktop navigation */}
          <div className="hidden md:flex items-center ml-4">
            <ThemeSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition-colors duration-200
                dark:text-gray-300 dark:hover:text-white
                text-gray-700 hover:text-black"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div
            className="px-2 pt-2 pb-3 space-y-1 sm:px-3 transition-colors duration-300
  dark:bg-black/95 bg-white/95 backdrop-blur-sm"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 dark:text-white bg-black text-white"
                    : "dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 text-gray-700 hover:text-black hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
