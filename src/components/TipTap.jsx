'use client'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({onChange, content}) => {

  const handleChange = (newContent) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [StarterKit, 
      Placeholder.configure({
      placeholder: 'Write something …'})],
    editorProps: {
      attributes: {
      class: "mt-1 block w-full px-3 shadow-inner bg-[#222222] shadow-black py-2 rounded-md",
      },
      },
      onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
      },
      })
    
      if (!editor) {
        return null
      }
    

  return (
    <>
      <EditorContent style={{whiteSpace: "preline"}} editor={editor} />
    </>
  )
}

export default Tiptap;