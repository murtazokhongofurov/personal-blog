"use client"

import type React from "react"

import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span
              className="transition-colors duration-300
  dark:bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-gray-400 dark:bg-clip-text dark:text-transparent
  text-black"
            >
              Get In Touch
            </span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto transition-colors duration-300
  dark:text-gray-400 text-gray-600"
          >
            Have a project in mind or just want to chat? I'd love to hear from you. Let's create something amazing
            together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className="rounded-2xl p-8 border transition-colors duration-300
  dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700
  bg-white border-gray-200 shadow-lg"
          >
            <h2
              className="text-2xl font-semibold mb-6 transition-colors duration-300
  dark:text-white text-black"
            >
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 transition-colors duration-300
  dark:text-gray-300 text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none transition-colors duration-300
  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-purple-500
  bg-white border-gray-300 text-black focus:border-black"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 transition-colors duration-300
  dark:text-gray-300 text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none transition-colors duration-300
  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-purple-500
  bg-white border-gray-300 text-black focus:border-black"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2 transition-colors duration-300
  dark:text-gray-300 text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none transition-colors duration-300
  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-purple-500
  bg-white border-gray-300 text-black focus:border-black"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 transition-colors duration-300
  dark:text-gray-300 text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none transition-colors duration-300
  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-purple-500
  bg-white border-gray-300 text-black focus:border-black resize-none"
                  placeholder="Tell me about your project or just say hello!"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 font-medium rounded-lg transition-all duration-200 transform hover:scale-105
    dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700
    bg-black hover:bg-gray-800 text-white"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div
              className="rounded-2xl p-8 border transition-colors duration-300
  dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700
  bg-white border-gray-200 shadow-lg"
            >
              <h2
                className="text-2xl font-semibold mb-6 transition-colors duration-300
  dark:text-white text-black"
              >
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <div
                      className="font-medium transition-colors duration-300
  dark:text-white text-black"
                    >
                      Email
                    </div>
                    <div
                      className="transition-colors duration-300
  dark:text-gray-400 text-gray-600"
                    >
                      john.doe@example.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <div>
                    <div
                      className="font-medium transition-colors duration-300
  dark:text-white text-black"
                    >
                      Phone
                    </div>
                    <div
                      className="transition-colors duration-300
  dark:text-gray-400 text-gray-600"
                    >
                      +1 (555) 123-4567
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <div>
                    <div
                      className="font-medium transition-colors duration-300
  dark:text-white text-black"
                    >
                      Location
                    </div>
                    <div
                      className="transition-colors duration-300
  dark:text-gray-400 text-gray-600"
                    >
                      San Francisco, CA
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div
              className="rounded-2xl p-8 border transition-colors duration-300
  dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700
  bg-white border-gray-200 shadow-lg"
            >
              <h2
                className="text-2xl font-semibold mb-6 transition-colors duration-300
    dark:text-white text-black"
              >
                Connect With Me
              </h2>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 rounded-lg border transition-colors group
  dark:bg-gray-800 dark:border-gray-600 dark:hover:border-purple-500
  bg-gray-100 border-gray-300 hover:border-gray-400"
                >
                  <Github
                    className="w-5 h-5 transition-colors
    dark:text-gray-400 dark:group-hover:text-purple-400
    text-gray-600 group-hover:text-gray-800"
                  />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-lg border transition-colors group
  dark:bg-gray-800 dark:border-gray-600 dark:hover:border-purple-500
  bg-gray-100 border-gray-300 hover:border-gray-400"
                >
                  <Linkedin
                    className="w-5 h-5 transition-colors
    dark:text-gray-400 dark:group-hover:text-purple-400
    text-gray-600 group-hover:text-gray-800"
                  />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-lg border transition-colors group
  dark:bg-gray-800 dark:border-gray-600 dark:hover:border-purple-500
  bg-gray-100 border-gray-300 hover:border-gray-400"
                >
                  <Twitter
                    className="w-5 h-5 transition-colors
    dark:text-gray-400 dark:group-hover:text-purple-400
    text-gray-600 group-hover:text-gray-800"
                  />
                </a>
              </div>
            </div>

            {/* Availability */}
            <div
              className="rounded-2xl p-8 border transition-colors duration-300
  dark:bg-gradient-to-r dark:from-green-900/20 dark:to-blue-900/20 dark:border-green-700/30
  bg-green-50 border-green-200"
            >
              <h3
                className="text-xl font-semibold mb-4 transition-colors duration-300
    dark:text-white text-black"
              >
                Current Availability
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span
                  className="font-medium transition-colors duration-300
    dark:text-green-400 text-green-600"
                >
                  Available for new projects
                </span>
              </div>
              <p
                className="text-sm transition-colors duration-300
    dark:text-gray-400 text-gray-600"
              >
                I'm currently accepting new freelance projects and consulting opportunities. Let's discuss how we can
                work together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
