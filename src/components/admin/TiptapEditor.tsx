"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { useEffect, useState } from "react";

export type TiptapEditorProps = {
  // Tiptap JSON document
  defaultContent?: unknown;
  onChange?: (json: unknown, html: string) => void;
  placeholder?: string;
};

export function TiptapEditor({
  defaultContent,
  onChange,
  placeholder = "Start writing…",
}: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
        codeBlock: {},
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image,
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Typography,
    ],
    content: defaultContent ?? undefined,
    editorProps: {
      attributes: {
        class:
          "prose prose-ink min-h-[420px] max-w-none focus:outline-none px-5 py-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON(), editor.getHTML());
    },
  });

  if (!editor) return <div className="h-[460px] rounded-2xl border border-ink-200 bg-ink-50" />;

  return (
    <div className="rounded-2xl border border-ink-200 bg-ink-0">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const [, force] = useState(0);
  useEffect(() => {
    const handler = () => force((n) => n + 1);
    editor.on("selectionUpdate", handler);
    editor.on("transaction", handler);
    return () => {
      editor.off("selectionUpdate", handler);
      editor.off("transaction", handler);
    };
  }, [editor]);

  const Btn = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`h-8 min-w-8 rounded-md px-2 text-[12.5px] font-medium transition-colors ${
        active ? "bg-ink-900 text-ink-0" : "text-ink-700 hover:bg-ink-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-ink-200 px-3 py-2">
      <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Btn>
      <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
      <Btn title="Paragraph" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}>P</Btn>
      <Divider />
      <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><strong>B</strong></Btn>
      <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></Btn>
      <Btn title="Strike" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></Btn>
      <Btn title="Code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>{"</>"}</Btn>
      <Divider />
      <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>•</Btn>
      <Btn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1.</Btn>
      <Btn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>“”</Btn>
      <Btn title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{"{ }"}</Btn>
      <Divider />
      <Btn title="Link" active={editor.isActive("link")} onClick={() => {
        const prev = editor.getAttributes("link").href;
        const url = window.prompt("URL", prev ?? "https://");
        if (url === null) return;
        if (url === "") editor.chain().focus().unsetLink().run();
        else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
      }}>🔗</Btn>
      <Btn title="Image" onClick={async () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.onchange = async () => {
          const f = fileInput.files?.[0];
          if (!f) return;
          const fd = new FormData();
          fd.append("file", f);
          fd.append("alt", f.name);
          const r = await fetch("/api/media", { method: "POST", body: fd });
          if (!r.ok) {
            alert("Upload failed.");
            return;
          }
          const data = (await r.json()) as { id: string };
          editor.chain().focus().setImage({ src: `/api/media/${data.id}` }).run();
        };
        fileInput.click();
      }}>🖼</Btn>
      <Divider />
      <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}>↶</Btn>
      <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}>↷</Btn>
    </div>
  );
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-ink-200" />;
}
