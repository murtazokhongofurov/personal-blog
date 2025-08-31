"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Bold,
  Italic,
  Underline,
  LinkIcon,
  Code,
  ImageIcon,
  Quote,
  List,
  Type,
  Save,
  LogOut,
  X,
  Check,
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

interface PostData {
  title: string
  excerpt: string
  category: string
  tags: string[]
  content: string
  featured: boolean
  image: string
}

interface CodeBlock {
  id: string
  language: string
  code: string
}

const categories = ["Golang", "Insights"]
const PROGRAMMING_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
]

function CreatePostContent() {
  const { logout } = useAuth()
  const [postData, setPostData] = useState<PostData>({
    title: "",
    excerpt: "",
    category: "Web Development",
    tags: [],
    content: "",
    featured: false,
    image: "",
  })
  const [tagInput, setTagInput] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [showToolbar, setShowToolbar] = useState(false)
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 })
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [showCodeBlock, setShowCodeBlock] = useState(false)
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [codeContent, setCodeContent] = useState("")

  const editorRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  // Handle text selection for toolbar
  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      setShowToolbar(true)
    } else {
      setShowToolbar(false)
    }
  }

  // Handle slash commands
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "/") {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        setSlashMenuPosition({ x: rect.left, y: rect.bottom + window.scrollY })
        setShowSlashMenu(true)
      }
    } else if (e.key === "Escape") {
      setShowSlashMenu(false)
      setShowToolbar(false)
    }
  }

  // Format text
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  // Insert code block
  const insertCodeBlock = () => {
    setShowCodeBlock(true)
    setShowSlashMenu(false)
  }

  // Add code block to content
  const addCodeBlock = () => {
    const newCodeBlock: CodeBlock = {
      id: Date.now().toString(),
      language: selectedLanguage,
      code: codeContent,
    }
    setCodeBlocks([...codeBlocks, newCodeBlock])
    setShowCodeBlock(false)
    setCodeContent("")
    setSelectedLanguage("javascript")
  }

  // Insert image
  const insertImage = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = `<img src="${e.target?.result}" alt="Uploaded image" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px;" />`
          document.execCommand("insertHTML", false, img)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
    setShowSlashMenu(false)
  }

  // Insert link
  const insertLink = () => {
    if (linkUrl && linkText) {
      const link = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #1a73e8; text-decoration: underline;">${linkText}</a>`
      document.execCommand("insertHTML", false, link)
      setShowLinkDialog(false)
      setLinkUrl("")
      setLinkText("")
    }
  }

  // Slash menu commands
  const slashCommands = [
    {
      label: "Heading 1",
      icon: Type,
      command: () => {
        formatText("formatBlock", "h1")
        setShowSlashMenu(false)
      },
    },
    {
      label: "Heading 2",
      icon: Type,
      command: () => {
        formatText("formatBlock", "h2")
        setShowSlashMenu(false)
      },
    },
    {
      label: "Quote",
      icon: Quote,
      command: () => {
        formatText("formatBlock", "blockquote")
        setShowSlashMenu(false)
      },
    },
    {
      label: "Bullet List",
      icon: List,
      command: () => {
        formatText("insertUnorderedList")
        setShowSlashMenu(false)
      },
    },
    {
      label: "Code Block",
      icon: Code,
      command: insertCodeBlock,
    },
    {
      label: "Image",
      icon: ImageIcon,
      command: insertImage,
    },
  ]

  const handleInputChange = (field: keyof PostData, value: any) => {
    setPostData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (tagInput.trim() && !postData.tags.includes(tagInput.trim())) {
      handleInputChange("tags", [...postData.tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      postData.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // In a real app, you'd upload this to your storage service
      const imageUrl = URL.createObjectURL(file)
      handleInputChange("image", imageUrl)
    }
  }

  const handlePublish = () => {
    const postDataWithContent = {
      ...postData,
      content: editorRef.current?.innerHTML || "",
      codeBlocks,
    }
    console.log("Publishing post:", postDataWithContent)
    alert("Post published! (This is a demo)")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="text-sm text-gray-500">Draft</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePublish}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Publish
            </button>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title Input */}
        <div className="mb-8">
          <input
            ref={titleRef}
            type="text"
            value={postData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent leading-tight"
            placeholder="Title"
            style={{ fontFamily: "Georgia, serif" }}
          />
        </div>

        {/* Content Editor */}
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            onMouseUp={handleTextSelection}
            onKeyUp={handleTextSelection}
            onKeyDown={handleKeyDown}
            className="min-h-96 text-lg text-gray-800 leading-relaxed outline-none"
            style={{
              fontFamily: "Georgia, serif",
              lineHeight: "1.8",
            }}
            data-placeholder="Tell your story..."
            suppressContentEditableWarning={true}
          />

          {/* Placeholder styling */}
          <style jsx>{`
            [contenteditable]:empty:before {
              content: attr(data-placeholder);
              color: #9ca3af;
              pointer-events: none;
            }
          `}</style>
        </div>

        {/* Code Blocks */}
        {codeBlocks.map((block) => (
          <div key={block.id} className="my-8 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 capitalize">{block.language}</span>
              <button
                onClick={() => setCodeBlocks(codeBlocks.filter((cb) => cb.id !== block.id))}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-4 bg-gray-900 text-gray-100 overflow-x-auto">
              <code className="text-sm font-mono">{block.code}</code>
            </pre>
          </div>
        ))}
      </main>

      {/* Floating Toolbar */}
      {showToolbar && (
        <div className="fixed bg-gray-900 text-white rounded-lg shadow-lg px-2 py-1 flex items-center gap-1 z-40">
          <button
            onClick={() => formatText("bold")}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText("italic")}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText("underline")}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowLinkDialog(true)}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Slash Menu */}
      {showSlashMenu && (
        <div
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-40 min-w-48"
          style={{ left: slashMenuPosition.x, top: slashMenuPosition.y }}
        >
          {slashCommands.map((command, index) => (
            <button
              key={index}
              onClick={command.command}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm transition-colors"
            >
              <command.icon className="w-4 h-4 text-gray-500" />
              {command.label}
            </button>
          ))}
        </div>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Add Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter link text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLinkDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Code Block Dialog */}
      {showCodeBlock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add Code Block</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {PROGRAMMING_LANGUAGES.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                <textarea
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder={`// Write your ${selectedLanguage} code here...`}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCodeBlock(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addCodeBlock}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Add Code Block
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close menus */}
      {(showSlashMenu || showToolbar) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowSlashMenu(false)
            setShowToolbar(false)
          }}
        />
      )}
    </div>
  )
}

export default function CreatePost() {
  return (
    <ProtectedRoute>
      <CreatePostContent />
    </ProtectedRoute>
  )
}
