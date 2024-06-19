import { Editor } from '@tiptap/core'
import { 
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Underline,
    Undo,
    Redo
 } from 'lucide-react';

const Toolbar = ({ editor, content }) => {
    if (!editor) {
        return null
      }
  return (
    <>
    <div className='px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full border flex-wrap border-gray-800'>
      <button onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().run();
      }}
      className={
        editor.isActive("bold") ? "text-[#dddddd] bg-[#222222] shadow-black shadow-inner rounded-lg" : "text-[#a0a0a0]"
      }
      >
        <Bold className= "w-5 h-5"/>
      </button>
    </div>
    </>
  )
}

export default Toolbar