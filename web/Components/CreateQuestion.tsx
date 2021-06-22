import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import TagsInput from 'react-tagsinput';
import { useCreateQuestionMutation } from '../generated/graphql';
import { DEFAULT_AVATARS_BUCKET } from '../lib/constants';
import { createUrqlClient } from '../utils/createUrqlClient';
import { supabase } from '../utils/supabaseClient';
import { useIsAuth } from '../utils/useIsAuth';
import UploadComponent from './UploadComponent';
import MarkDown from './MDEditor';

const CreateQuestion = () => {
  useIsAuth();
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [files, setFiles] = useState([]);
  const suggestions = [{ name: 'react' }, { name: 'react-native' }];
  const [question, setQuestion] = useState<{ text: string; html: string }>({
    text: '',
    html: '',
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const [, createQuestion] = useCreateQuestionMutation();

  const onSubmitClick = async () => {
    setSubmitting(true);

    const uploadedImagePaths = await uploadImages();
    const { error } = await createQuestion({
      ...question,
      imageUrls: uploadedImagePaths,
      tags,
    });

    if (!error) {
      setSubmitting(false)
      router.push('/');
    }
    setSubmitting(false);
  };

  const uploadImages = async () => {
    if (files.length === 0) {
      return [];
    }
    const UploadedImageData = await Promise.all(
      files.map(async (file) => {
        const { data, error } = await supabase.storage
          .from(DEFAULT_AVATARS_BUCKET)
          .upload(file.name, file);
        if (error) {
          console.log('error in uploading image: ', error);
          throw error;
        }
        if (data) {
          console.log('image uploaded successfully: ', data);
          console.log('Logging image_path: ', data.Key.substring(8));
          return data.Key.substring(8);
        }
      })
    );

    console.log('UploadedImageData: ', UploadedImageData);
    return UploadedImageData;
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
        {/* <input
          className='w-full mb-2 rounded-md placeholder-greyST text-black bg-iconGrey outline-none pt-2 px-2'
          placeholder='Enter title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /> */}
        <div className='w-full mt-4 mb-4 m-auto '>
          <div className='w-full h-64 overflow-y-auto'>
            <MarkDown value={question} setValue={setQuestion} />
          </div>
        </div>

        <div className='w-full min-h-24 h-auto mb-5 pb-1 bg-iconGrey rounded-md'>
          {/* <textarea
            className='w-full h-16 rounded-md placeholder-greyST text-black bg-iconGrey outline-none pt-2 px-2'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='write your question here..'
          /> */}
          <UploadComponent
            files={files}
            setFiles={setFiles}
            // uploadClick={onUploadClick}
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
        {/* <button
          onClick={() => {}}
          className='border-none bg-iconBlue text-blue font-semibold text-lg mt-4 mb-12 sm:mb-12 rounded-md p-2 pl-3 pr-3'
        >
          Create Question
        </button> */}
        <button
          onClick={onSubmitClick}
          className={`mt-6 bg-submitButton border-none py-2 px-3 ${
            submitting ? 'cursor-not-allowed' : 'cursor-pointer'
          } rounded-md outline-none text-lg font-bold text-white`}
        >
          {submitting ? (
            <div>
              <i className='fa fa-spinner fa-spin -ml-3 mr-2'></i>Creating ...
            </div>
          ) : (
            <div>Create Question</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(CreateQuestion);
