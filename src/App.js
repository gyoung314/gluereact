import logo from './logo.svg';
import './App.css';
import React from "react";
import purin from './purin.png';
import {uploadFile} from './UploadFile.tsx';
import { useEffect, useState } from 'react';

function App() {

  const [text, setText] = useState("");
  const [fileURL, setFileURL] = useState(null);


  function TextFetcher({ text }) {
    return <pre style = {{margin: "20px", fontFamily: "courier", fontSize: "150%",
      fontWeight: "bold",
    } }>{text}</pre>;
  }
  
  const fetchText = async () => {
    try {
      const res = await fetch("https://ae238w0og8.execute-api.us-east-1.amazonaws.com/translate");
      if (res.ok) {
        const wrapper = await res.json();
        setText(wrapper.content);
      } else {
        console.error("Failed to fetch text");
      }
    } catch (err) {
      console.error("Error fetching text:", err);
    }
  };

  
  function UpdateImage({selectedFile}) {

    return <a> <p></p><img src = {selectedFile} style = {{maxHeight: "400px"}}/> </a>;

  }
  function ImageUploader() {
    const fileInputRef = React.useRef(null);
  
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
          onChange={(e) => {
            handleImageChange(e);
            setTimeout(() => {
              fetchText();
            }, 5000); // wait 5 seconds (adjust as needed)
                  }}
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
      <TextFetcher text={text} />
      </main>
  );
}

export default App;
