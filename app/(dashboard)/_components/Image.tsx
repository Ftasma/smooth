// import { PutObjectCommand, Pre } from "@aws-sdk/client-s3";
import { useState } from "react";
// import "./styles.css";
import { v4 as uuidv4 } from "uuid";
// import s3_client from "./client";
import axios from "axios";

export default function ImageComp() {
  const [file, setFile] = useState<any>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState(0);

  function handleFileChange(e: any) {
    e.preventDefault();
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e:any) {
    e.preventDefault();
    console.log(file);
    console.log(file.name.split("."));
    const key = uuidv4();
    const response = await axios.get(
      `https://sbxapi.smoothballot.com/storage/url?key=${key}`
    );
    console.log(file);
    
    const signed_upload_url = response.data.data.url;
    const upload_response = axios
      .put(signed_upload_url, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setUploadProgress(percentCompleted);
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      })
      .then(() => {
        const file_url = `https://smooth-ballot.s3.eu-north-1.amazonaws.com/${key}`;
        setImage(file_url as any);
        setUploadProgress(0);
        const file_name_arr = file.name.split(".");
        const extension = file_name_arr[file_name_arr.length - 1];
        const file_object = {
          extension,
          id: key,
          link: file_url,
        };
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Upload file</label>
        <br />
        <input onChange={handleFileChange} type="file" />
        <br />
        <button>submit</button>
        <p>Upload progess: {uploadProgress}%</p>
        <img src={image as any} alt="" />
      </form>
    </div>
  );
}
