import React from 'react'

interface QuestionProps {
  question: any;
} 

const Question: React.FC<QuestionProps> = ({question}) => {
    return (<div className='w-full rounded-md bg-activityBlue text-white'>
      <div className='flex justify-space items-center mb-4'>
        <div>{question.description}</div>
      </div>
    </div>);
}

export default Question;