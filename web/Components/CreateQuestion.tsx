import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Autosuggest from "react-autosuggest";
import TagsInput from "react-tagsinput";
import { useCreateQuestionMutation } from "../generated/graphql";
import { DEFAULT_AVATARS_BUCKET } from "../lib/constants";
import { createUrqlClient } from "../utils/createUrqlClient";
import { supabase } from "../utils/supabaseClient";
import { useIsAuth } from "../utils/useIsAuth";
import UploadComponent from "./UploadComponent";
import MarkDown from "./MDEditor";
import { Bounty } from "./Bounty";
import web3 from "../ethereum/web3";
import Meshare from "../ethereum/Meshare";

const CreateQuestion = () => {
  useIsAuth();
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [files, setFiles] = useState([]);
  const suggestions = [{ name: "react" }, { name: "react-native" }];
  const [bountyValue, setBountyValues] = useState<null | number>(null)
  const [title, setTitle] = useState<string>("");
  const [question, setQuestion] = useState<{ text: string; html: string }>({
    text: "",
    html: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [, createQuestion] = useCreateQuestionMutation();

  const onSubmitClick = async () => {
    setSubmitting(true);

    const uploadedImagePaths = await uploadImages();
    const { data, error } = await createQuestion({
      ...question,
      title,
      imageUrls: uploadedImagePaths,
      tags,
      bountyAmount: bountyValue,
    });

    if (!error) {
      if(bountyValue && bountyValue >= 1) {
        const accounts = await web3.eth.getAccounts();
        await Meshare.methods.createQuestion(data.createQuestion.id).send({
          from: accounts[0],
          value: web3.utils.toWei(bountyValue.toString(), "ether"),
        })
      }
      setSubmitting(false);
      router.push("/");
    }
    setSubmitting(false);
  };

  useEffect(() => {
    console.log("files from createQuestion: ", files);
  }, [files]);

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
          console.log("error in uploading image: ", error);
          throw error;
        }
        if (data) {
          console.log("image uploaded successfully: ", data);
          console.log("Logging image_path: ", data.Key.substring(8));
          return data.Key.substring(8);
        }
      })
    );

    console.log("UploadedImageData: ", UploadedImageData);
    return UploadedImageData;
  };

  const onChange = (tag) => {
    setTags(tag);
  };

  function autosuggestRenderInput({ addTag, ...props }) {
    const handleOnChange = (e, { newValue, method }) => {
      if (method === "enter") {
        e.preventDefault();
      } else {
        props.onChange(e);
      }
    };

    const inputValue = (props.value && props.value.trim().toLowerCase()) || "";
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

  useEffect(() => {
    console.log("question from createQuestion: ", question);
  }, [question]);

  return (
    <div>
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <div className='text-3xl font-bold mt-2 mb-4'>
          Create Question
        </div>
        <div className="w-full">
          <label className="mt-2 mb-2 font-semibold text-xl">Enter Title</label>
          <input
            className="w-full bg-gray-400 rounded-md outline-none placeholder-gray-600 p-2"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="What's your question about?"
          />
        </div>

        <div className="w-full mt-4 mb-4 m-auto ">
          <label className="mt-2 mb-2 font-semibold text-xl">Enter Question</label>
          <div className="w-full h-64 overflow-y-auto">
            <MarkDown value={question} setValue={setQuestion} />
          </div>
        </div>
        <div className="w-full min-h-24 h-auto mb-5 pb-1 bg-iconGrey rounded-md">
          <UploadComponent files={files} setFiles={setFiles} />
        </div>
        <div className='mt-8'>
          <label className="mt-2 mb-2 font-semibold text-xl">Add Tags</label>
        <TagsInput
          className="rounded-md w-full bg-iconGrey"
          renderInput={autosuggestRenderInput}
          value={tags}
          onChange={(e) => onChange(e)}
          maxTags={3}
          tagProps={{
            className:
              "bg-activityBlue px-2 py-2 text-black placeholder-gray-600 react-tagsinput-tag text-lg font-medium rounded-md ml-2",
            classNameRemove: "react-tagsinput-remove",
          }}
        />
        </div>
        {/* Bounty */}
          <Bounty value={bountyValue} onChange={setBountyValues} />
        <button
          onClick={onSubmitClick}
          className={`mt-6 bg-submitButton border-none outline-none py-2 px-3 ${
            submitting ? "cursor-not-allowed" : "cursor-pointer"
          } rounded-md outline-none text-lg font-bold text-white`}
        >
          {submitting ? (
            <div>
              <i className="fa fa-spinner fa-spin -ml-3 mr-2"></i>Creating ...
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
