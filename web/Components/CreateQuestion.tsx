import React, { useEffect, useState, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import TagsInput from 'react-tagsinput';
import UploadComponent from './UploadComponent';

export const CreateQuestion = () => {
  const [tags, setTags] = useState([]);
  const suggestions = [{ name: 'react' }, { name: 'react-native' }];
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
        <div className='w-full min-h-24 h-auto mb-5 pb-1 bg-iconGrey rounded-md'>
          <textarea
            className='w-full h-16 rounded-md text-black bg-iconGrey outline-none pt-2 px-2'
            placeholder='write your question here..'
          />
          <UploadComponent />
        </div>
        <TagsInput
          className='mt-10 rounded-md w-full bg-iconGrey'
          renderInput={autosuggestRenderInput}
          value={tags}
          onChange={(e) => onChange(e)}
          maxTags={3}
          tagProps={{
            className:
              'bg-activityBlue text-white react-tagsinput-tag text-md font-medium rounded-md ml-2',
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
