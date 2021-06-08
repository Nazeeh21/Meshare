import React from 'react'

interface TagProps {
  tag: string;
}

export const Tag: React.FC<TagProps> = ({tag}) => {
    return (<div className='bg-lightGrey font-medium text-activityBlue p-1 pl-2 pr-2 rounded-full inline-block mr-3'>{tag}</div>);
}