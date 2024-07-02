import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Navigation
import axios from 'axios';
import { toast } from 'react-toastify'; // Toast notifications

export default function NewPromptComponent() {
  const navigate = useNavigate();
  const [Prompts, setPrompts] = useState({
    name: '',
    group: '',
    section: '',
    prompt: '',
    status: ''
  }); // Properly initialized state

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPrompts((prev) => ({
      ...prev,
      [id]: value, // Correct update of the state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const url = 'http://localhost:8000/api/v1/prompt'; // Endpoint

    try {
      const response = await axios.post(url, Prompts, {
        headers: {
          'Content-Type': 'application/json', // Correct headers
        },
      });

      if (response.status === 201) { // Status for successful creation
        toast.success('Prompt created successfully!', {
          position: 'top-center',
          autoClose: 5000,
        });
        navigate('/'); // Redirect after success
      } else {
        throw new Error('Unexpected response status'); // Handle unexpected status
      }
    } catch (err) {
      console.error('Failed to create prompt:', err); // Log errors
      setError(`Failed to create prompt: ${err.message}`); // Set error message
    }
  };

  return (
    <div className="row g-3 test"> {/* Use descriptive class names */}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <h1>Create New Prompt</h1> {/* Title */}
        </div>
        <div className="col-md-12">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter prompt name"
            value={Prompts.name} // Use state value
            onChange={handleChange} // Handle changes
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="group" className="form-label">Group</label>
          <input
            type="text"
            className="form-control"
            id="group"
            placeholder="Enter group"
            value={Prompts.group} // Use state value
            onChange={handleChange} // Handle changes
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="section" className="form-label">Section</label>
          <input
            type="text"
            className="form-control"
            id="section"
            placeholder="Enter section"
            value={Prompts.section} // Use state value
            onChange={handleChange} // Handle changes
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="prompt" className="form-label">Prompt</label>
          <input
            type="text"
            className="form-control"
            id="prompt"
            placeholder="Enter prompt"
            value={Prompts.prompt} // Use state value
            onChange={handleChange} // Handle changes
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="status" className="form-label">Status</label>
          <input
            type="text"
            className="form-control"
            id="status"
            placeholder="Enter status"
            value={Prompts.status} // Use state value
            onChange={handleChange} // Handle changes
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Save</button> {/* Correct button type */}
        </div>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      </form>
    </div>
  );
}
