import { Code, Coffee, Music, Camera, BookOpen, Zap } from "lucide-react"

const skills = [
  "Go",
  "Database Design",
  "Gin/Fiber",
  "Docker",
  "AWS/Cloud Services",
  "Git/Version Control",
  "REST APIs",
  "PostgreSQL",
]

const interests = [
  {
    icon: Code,
    title: "Open Source",
    description: "Contributing to open source projects and building tools for developers",
  },
  {
    icon: BookOpen,
    title: "Reading",
    description: "Always learning through books on technology, philosophy, and science",
  },
  { 
    icon: Zap, 
    title: "Innovation", 
    description: "Staying curious about emerging technologies and their potential", 
  },
]

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span
              className="transition-colors duration-300
  dark:bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-gray-400 dark:bg-clip-text dark:text-transparent
  text-black"
            >
              About Me
            </span>
          </h1>
          <p
            className="text-lg transition-colors duration-300
  dark:text-gray-400 text-gray-600"
          >
            Get to know the person behind the code
          </p>
        </div>

        {/* Bio Section */}
        <div className="mb-16">
          <div
            className="rounded-2xl p-8 border transition-colors duration-300
  dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700
  bg-white border-gray-200 shadow-lg"
          >
            <h2
              className="text-2xl font-semibold mb-6 transition-colors duration-300
  dark:text-white text-black"
            >
              My Story
            </h2>
            <div
              className="space-y-4 leading-relaxed transition-colors duration-300
  dark:text-gray-300 text-gray-700"
            >
              <p>
                Hello! I'm Murtazo, a software engineer at Noor, based in Tashkent, Uzbekistan. 
                I specialize in building reliable and efficient software solutions while continuously improving my skills in modern technologies.
              </p>
              <p>
                Passionate about problem-solving and innovation, I enjoy working on projects that create value and make a positive impact. 
                Outside of work, I stay curious, keep learning, and explore new ideas in the tech world.
              </p>

            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2
            className="text-2xl font-semibold mb-8 transition-colors duration-300
  dark:text-white text-black"
          >
            Technical Skills
          </h2>
          <div
            className="rounded-2xl p-8 border transition-colors duration-300
  dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700
  bg-white border-gray-200 shadow-lg"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-3 rounded-lg border text-center transition-colors duration-300
  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300
  bg-gray-50 border-gray-200 text-gray-700"
                >
                  <span className="font-medium text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-16">
          <h2
            className="text-2xl font-semibold mb-8 transition-colors duration-300
  dark:text-white text-black"
          >
            Beyond Coding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((interest) => (
              <div
                className="rounded-xl p-6 border transition-all duration-300
  dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:hover:border-gray-600
  bg-white border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
                key={interest.title}
              >
                <interest.icon
                  className="w-8 h-8 mb-4 transition-colors duration-300
    dark:text-purple-400 text-gray-700"
                />
                <h3
                  className="font-semibold mb-2 transition-colors duration-300
    dark:text-white text-black"
                >
                  {interest.title}
                </h3>
                <p
                  className="text-sm transition-colors duration-300
    dark:text-gray-400 text-gray-600"
                >
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div
          className="rounded-2xl p-8 border transition-colors duration-300
  dark:bg-gradient-to-r dark:from-purple-900/20 dark:to-pink-900/20 dark:border-gray-700
  bg-gray-50 border-gray-200"
        >
          <h2
            className="text-2xl font-semibold mb-6 text-center transition-colors duration-300
    dark:text-white text-black"
          >
            What Drives Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3
                className="font-semibold mb-2 transition-colors duration-300
    dark:text-white text-black"
              >
                Innovation
              </h3>
              <p
                className="text-sm transition-colors duration-300
    dark:text-gray-400 text-gray-600"
              >
                Always pushing boundaries and exploring new possibilities in technology
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🤝</div>
              <h3
                className="font-semibold mb-2 transition-colors duration-300
    dark:text-white text-black"
              >
                Collaboration
              </h3>
              <p
                className="text-sm transition-colors duration-300
    dark:text-gray-400 text-gray-600"
              >
                Believing that the best solutions come from diverse perspectives and teamwork
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📚</div>
              <h3
                className="font-semibold mb-2 transition-colors duration-300
    dark:text-white text-black"
              >
                Learning
              </h3>
              <p
                className="text-sm transition-colors duration-300
    dark:text-gray-400 text-gray-600"
              >
                Committed to continuous growth and sharing knowledge with the community
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
