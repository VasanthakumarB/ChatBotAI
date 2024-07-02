import { useState } from 'react';
import './Home.css';
import PromptComponent from '../components/PromptComponent';
import InsightComponent from '../components/InsightComponent';

export default function Home() {
  const [promptviewForm, setPromptViewForm] = useState(false);
  const [insightviewForm, setInsightViewForm] = useState(false);

  const handleViewPrompt = () => {
    setPromptViewForm(true);
    setInsightViewForm(false);
  };

  const handleViewInsight = () => {
    setPromptViewForm(false);
    setInsightViewForm(true);
  };

  return (
    <div className="container"> {/* Use the updated container class */}
      <div className="button-group"> {/* Group buttons with even spacing */}
        <button className="button" onClick={handleViewPrompt}>Prompt</button> {/* Use new button styling */}
        <button className="button" onClick={handleViewInsight}>Insight</button>
      </div>

      <div> {/* Conditional rendering based on state */}
        {promptviewForm ? (
          <PromptComponent />
        ) : insightviewForm ? (
          <InsightComponent />
        ) : (
          <div>No component selected</div> 
        )}
      </div>
    </div>
  );
}
