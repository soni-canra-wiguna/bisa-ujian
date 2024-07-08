import { type Editor } from "@tiptap/react"
import { Toggle } from "../ui/toggle"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  HeadingIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ImageIcon,
  Link2,
  UnderlineIcon,
  Code,
  SquareTerminal,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Strikethrough,
  Highlighter,
  LucideImagePlus,
  FileImage,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import { Input } from "../ui/input"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { cn } from "@/lib/utils"
interface MenuBarProps {
  editor: Editor | null
  setImageURL: Dispatch<SetStateAction<string | null>>
  className?: string
}

export const MenuBar = ({ editor, setImageURL, className }: MenuBarProps) => {
  const [isDrawerImage, setIsDrawerImage] = useState<boolean>(false)
  const [isDrawerLink, setIsDrawerLink] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageURL(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleIconClick = () => {
    fileInputRef.current?.click()
  }

  const handleAddImageByURL = () => {
    const url = window.prompt("URL")

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
    // setIsDrawerImage(!isDrawerImage)
  }

  const handleAddLink = () => {
    editor.chain().focus().extendMarkRange("link").setLink({ href: link }).run()
    setIsDrawerLink(!isDrawerLink)
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-t-2xl bg-input border border-input p-2",
        className
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Toggle
            className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
            size="sm"
          >
            <HeadingIcon className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className="flex w-max items-center bg-input px-1.5 py-0"
        >
          <Toggle
            className="rounded-none hover:bg-secondary hover:text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary"
            size="sm"
            pressed={editor?.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="h-4 w-4" />
          </Toggle>
          <Toggle
            className="rounded-none hover:bg-secondary hover:text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary"
            size="sm"
            pressed={editor?.isActive("heading", { level: 2 })}
            onPressedChange={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </Toggle>
          <Toggle
            className="rounded-none hover:bg-secondary hover:text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary"
            size="sm"
            pressed={editor?.isActive("heading", { level: 3 })}
            onPressedChange={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="h-4 w-4" />
          </Toggle>
          <Toggle
            className="rounded-none hover:bg-secondary hover:text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary"
            size="sm"
            pressed={editor?.isActive("heading", { level: 4 })}
            onPressedChange={() =>
              editor?.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            <Heading4 className="h-4 w-4" />
          </Toggle>
          <Toggle
            className="rounded-none hover:bg-secondary hover:text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary"
            size="sm"
            pressed={editor?.isActive("heading", { level: 5 })}
            onPressedChange={() =>
              editor?.chain().focus().toggleHeading({ level: 5 }).run()
            }
          >
            <Heading5 className="h-4 w-4" />
          </Toggle>
          <Toggle
            className="rounded-none hover:bg-secondary hover:text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary"
            size="sm"
            pressed={editor?.isActive("heading", { level: 6 })}
            onPressedChange={() =>
              editor?.chain().focus().toggleHeading({ level: 6 }).run()
            }
          >
            <Heading6 className="h-4 w-4" />
          </Toggle>
        </PopoverContent>
      </Popover>
      {/* image */}
      <Popover>
        <PopoverTrigger asChild>
          <Toggle className="hover:bg-input hover:text-primary" size="sm">
            <LucideImagePlus className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className="flex w-max items-center bg-input px-1.5 py-0"
        >
          {/* local image */}
          <div className="flex h-8 cursor-pointer items-center justify-center rounded-none px-2 hover:bg-secondary hover:text-primary">
            <Input
              type="file"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            <FileImage className="size-4" onClick={handleIconClick} />
          </div>
          {/* url */}
          <Toggle
            className="rounded-none object-cover hover:bg-secondary hover:text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary"
            size="sm"
            pressed={editor?.isActive("image")}
            onPressedChange={handleAddImageByURL}
          >
            <ImageIcon className="h-4 w-4" />
          </Toggle>
        </PopoverContent>
      </Popover>
      {/* link start */}
      <Drawer open={isDrawerLink} onOpenChange={setIsDrawerLink}>
        <DrawerTrigger asChild>
          <Toggle
            className={`hover:bg-input hover:text-primary ${
              editor?.isActive("link") && "bg-input text-primary"
            }`}
            size="sm"
          >
            <Link2 className="h-4 w-4" />
          </Toggle>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto flex h-[300px] w-full max-w-lg items-center space-x-4">
            <Input
              placeholder="masukkan url"
              className="border border-border"
              onChange={(e) => setLink(e.target.value)}
            />
            <Button className="capitalize" onClick={handleAddLink}>
              tambahkan
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
      {/* link end */}
      {/* text align */}
      <Popover>
        <PopoverTrigger asChild>
          <Toggle
            className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
            size="sm"
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className="flex w-max items-center bg-input px-1.5 py-0"
        >
          <Toggle
            className="rounded-none hover:bg-secondary hover:text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary"
            size="sm"
            pressed={editor?.isActive({ textAlign: "left" })}
            onPressedChange={() =>
              editor?.chain().focus().setTextAlign("left").run()
            }
          >
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          <Toggle
            className="rounded-none hover:bg-secondary hover:text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary"
            size="sm"
            pressed={editor?.isActive({ textAlign: "center" })}
            onPressedChange={() =>
              editor?.chain().focus().setTextAlign("center").run()
            }
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          <Toggle
            className="rounded-none hover:bg-secondary hover:text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary"
            size="sm"
            pressed={editor?.isActive({ textAlign: "right" })}
            onPressedChange={() =>
              editor?.chain().focus().setTextAlign("right").run()
            }
          >
            <AlignRight className="h-4 w-4" />
          </Toggle>
        </PopoverContent>
      </Popover>
      <Toggle
        className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
        size="sm"
        pressed={editor?.isActive("bold")}
        onPressedChange={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
        size="sm"
        pressed={editor?.isActive("italic")}
        onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
        size="sm"
        pressed={editor?.isActive("bulletList")}
        onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>

      <Toggle
        className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
        size="sm"
        pressed={editor?.isActive("orderedList")}
        onPressedChange={() =>
          editor?.chain().focus().toggleOrderedList().run()
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
        size="sm"
        pressed={editor?.isActive("underline")}
        onPressedChange={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
        size="sm"
        pressed={editor?.isActive("codeBlock")}
        onPressedChange={() => editor?.chain().focus().toggleCodeBlock().run()}
      >
        <SquareTerminal className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
        size="sm"
        pressed={editor?.isActive("blockquote")}
        onPressedChange={() => editor?.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
        size="sm"
        pressed={editor?.isActive("strike")}
        onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
        size="sm"
        pressed={editor?.isActive("code")}
        onPressedChange={() => editor?.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="hover:bg-input hover:text-primary data-[state=on]:bg-input data-[state=on]:text-primary"
        size="sm"
        pressed={editor?.isActive("highlight")}
        onPressedChange={() =>
          editor?.chain().focus().toggleHighlight({ color: "#31ff6c5e" }).run()
        }
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
