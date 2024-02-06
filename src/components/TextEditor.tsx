"use client"
import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const RichTextEditor: React.FC = () => {
    const [editorState, setEditorState] = useState(() => {
      // You can initialize the editor state with some content if needed
      return EditorState.createEmpty();
    });
  
    const handleEditorChange = (newEditorState: EditorState) => {
      setEditorState(newEditorState);
    };
  
    const handleSave = () => {
      // Example: Convert the content to raw JSON for saving or further processing
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      console.log(rawContentState);
  
      // Perform save or send the raw content state to the server
    };
  
    return (
      <section className=' w-full max-w-[900px] p-4'>
 
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
        />
        <button onClick={handleSave}>Save</button>
      </section>
    );
  };
  
  export default RichTextEditor;