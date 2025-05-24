import logo from './logo.svg';
import './App.css';
import React from "react";
import purin from './purin.png';
import {uploadFile} from './UploadFile.tsx';
import { useEffect, useState } from 'react';

function App() {


  function UpdateImage({selectedFile}) {

    return <a> <p></p><img src = {selectedFile} style = {{maxHeight: "400px"}}/> </a>;

  }
  function ImageUploader() {
    const fileInputRef = React.useRef(null);
    const [fileURL, setFileURL] = useState(null);
  
    const handleClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        const file = (event.target.files[0]);
        setFileURL(URL.createObjectURL(file));
        uploadFile(file);
      }
    };
  
  
    return (
      <>
        <button type="button" onClick={handleClick} style = {{borderRadius: "20px", fontSize: "150%", 
          fontFamily: "courier", fontWeight: "bold", padding: "20px", borderWidth: "10px", backgroundColor: "#ffb56e",
          borderColor: "#c05a3d", borderStyle: "solid"
        }}>
          upload!!
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        {fileURL && <UpdateImage selectedFile={fileURL} />}
      </>
    );
  }
  
  
  return (
    <main style = {{margin: "20px", fontFamily: "courier"} }>
      <h1>i can read your mind and/or drink your blood <img src = {purin} style = {{maxHeight: "100px"}}/></h1>
      <ImageUploader />
    </main>
  );
}

export default App;
