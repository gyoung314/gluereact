export async function uploadFile(file: File) {
    const reader = new FileReader();
  
    reader.onload = async () => {
      console.log("uploading function called!");
      const base64 = (reader.result as string).split(",")[1]; // remove prefix
  
      const res = await fetch("https://ae238w0og8.execute-api.us-east-1.amazonaws.com/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          filedata: base64,
        }),
      });
  
      if (res.ok) {
        console.log("Upload success");
      } else {
        console.error("Upload failed");
      }
    };
  
    reader.readAsDataURL(file);
  }
  