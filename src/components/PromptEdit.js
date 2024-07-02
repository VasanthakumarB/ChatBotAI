import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PromptEdit() {
  const navigate = useNavigate(); // Navigation hook
  const { id } = useParams(); // Get ID from the route
  const [tempPrompt, setTempPrompt] = useState(null); // State to hold prompt data
  const [error, setError] = useState(null); // State for error handling

  // Fetch the prompt data when the component loads
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/prompt/view/${id}`);
        setTempPrompt(response.data.prompts); // Set the prompt data
      } catch (err) {
        console.error("Error fetching prompt:", err);
        setError("Failed to fetch prompt. Please try again.");
      }
    };

    fetchPrompt(); // Fetch prompt data
  }, [id]); // Re-run if ID changes

  // Handle form field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setTempPrompt((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission for updating the prompt
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/prompt/edit/${id}`,
        tempPrompt,
        {
          headers: {
            'Content-Type': 'application/json', // Ensure correct content type
          },
        }
      );

      if (response.status === 200) {
        toast.success("Prompt updated successfully!");
        navigate(`/`); // Navigate to the updated prompt detail page
      } else {
        console.error("Unexpected response:", response);
        setError("Error updating prompt.");
      }
    } catch (err) {
      console.error("Failed to update prompt:", err);
      setError(`Failed to update prompt: ${err.message}`);
    }
  };

  if (!tempPrompt) {
    return <div>Loading...</div>; // Loading indicator while fetching data
  }

  return (
    <div className="container">
      <h1>Edit Prompt</h1> {/* Page title */}
      <form onSubmit={handleSubmit}> {/* Form with onSubmit handler */}
        <div className="row"> {/* Bootstrap grid system */}
          <div className="col-12">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={tempPrompt.name || ""} // Fallback to empty string
              onChange={handleChange} // Handle field change
            />
          </div>
          <div className="col-12">
            <label htmlFor="group" className="form-label">Group</label>
            <input
              type="text"
              className="form-control"
              id="group"
              value={tempPrompt.group || ""} // Fallback to empty string
              onChange={handleChange} // Handle field change
            />
          </div>
          <div className="col-12">
            <label htmlFor="section" className="form-label">Section</label>
            <input
              type="text"
              className="form-control"
              id="section"
              value={tempPrompt.section || ""} // Fallback to empty string
              onChange={handleChange} // Handle field change
            />
          </div>
          <div className="col-12">
            <label htmlFor="prompt" className="form-label">Prompt</label>
            <input
              type="text"
              className="form-control"
              id="prompt"
              value={tempPrompt.prompt || ""} // Fallback to empty string
              onChange={handleChange} // Handle field change
            />
          </div>
          <div className="col-12">
            <label htmlFor="status" className="form-label">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              value={tempPrompt.status || ""} // Fallback to empty string
              onChange={handleChange} // Handle field change
            />
          </div>
        </div> {/* End of Bootstrap grid */}
        <button type="submit" className="btn btn-primary">Update</button> {/* Submit button */}
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error */}
      </form>
    </div>
  );
}
