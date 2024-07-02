'use client'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react';

function MenuBar() {
  const { editor } = useCurrentEditor()
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) {
    return null;
  }

  return (
    <>
      <button 
        className="fixed transition-all duration-300 hover:scale-125 top-1/2 right-80 z-50 bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full h-24 focus:outline-none text-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '>>' : '<<'}
      </button>
      <div className={`fixed top-0 right-0 h-full bg-[#1a1a1a] shadow-inner shadow-black transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="control-group rounded-xl p-4 pt-60 w-64 h-full overflow-y-auto">
          <div className="button-group grid grid-cols-2 gap-2">
          <div className="col-span-1">
              <button onClick={() => editor.chain().focus().undo().run()} className={'hover:bg-[#3d3d3d] transition-all duration-200 rounded-xl p-2 font-mono text-md m-2 border border-amber-600'}
                dangerouslySetInnerHTML={{ __html: icons.undo }}>
              </button>
              <button onClick={() => editor.chain().focus().redo().run()} className={'hover:bg-[#3d3d3d] transition-all duration-200 rounded-xl p-2 font-mono text-md m-2 border border-amber-600'}
                dangerouslySetInnerHTML={{ __html: icons.redo }}>
              </button>
            </div>
            <div className="col-span-1">
              <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 rounded-xl p-2 font-mono text-md m-2' : 'rounded-xl p-2 font-mono text-md m-2 border border-indigo-600 hover:bg-[#3d3d3d] transition-all duration-200'}
                dangerouslySetInnerHTML={{ __html: icons.bold }}>
              </button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-indigo-600 rounded-xl p-2 font-mono text-md m-2 hover:bg-indigo-500' : 'rounded-xl p-2 font-mono text-md m-2 border border-indigo-600 hover:bg-[#3d3d3d] transition-all duration-200'}
                dangerouslySetInnerHTML={{ __html: icons.italic }}>
              </button>
            </div>
            <div className="col-span-1 grid grid-cols-2 md:grid-cols-1 gap-2">
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-sky-600 rounded-xl p-2 font-mono text-md m-2 hover:bg-sky-500' : 'rounded-xl p-2 font-mono text-md m-2 border border-sky-600 hover:bg-[#3d3d3d] transition-all duration-200'}
                dangerouslySetInnerHTML={{ __html: icons.h1 }}>
              </button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-sky-600 rounded-xl p-2 font-mono text-md m-2 hover:bg-sky-500' : 'rounded-xl p-2 font-mono text-md m-2 border border-sky-600 hover:bg-[#3d3d3d] transition-all duration-200'}
                dangerouslySetInnerHTML={{ __html: icons.h2 }}>
              </button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-sky-600 rounded-xl p-2 font-mono text-md m-2 hover:bg-sky-500' : 'rounded-xl p-2 font-mono text-md m-2 border border-sky-600 hover:bg-[#3d3d3d] transition-all duration-200'}
                dangerouslySetInnerHTML={{ __html: icons.h3 }}>
              </button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive('heading', { level: 4 }) ? 'bg-sky-600 rounded-xl p-2 font-mono text-md m-2 hover:bg-sky-500' : 'rounded-xl p-2 font-mono text-md m-2 border border-sky-600 hover:bg-[#3d3d3d] transition-all duration-200'}
                dangerouslySetInnerHTML={{ __html: icons.h4 }}>
              </button>
            </div>
            <div className="col-span-1">
              <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? ' bg-sky-600 rounded-xl p-2 font-mono text-md m-2 hover:bg-sky-500' : ' rounded-xl p-2 font-mono text-md m-2 border border-sky-600 hover:bg-[#3d3d3d] transition-all duration-200'}>Parrafo</button>
              <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? ' bg-sky-600 rounded-xl p-2 font-mono text-md m-2 hover:bg-sky-500' : ' rounded-xl p-2 font-mono text-md m-2 border border-sky-600 hover:bg-[#3d3d3d] transition-all duration-200'}>Dialogo</button>
            </div>
            <div className="col-span-1">
              <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={'hover:bg-[#3d3d3d] transition-all duration-200 rounded-xl p-2 font-mono text-md m-2 border border-emerald-600'}>Linea Horizontal</button>
              <button onClick={() => editor.chain().focus().setHardBreak().run()} className={'hover:bg-[#3d3d3d] transition-all duration-200 rounded-xl p-2 font-mono text-md m-2 border border-emerald-600'}>Salto de linea</button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

const extensions = [
    StarterKit,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    Placeholder.configure({
        placeholder: 'Comienza tu historia...',
      }),
    
]

const EditorText = ({ content, onChange }) => {
    const handleChange = (newContent) => {
      onChange(newContent)
      console.log(newContent)
    }
  
    return (
      <>
        <EditorProvider
          extensions={extensions}
          content={content}
          onUpdate={({ editor }) => {
            handleChange(editor.getHTML())
          }}
        >
          <MenuBar />
          <EditorContent />
        </EditorProvider>
      </>
    )
  }

  const icons = {
    bold:  `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z"/></svg>`,
  
    italic: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z"/></svg>`,

    h1: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M200-280v-400h80v160h160v-160h80v400h-80v-160H280v160h-80Zm480 0v-320h-80v-80h160v400h-80Z"/></svg>`,

    h2: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-160q0-33 23.5-56.5T600-520h160v-80H520v-80h240q33 0 56.5 23.5T840-600v80q0 33-23.5 56.5T760-440H600v80h240v80H520Z"/></svg>`,

    h3: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-80h240v-80H600v-80h160v-80H520v-80h240q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H520Z"/></svg>`,

    h4: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm600 0v-120H520v-280h80v200h120v-200h80v200h80v80h-80v120h-80Z"/></svg>`,

    undo: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg>`,

    redo: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z"/></svg>`

  };
  
  export default EditorText