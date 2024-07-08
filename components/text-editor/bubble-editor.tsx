"use client"

import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { Underline as UnderlineTiptap } from "@tiptap/extension-underline"
import { TextAlign as TextAlignTiptap } from "@tiptap/extension-text-align"
import { cn } from "@/lib/utils"
import Highlight from "@tiptap/extension-highlight"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"
import markdown from "highlight.js/lib/languages/markdown"
import { common, createLowlight } from "lowlight"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { MenuBar } from "./menu-bar"
import { useEffect, useState } from "react"
import Placeholder from '@tiptap/extension-placeholder'
import { proseClass } from "@/utils/prose"

interface TextEditorProps {
  className?: string
  content: string
  questions: any
  questionIndex: any
  setQuestions: any
  optionIndex: any
  // form: ReturnType<typeof useForm<z.infer<typeof blogSchema>>>
}

const lowlight = createLowlight(common)

lowlight.register("html", html)
lowlight.register("css", css)
lowlight.register("js", js)
lowlight.register("ts", ts)
lowlight.register("markdown", markdown)

const BubbleEditor = ({
  className,
  content,
  questions,
  questionIndex,
  setQuestions,
  optionIndex,
}: TextEditorProps) => {
  const editor = useEditor({
    content: content,
    editorProps: {
      attributes: {
        class: cn("outline-none focus:outline-none prose"),
      },
    },
    extensions: [
      StarterKit.configure({
        dropcursor: {
          color: "hsl( 24.6 95% 53.1%)",
        },
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        code: {
          HTMLAttributes: {
            class:
              "bg-input border border-secondary rounded-md text-primary px-1.5 py-1 no-before no-after font-medium",
          },
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        // defaultProtocol: "https"
      }),
      Typography,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "proseImage",
        },
      }),
      UnderlineTiptap,
      TextAlignTiptap.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "custom-highlight",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "preScroll",
        },
      }),
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
    ],
    onUpdate({ editor }) {
      const newOptions = [...questions]
      newOptions[questionIndex].options[optionIndex].content = editor.getHTML()
      setQuestions(newOptions)
    },
  })
  const [imageURL, setImageURL] = useState<string | null>(null)

  useEffect(() => {
    if (editor && imageURL) {
      editor.commands.setImage({
        src: imageURL,
      })
    }
  }, [imageURL, editor])

  return (
    <div className="flex-1">
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <MenuBar
            editor={editor}
            setImageURL={setImageURL}
            className="rounded-md"
          />
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        className={cn(
          `scrollY min-h-[50px] max-h-[400px] max-w-full overflow-x-auto h-full overflow-y-auto rounded-md border border-input p-2 marker:prose prose-headings:text-foreground prose-p:text-foreground prose-a:cursor-pointer prose-a:text-primary prose-a:no-underline prose-blockquote:border-s-input prose-strong:text-foreground prose-pre:bg-input prose-li:text-foreground prose-li:marker:text-primary prose-hr:my-[2.5em] prose-hr:border-border`,
          className
        )}
        placeholder="description product"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  )
}

export default BubbleEditor
