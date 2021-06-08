import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const UploadComponent: React.FC = ({}) => {
  const [files, setFiles] = useState(null);
  useEffect(() => {
    if (files) {
      console.log(files);
      console.log('relative url: ', URL.createObjectURL(files));
    }
  }, [files]);
  
  const onUploadClick = async () => {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(files.name, files);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  return (
    <div>
      <input type='file' onChange={(e) => setFiles(e.target.files[0])} />
      <button onClick={onUploadClick}>Upload</button>
      {files && (
        <img className='w-20 h-20' src={URL.createObjectURL(files)} alt='' />
      )}
    </div>
  );
};

export default UploadComponent;
