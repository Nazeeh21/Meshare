import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const UploadComponent: React.FC = ({}) => {
  const [files, setFiles] = useState(null);
  useEffect(() => {
    if (files) {
      console.log(files);
      console.log("relative url: ", URL.createObjectURL(files));
    }
  }, [files]);

  const onUploadClick = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(files.name, files);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  const removeImage = () => {
    setFiles(null);
  };

  return (
    <div>
      <label className="bg-submitButton py-.5 px-2 rounded-md float-right cursor-pointer mt-2">
        <input
          className="hidden"
          type="file"
          onChange={(e) => setFiles(e.target.files[0])}
        />
        Upload Images
      </label>

      {/* <button onClick={onUploadClick}>Upload</button> */}
      {files && (
        <div className="relative">
          <img className="w-20 h-20" src={URL.createObjectURL(files)} alt="" />
          <button
            onClick={() => {}}
            className="text-white absolute top-0 left-0 outline-none border-none"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
