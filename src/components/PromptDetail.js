import React,{useEffect, useState} from 'react';
import { useParams,Link } from 'react-router-dom';

export default function PromptDetail() {
    const{Id}=useParams();
    const[prompts,setPrompts]=useState(null);

    useEffect(()=>{
        const url=`http://localhost:8000/api/v1/prompt/view/`+Id;
        console.log(url);
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>setPrompts(data.prompts))
    },[Id]);

    if(!prompts){
        return<div>Loading...</div>
    }

    return(
        <div className="prompt-detail">
          <h1>Prompt Detail</h1>
          <div>
            <strong>ID:</strong> #{prompts.prompt_Id}
          </div>
          <div>
            <strong>Name:</strong> {prompts.name}
          </div>
          <div>
            <strong>Prompt:</strong> {prompts.prompt}
          </div>
          <div>
            <strong>Group:</strong> {prompts.group}
          </div>
          <div>
            <strong>Section:</strong> {prompts.section}
          </div>
          <div>
            <strong>Status:</strong>
            <span className={
              prompts.status === 'active'
                ? 'text-success'
                : prompts.status === 'Cancelled'
                ? 'text-danger'
                : prompts.status === 'Pending'
                ? 'text-warning'
                : 'text-secondary'
            }>
              {prompts.status}
            </span>
          </div>
          <div>
            <Link to="/prompts">Back to Prompts</Link> {/* Link back to the list */}
          </div>
        </div>
      );
    
}