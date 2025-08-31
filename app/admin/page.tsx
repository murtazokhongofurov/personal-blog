"use client"
import Link from "next/link"
import { Users, FileText, Eye, TrendingUp, Calendar, Plus, BarChart3, Clock, MessageSquare, LogOut } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

// Mock data - in a real app, this would come from your database
const mockStats = {
  totalVisitors: 12543,
  totalPosts: 6,
  totalViews: 45678,
  totalComments: 234,
  monthlyVisitors: 3421,
  weeklyPosts: 2,
  avgReadTime: "7.5 min",
  bounceRate: "32%",
}

const recentPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14 and App Router",
    views: 1234,
    comments: 23,
    date: "2024-01-15",
    status: "published",
  },
  {
    id: 2,
    title: "Mastering TypeScript: Advanced Patterns",
    views: 987,
    comments: 15,
    date: "2024-01-10",
    status: "published",
  },
  {
    id: 3,
    title: "Building Scalable React Applications",
    views: 1567,
    comments: 31,
    date: "2024-01-05",
    status: "published",
  },
]

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType,
}: {
  title: string
  value: string | number
  icon: any
  change?: string
  changeType?: "positive" | "negative" | "neutral"
}) => (
  <div
    className="rounded-xl p-6 border transition-colors duration-300
    dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700
    bg-white border-gray-200 shadow-lg"
  >
    <div className="flex items-center justify-between mb-4">
      <div
        className="p-2 rounded-lg transition-colors duration-300
        dark:bg-gray-800 bg-gray-100"
      >
        <Icon
          className="w-6 h-6 transition-colors duration-300
          dark:text-purple-400 text-gray-700"
        />
      </div>
      {change && (
        <span
          className={`text-sm font-medium ${
            changeType === "positive"
              ? "text-green-500"
              : changeType === "negative"
                ? "text-red-500"
                : "dark:text-gray-400 text-gray-600"
          }`}
        >
          {change}
        </span>
      )}
    </div>
    <div
      className="text-2xl font-bold mb-1 transition-colors duration-300
      dark:text-white text-black"
    >
      {typeof value === "number" ? value.toLocaleString() : value}
    </div>
    <div
      className="text-sm transition-colors duration-300
      dark:text-gray-400 text-gray-600"
    >
      {title}
    </div>
  </div>
)

function AdminDashboardContent() {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300
              dark:text-white text-black"
            >
              Admin Dashboard
            </h1>
            <p
              className="transition-colors duration-300
              dark:text-gray-400 text-gray-600"
            >
              Welcome back! Here's what's happening with your blog.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Link
              href="/admin/create-post"
              className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-200 transform hover:scale-105
                dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700
                bg-black hover:bg-gray-800 text-white"
            >
              <Plus className="w-5 h-5" />
              Create New Post
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-3 font-medium rounded-lg border transition-colors duration-200
                dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400 dark:hover:text-white
                border-gray-300 text-gray-700 hover:border-black hover:text-black"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Visitors"
            value={mockStats.totalVisitors}
            icon={Users}
            change="+12.5%"
            changeType="positive"
          />
          <StatCard
            title="Total Posts"
            value={mockStats.totalPosts}
            icon={FileText}
            change="+2 this week"
            changeType="positive"
          />
          <StatCard title="Total Views" value={mockStats.totalViews} icon={Eye} change="+8.2%" changeType="positive" />
          <StatCard
            title="Comments"
            value={mockStats.totalComments}
            icon={MessageSquare}
            change="+15 today"
            changeType="positive"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Monthly Visitors"
            value={mockStats.monthlyVisitors}
            icon={Calendar}
            change="+5.3%"
            changeType="positive"
          />
          <StatCard
            title="Avg. Read Time"
            value={mockStats.avgReadTime}
            icon={Clock}
            change="+0.5 min"
            changeType="positive"
          />
          <StatCard
            title="Bounce Rate"
            value={mockStats.bounceRate}
            icon={TrendingUp}
            change="-2.1%"
            changeType="positive"
          />
          <StatCard
            title="Weekly Posts"
            value={mockStats.weeklyPosts}
            icon={BarChart3}
            change="Same as last week"
            changeType="neutral"
          />
        </div>

        {/* Recent Posts */}
        <div
          className="rounded-xl border transition-colors duration-300
          dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700
          bg-white border-gray-200 shadow-lg"
        >
          <div
            className="p-6 border-b transition-colors duration-300
            dark:border-gray-700 border-gray-200"
          >
            <h2
              className="text-xl font-semibold transition-colors duration-300
              dark:text-white text-black"
            >
              Recent Posts
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 rounded-lg border transition-colors duration-300
                  dark:bg-gray-800 dark:border-gray-700
                  bg-gray-50 border-gray-200"
                >
                  <div className="flex-1">
                    <h3
                      className="font-medium mb-1 transition-colors duration-300
                      dark:text-white text-black"
                    >
                      {post.title}
                    </h3>
                    <div
                      className="flex items-center gap-4 text-sm transition-colors duration-300
                      dark:text-gray-400 text-gray-600"
                    >
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments} comments
                      </span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-1 text-xs rounded-full transition-colors duration-300
                      dark:bg-green-900 dark:text-green-300
                      bg-green-100 text-green-800"
                    >
                      {post.status}
                    </span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-sm font-medium transition-colors duration-200
                        dark:text-purple-400 dark:hover:text-purple-300
                        text-black hover:text-gray-700"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
