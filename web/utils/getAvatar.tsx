import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { URL } from 'url';
import { DEFAULT_AVATARS_BUCKET } from '../lib/constants';
import { supabase } from './supabaseClient';

interface getAvatarProps {
  path: string;
  styles?: string;
}

export const GetAvatar: React.FC<getAvatarProps> = ({ path, styles }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (path) {
      downloadImage(path);
    }
  }, []);

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .download(path);

      if (error) {
        throw error;
      }
      
      const url = webkitURL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('error downloading image: ', error.message);
    }
  };
  return avatarUrl ? (
    <img src={avatarUrl} className={styles} />
  ) : (
    <div className='w-full text-lg font-semibold'>No Image</div>
  );
};
