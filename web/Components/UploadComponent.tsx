/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Compressor from "compressorjs";

interface UploadComponentProps {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  files,
  setFiles,
}) => {
  useEffect(() => {
    if (files) {
      files.map((file) => {
        console.log(file);
        console.log("relative url: ", URL.createObjectURL(file));
      });
    }
  }, [files]);

  return (
    <div className="mb-0">
      <div className="mb-4 ml-2 ">
        <label className="bg-submitButton p-2 rounded-md cursor-pointer mt-2 font-bold text-white">
          <input
            className="hidden"
            type="file"
            onChange={(e) => {
              const newFiles = [...files];
              console.log("before compressing: ", e.target.files[0]);
              new Compressor(e.target.files[0], {
                quality: 0.6,
                success: (compressedResult) => {
                  console.log("compressedResult: ", compressedResult);
                  newFiles.push(compressedResult);
                  // setCompressedFile(compressedResult);
                  // setIsCompressed(true);
                  if (newFiles.length > 2) {
                    alert("You can upload maximum 2 images");
                    return;
                  } else {
                    setFiles(newFiles);
                  }
                },
              });
            }}
          />
          Add Images
        </label>
      </div>
      <div className="mt-2 flex items-center">
        {files.length !== 0 &&
          files.map((file, index) => (
            <div key={index} className="m-2 inline-block">
              <div
                style={{
                  backgroundImage: `url(${URL.createObjectURL(file)})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "8rem",
                  height: "8rem",
                }}
                className="w-auto h-auto rounded-md mr-6"
              >
                <div
                  onClick={() => {
                    const newFiles = [...files];
                    newFiles.splice(index, 1);
                    setFiles(newFiles);
                  }}
                  className="h-6 w-6 cursor-pointer hover:bg-lightCyan"
                >
                  <img src="window-close-regular.svg" alt="cancel" />
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* <button
        disabled={files.length === 0}
        className={`${files.length === 0 && 'cursor-not-allowed'}`}
        onClick={uploadClick}
      >
        Upload
      </button> */}
    </div>
  );
};

export default UploadComponent;
