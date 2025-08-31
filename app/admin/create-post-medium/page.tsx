"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Plus,
  GripVertical,
  Type,
  Code,
  ImageIcon,
  Quote,
  List,
  ListOrdered,
  Trash2,
  Upload,
  Save,
  LogOut,
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

interface ContentBlock {
  id: string
  type:
    | "title"
    | "subtitle"
    | "paragraph"
    | "heading1"
    | "heading2"
    | "quote"
    | "code"
    | "image"
    | "bulletList"
    | "numberedList"
  content: string
  language?: string
  imageFile?: File
  imageUrl?: string
}

const BLOCK_TYPES = [
  { type: "paragraph", label: "Paragraph", icon: Type },
  { type: "heading1", label: "Heading 1", icon: Type },
  { type: "heading2", label: "Heading 2", icon: Type },
  { type: "quote", label: "Quote", icon: Quote },
  { type: "code", label: "Code", icon: Code },
  { type: "image", label: "Image", icon: ImageIcon },
  { type: "bulletList", label: "Bullet List", icon: List },
  { type: "numberedList", label: "Numbered List", icon: ListOrdered },
] as const

const PROGRAMMING_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "go",
  "rust",
  "cpp",
  "c",
  "php",
  "ruby",
  "swift",
  "kotlin",
  "html",
  "css",
  "sql",
  "bash",
]

function MediumStyleEditorContent() {
  const { logout } = useAuth()
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { id: "1", type: "title", content: "" },
    { id: "2", type: "subtitle", content: "" },
    { id: "3", type: "paragraph", content: "" },
  ])
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null)
  const [showBlockMenu, setShowBlockMenu] = useState<string | null>(null)
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateBlock = useCallback((id: string, updates: Partial<ContentBlock>) => {
    setBlocks((prev) => prev.map((block) => (block.id === id ? { ...block, ...updates } : block)))
  }, [])

  const addBlock = useCallback((afterId: string, type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: "",
      ...(type === "code" && { language: "javascript" }),
    }

    setBlocks((prev) => {
      const index = prev.findIndex((block) => block.id === afterId)
      const newBlocks = [...prev]
      newBlocks.splice(index + 1, 0, newBlock)
      return newBlocks
    })
    setShowBlockMenu(null)
    setTimeout(() => setActiveBlockId(newBlock.id), 100)
  }, [])

  const deleteBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id))
  }, [])

  const handleImageUpload = useCallback(
    (blockId: string, file: File) => {
      const imageUrl = URL.createObjectURL(file)
      updateBlock(blockId, { imageFile: file, imageUrl, content: file.name })
    },
    [updateBlock],
  )

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlock(blockId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedBlock || draggedBlock === targetId) return

    setBlocks((prev) => {
      const draggedIndex = prev.findIndex((block) => block.id === draggedBlock)
      const targetIndex = prev.findIndex((block) => block.id === targetId)

      const newBlocks = [...prev]
      const [draggedItem] = newBlocks.splice(draggedIndex, 1)
      newBlocks.splice(targetIndex, 0, draggedItem)

      return newBlocks
    })
    setDraggedBlock(null)
  }

  const renderBlock = (block: ContentBlock, index: number) => {
    const isActive = activeBlockId === block.id
    const isTitle = block.type === "title"
    const isSubtitle = block.type === "subtitle"

    return (
      <div
        key={block.id}
        className={`group relative transition-all duration-200 ${draggedBlock === block.id ? "opacity-50" : ""}`}
        draggable={!isTitle && !isSubtitle}
        onDragStart={(e) => handleDragStart(e, block.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, block.id)}
      >
        {/* Drag Handle */}
        {!isTitle && !isSubtitle && (
          <div className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
          </div>
        )}

        {/* Add Block Button */}
        {!isTitle && !isSubtitle && (
          <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowBlockMenu(showBlockMenu === block.id ? null : block.id)}
              className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 flex items-center justify-center transition-colors"
            >
              <Plus className="w-3 h-3 text-gray-600" />
            </button>

            {showBlockMenu === block.id && (
              <div className="absolute left-8 top-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-48">
                {BLOCK_TYPES.map(({ type, label, icon: Icon }) => (
                  <button
                    key={type}
                    onClick={() => addBlock(block.id, type as ContentBlock["type"])}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                  >
                    <Icon className="w-4 h-4 text-gray-500" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Delete Button */}
        {!isTitle && !isSubtitle && blocks.length > 3 && (
          <div className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => deleteBlock(block.id)}
              className="w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-3 h-3 text-red-500" />
            </button>
          </div>
        )}

        {/* Block Content */}
        <div className="relative">
          {block.type === "title" && (
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              onFocus={() => setActiveBlockId(block.id)}
              onBlur={() => setActiveBlockId(null)}
              className="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent resize-none leading-tight"
              placeholder="Title"
            />
          )}

          {block.type === "subtitle" && (
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              onFocus={() => setActiveBlockId(block.id)}
              onBlur={() => setActiveBlockId(null)}
              className="w-full text-xl text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent resize-none leading-relaxed"
              placeholder="Tell your story..."
            />
          )}

          {block.type === "paragraph" && (
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              onFocus={() => setActiveBlockId(block.id)}
              onBlur={() => setActiveBlockId(null)}
              className="w-full text-lg text-gray-800 placeholder-gray-400 border-none outline-none bg-transparent resize-none leading-relaxed min-h-[2rem]"
              placeholder="Start writing..."
              rows={1}
              style={{ height: "auto" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = target.scrollHeight + "px"
              }}
            />
          )}

          {block.type === "heading1" && (
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              onFocus={() => setActiveBlockId(block.id)}
              onBlur={() => setActiveBlockId(null)}
              className="w-full text-3xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent resize-none leading-tight"
              placeholder="Heading 1"
            />
          )}

          {block.type === "heading2" && (
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              onFocus={() => setActiveBlockId(block.id)}
              onBlur={() => setActiveBlockId(null)}
              className="w-full text-2xl font-semibold text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent resize-none leading-tight"
              placeholder="Heading 2"
            />
          )}

          {block.type === "quote" && (
            <div className="border-l-4 border-gray-300 pl-6">
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                onFocus={() => setActiveBlockId(block.id)}
                onBlur={() => setActiveBlockId(null)}
                className="w-full text-lg italic text-gray-700 placeholder-gray-400 border-none outline-none bg-transparent resize-none leading-relaxed min-h-[2rem]"
                placeholder="Write a quote..."
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = "auto"
                  target.style.height = target.scrollHeight + "px"
                }}
              />
            </div>
          )}

          {block.type === "code" && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                <select
                  value={block.language || "javascript"}
                  onChange={(e) => updateBlock(block.id, { language: e.target.value })}
                  className="text-sm bg-transparent border-none outline-none text-gray-600"
                >
                  {PROGRAMMING_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                onFocus={() => setActiveBlockId(block.id)}
                onBlur={() => setActiveBlockId(null)}
                className="w-full p-4 font-mono text-sm text-gray-800 placeholder-gray-400 border-none outline-none bg-white resize-none leading-relaxed min-h-[8rem]"
                placeholder={`// Write your ${block.language || "javascript"} code here...`}
                rows={6}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = "auto"
                  target.style.height = Math.max(target.scrollHeight, 128) + "px"
                }}
              />
            </div>
          )}

          {block.type === "image" && (
            <div className="my-4">
              {block.imageUrl ? (
                <div className="relative group">
                  <img
                    src={block.imageUrl || "/placeholder.svg"}
                    alt={block.content || "Uploaded image"}
                    className="w-full rounded-lg shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center">
                    <button
                      onClick={() => updateBlock(block.id, { imageUrl: "", imageFile: undefined, content: "" })}
                      className="opacity-0 group-hover:opacity-100 bg-red-500 text-white px-3 py-1 rounded text-sm transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                    className="w-full mt-2 text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent text-center italic"
                    placeholder="Add a caption..."
                  />
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onClick={() => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = "image/*"
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) handleImageUpload(block.id, file)
                    }
                    input.click()
                  }}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload an image</p>
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          )}

          {(block.type === "bulletList" || block.type === "numberedList") && (
            <div className="space-y-2">
              {block.content.split("\n").map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-3">
                  <span className="text-gray-600 mt-1 text-lg leading-relaxed">
                    {block.type === "bulletList" ? "•" : `${itemIndex + 1}.`}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const items = block.content.split("\n")
                      items[itemIndex] = e.target.value
                      updateBlock(block.id, { content: items.join("\n") })
                    }}
                    onFocus={() => setActiveBlockId(block.id)}
                    onBlur={() => setActiveBlockId(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        const items = block.content.split("\n")
                        items.splice(itemIndex + 1, 0, "")
                        updateBlock(block.id, { content: items.join("\n") })
                      }
                    }}
                    className="flex-1 text-lg text-gray-800 placeholder-gray-400 border-none outline-none bg-transparent leading-relaxed"
                    placeholder="List item..."
                  />
                </div>
              ))}
              {block.content === "" && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 mt-1 text-lg leading-relaxed">
                    {block.type === "bulletList" ? "•" : "1."}
                  </span>
                  <input
                    type="text"
                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                    onFocus={() => setActiveBlockId(block.id)}
                    onBlur={() => setActiveBlockId(null)}
                    className="flex-1 text-lg text-gray-800 placeholder-gray-400 border-none outline-none bg-transparent leading-relaxed"
                    placeholder="List item..."
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  const handlePublish = () => {
    const postData = {
      title: blocks.find((b) => b.type === "title")?.content || "",
      subtitle: blocks.find((b) => b.type === "subtitle")?.content || "",
      blocks: blocks.filter((b) => b.type !== "title" && b.type !== "subtitle"),
    }
    console.log("Publishing post:", postData)
    alert("Post published! (This is a demo)")
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 bg-white border-b border-gray-200 z-40">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Link>
              <div className="text-sm text-gray-500">Draft</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePublish}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
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
          <div className="space-y-4">{blocks.map((block, index) => renderBlock(block, index))}</div>

          {/* Add Block at End */}
          <div className="mt-8 pt-4">
            <button
              onClick={() => addBlock(blocks[blocks.length - 1].id, "paragraph")}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add block
            </button>
          </div>
        </main>

        {/* Click outside to close menus */}
        {showBlockMenu && <div className="fixed inset-0 z-0" onClick={() => setShowBlockMenu(null)} />}
      </div>
    </ProtectedRoute>
  )
}

export default function MediumStyleEditor() {
  return <MediumStyleEditorContent />
}
