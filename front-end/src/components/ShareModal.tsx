import React, { useEffect } from "react";
import CloseIcon from "../icons/CloseIcon";
import Button from "./Button";
import CopyIcon from "../icons/CopyIcon";
import Caution from "../icons/Caution";
import { hashKey, useMutation } from "@tanstack/react-query";
import { PostBrain } from "../api/endPoints";

interface ShareModalType{
  isToggle?:boolean,
  handleShareToggle?:()=>void
}

function ShareModal({isToggle,handleToggle}:ShareModalType) {
  const mutation =useMutation({
    mutationFn:PostBrain,
    onSuccess:async(data)=>{
      if(data.isCreated){
      await navigator.clipboard.writeText(data.link)
      handleToggle()
    }
    }
  })

  function handleBlockShare(){
    mutation.mutate({
      share:false
    })
  }

  function handleCopy(){
    mutation.mutate({
      share:true
    })
  }
  return (
    <>
    {isToggle && <>
     <div onClick={handleToggle} className='fixed z-1 w-full min-h-screen bg-slate-300 opacity-60'>
    </div>
      <div className="h-md w-sm z-2  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/25 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[12.5px] border border-white/20  rounded-md p-5 fixed">
      <div className="text-start flex justify-between">
        <h2 className="text-lg font-medium">Share Your Second Brain</h2>
        <span className="coursor-pointer" onClick={handleToggle}>
        <CloseIcon/>
        </span>
      </div>
      <div className="mt-3 w-full">
      <p className="tracking-tighter text-gray-500">Share your entire collection of notes, documents, tweets and videos with others. They'll be able to import your content into their own Second Brain.</p>
      </div>
      <div className="mt-3  text-nowrap flex flex-col gap-1">
        <Button startIcon={<CopyIcon/>} onClick={handleCopy} size="xl" variant="primary" text="Share Brain"/>
        <Button startIcon={<Caution/>} onClick={handleBlockShare} size="xl" variant="secondary" text="Stop Sharing"/>
      </div>
    </div>
    </>
  }
    </>
  );
}

export default ShareModal;
