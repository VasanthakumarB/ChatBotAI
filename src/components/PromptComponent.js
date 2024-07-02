import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
  const [Prompts, setPrompts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPrompts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/prompts');

      if (!response.ok) {
        throw new Error('Failed to fetch Prompts');
      }

      const data = await response.json();
      setPrompts(data.connectors || []); // Ensure Prompts is an array
    } catch (err) {
      console.error('Error fetching Prompts:', err);
      setError('Error fetching Prompts');
    }
  };

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/prompt/del/${_id}`, {
        method: 'DELETE', // Correct HTTP method
      });

      if (res.ok) {
        // Update the state to remove the deleted item
        const updatedPrompts = Prompts.filter((prompt) => prompt._id !== _id);
        setPrompts(updatedPrompts); // Update the state with the new list

        toast.success("Record Deleted Successfully!");
      } else {
        toast.error("Error deleting record.");
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      toast.error(`Error deleting record: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchPrompts(); // Fetch data when component is mounted
  }, []); // Only run once on mount

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (<div className="classicTable">
    <button className="button"><Link to={`/prompt`}> New </Link></button>
    <div>
      <h1>Prompt</h1>
      <div className="classicTable">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PROMPT</th>
              <th>GROUP</th>
              <th>SECTION</th>
              <th>STATUS</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Prompts.length > 0 ? (
              Prompts.map((prompt) => (
                <tr key={prompt._id}>
                  <td>#{prompt.prompt_Id}</td>
                  <td><b>{prompt.name}</b></td>
                  <td><b>{prompt.prompt}</b></td>
                  <td><b>{prompt.group}</b></td>
                  <td><b>{prompt.section}</b></td>
                  <td>
                    <span className={
                      prompt.status === 'active'
                        ? 'text-success'
                        : prompt.status === 'Cancelled'
                        ? 'text-danger'
                        : prompt.status === 'Pending'
                        ? 'text-warning'
                        : 'text-secondary'
                    }>
                      {prompt.status}
                    </span>
                  </td>
                  <td>
                    <div className="button-group">
                      <div className="btn btn-light">
                        <Link to={`/prompt/edit/${prompt._id}`}>&#x270E;</Link> {/* Edit */}
                      </div>
                      <div className="btn btn-light">
                        <Link to={`/prompt/view/${prompt._id}`}>&#128065;</Link> {/* View */}
                      </div>
                      <div
                        className="btn btn-light"
                        onClick={() => handleDelete(prompt._id)} // Use a function to avoid immediate execution
                      >
                        🗑
                      </div> {/* Delete */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No prompts available</td> {/* Default message */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
