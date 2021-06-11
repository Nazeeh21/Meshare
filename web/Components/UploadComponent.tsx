import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const UploadComponent: React.FC = ({}) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (files) {
      files.map((file) => {
        console.log(file);
        console.log('relative url: ', URL.createObjectURL(file));
      });
    }
  }, [files]);

  const onUploadClick = async () => {
    // const { data, error } = await supabase.storage
    //   .from("avatars")
    //   .upload(files.name, files);
    // if (error) {
    //   console.log(error);
    // }
    // if (data) {
    //   console.log(data);
    // }
  };

  return (
    <div className='mb-0'>
      <div className='mb-4 ml-2 '>
        <label className='bg-submitButton px-2 rounded-md cursor-pointer mt-2 mb-2'>
          <input
            className='hidden'
            type='file'
            onChange={(e) => {
              const newFiles = [...files];
              newFiles.push(e.target.files[0]);
              if (newFiles.length > 2) {
                alert('Uou can upload maximum 2 images');
                return;
              }
              setFiles(newFiles);
            }}
          />
          Upload Images
        </label>
      </div>

      <div className='mt-2 flex items-center'>
        {files.length !== 0 &&
          files.map((file, index) => (
            <div className='m-2 inline-block'>
              <div
                style={{
                  backgroundImage: `url(${URL.createObjectURL(file)})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  width: '8rem',
                  height: '8rem',
                }}
                className='w-auto h-auto rounded-md mr-6'
              >
                <div
                  onClick={() => {
                    const newFiles = [...files];
                    newFiles.splice(index, 1);
                    setFiles(newFiles);
                  }}
                  className='text-white flex items-center w-6 h-auto cursor-pointer rounded-full -ml-1 -mt-1 top-0 left-0 outline-none bg-activityBlue border-greyS border-2'
                >
                  <div className='m-auto'>x</div>
                </div>
              </div>
            </div>

            // <div className='relative ml-2 mb-2'>
            //   <img
            //     className='w-20 h-auto'
            //     src={URL.createObjectURL(file)}
            //     alt=''
            //   />
            // <div
            //   onClick={() => {
            //     const newFiles = [...files];
            //     newFiles.splice(index);
            //     setFiles(newFiles);
            //   }}
            //   className='text-white flex items-center w-6 h-auto cursor-pointer rounded-full -ml-1 -mt-1 top-0 left-0 outline-none bg-activityBlue border-greyS border-2'
            // >
            //   <div className='m-auto'>x</div>
            // </div>
            // </div>
          ))}
      </div>
    </div>
  );
};

export default UploadComponent;
