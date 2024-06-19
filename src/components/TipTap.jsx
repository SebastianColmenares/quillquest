'use client'
import Toolbar from '@/components/Toolbar'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({onChange, content}) => {

  const handleChange = (newContent) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
      class: "mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md",
      },
      },
      onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
      },
      content: "Comienza tu historia",
      })
    
      if (!editor) {
        return null
      }
    

  return (
    <>
      <Toolbar editor={editor} content={content}/>
      <EditorContent style={{whiteSpace: "preline"}} editor={editor} />
    </>
  )
}

export default Tiptap;