import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("http://localhost:8080/upload", formData);
      console.log(res.data.Status);
      (await res.data.Status) === "Sucess"
        ? console.log("Upload Successful")
        : console.log("Upload Failed");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <input type="file" onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
