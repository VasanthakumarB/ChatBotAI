import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PromptList from './components/PromptComponent';
import NewPrompt from './components/NewPromptComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PromptDetail from './components/PromptDetail';
import InsightDetail from './components/InsightDetail';
import PromptEdit from './components/PromptEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer theme="dark" position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prompts" element={<PromptList />} />
          <Route path="/prompt" element={<NewPrompt />} />
          <Route path="/prompt/view/:Id" element={<PromptDetail />} />
          <Route path="/insight/view/:Id" element={<InsightDetail />} />
          <Route path="/prompt/edit/:id" element={<PromptEdit />} /> {/* Fix the 'Path' to 'path' */}
          {/* Additional routes here */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
