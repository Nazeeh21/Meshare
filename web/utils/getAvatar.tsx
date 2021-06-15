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

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (path) {
      downloadImage(path);
    }
  }, []);

  const downloadImage = async (path: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .download(path);

      if (error) {
        setLoading(false)
        throw error;
      }
      
      const url = webkitURL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      setLoading(false)
      console.log('error downloading image: ', error.message);
    }
    setLoading(false)
  };

  if(loading) {
    return <div className='w-full text-lg font-semibold'>Loading ...</div>
  }
  return avatarUrl ? (
    <img src={avatarUrl} className={styles} />
  ) : (
    <div className='w-full text-lg font-semibold'>No Image</div>
  );
};
