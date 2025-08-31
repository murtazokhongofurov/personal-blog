import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    github: "#",
    live: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    id: 3,
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool that helps users create blog posts, social media content, and marketing copy.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Python", "OpenAI API", "FastAPI", "React"],
    github: "#",
    live: "#",
  },
]

export default function Projects() {
  return (
    <div
      className="min-h-screen py-20 px-4 transition-colors duration-300
  dark:bg-black bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span
              className="transition-colors duration-300
    dark:bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-gray-400 dark:bg-clip-text dark:text-transparent
    text-black"
            >
              My Projects
            </span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto transition-colors duration-300
  dark:text-gray-400 text-gray-600"
          >
            A collection of projects I've worked on, showcasing different technologies and problem-solving approaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl overflow-hidden border transition-all duration-300 group
  dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:hover:border-gray-600
  bg-white border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3
                  className="text-xl font-semibold mb-2 transition-colors duration-300
  dark:text-white text-black"
                >
                  {project.title}
                </h3>
                <p
                  className="mb-4 text-sm leading-relaxed transition-colors duration-300
  dark:text-gray-400 text-gray-600"
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md border transition-colors duration-300
  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
  bg-gray-100 text-gray-700 border-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 transition-colors duration-300
  dark:text-gray-400 dark:hover:text-white
  text-gray-600 hover:text-black"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center gap-2 transition-colors duration-300
  dark:text-gray-400 dark:hover:text-white
  text-gray-600 hover:text-black"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
