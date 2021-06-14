import { withUrqlClient } from 'next-urql';
import React, { useEffect, useState, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import TagsInput from 'react-tagsinput';
import { useCreateQuestionMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { supabase } from '../utils/supabaseClient';
import UploadComponent from './UploadComponent';

const CreateQuestion = () => {
  const [tags, setTags] = useState([]);
  const [files, setFiles] = useState([]);
  const suggestions = [{ name: 'react' }, { name: 'react-native' }];
  const [title, setTitle] = useState<null | string>(null);
  const [description, setDescription] = useState<null | string>(null);

  const [, createQuestion] = useCreateQuestionMutation()

  const onUploadClick = async () => {
    const UploadedImageData = await Promise.all(
      files.map(async (file) => {
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(file.name, file);
        if (error) {
          console.log('error in uploading image: ', error);

          // throw new Error(error as any);
        }
        if (data) {
          console.log('image uploaded successfully: ', data);
          console.log('Logging image_path: ', data.Key.substring(8));
        }
        return data;
      })
    );

    console.log('UploadedImageData: ', UploadedImageData);
  };

  const onChange = (tag) => {
    setTags(tag);
  };

  function autosuggestRenderInput({ addTag, ...props }) {
    const handleOnChange = (e, { newValue, method }) => {
      if (method === 'enter') {
        e.preventDefault();
      } else {
        props.onChange(e);
      }
    };

    const inputValue = (props.value && props.value.trim().toLowerCase()) || '';
    const inputLength = inputValue.length;

    let suggestion = suggestions.filter((state) => {
      return state.name.toLowerCase().slice(0, inputLength) === inputValue;
    });

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestion}
        shouldRenderSuggestions={(value) => value && value.trim().length > 0}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
        inputProps={{ ...props, onChange: handleOnChange }}
        onSuggestionSelected={(e, { suggestion }) => {
          addTag(suggestion.name);
        }}
        onSuggestionsClearRequested={() => {}}
        onSuggestionsFetchRequested={() => {}}
      />
    );
  }

  return (
    <div>
      <div className='h-screen'>
        <input
          className='w-full mb-2 rounded-md placeholder-greyST text-black bg-iconGrey outline-none pt-2 px-2'
          placeholder='Enter title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className='w-full min-h-24 h-auto mb-5 pb-1 bg-iconGrey rounded-md'>
          <textarea
            className='w-full h-16 rounded-md placeholder-greyST text-black bg-iconGrey outline-none pt-2 px-2'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='write your question here..'
          />
          <UploadComponent
            files={files}
            setFiles={setFiles}
            uploadClick={onUploadClick}
          />
        </div>
        <TagsInput
          className='mt-10 rounded-md w-full bg-iconGrey'
          renderInput={autosuggestRenderInput}
          value={tags}
          onChange={(e) => onChange(e)}
          maxTags={3}
          tagProps={{
            className:
              'bg-activityBlue pl-2 text-black placeholder-black react-tagsinput-tag text-lg font-medium rounded-md ml-2',
            classNameRemove: 'react-tagsinput-remove',
          }}
        />

        <button
          onClick={() => {}}
          className='mt-6 bg-submitButton py-2 px-3 rounded-md outline-none text-lg font-bold text-white'
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(CreateQuestion);
