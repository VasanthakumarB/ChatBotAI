import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation within the app
import { toast } from 'react-toastify';

export default function Home() {
  const [Prompts, setPrompts] = useState([]); // Initialize with an empty array
  const [error, setError] = useState(null); // State for error handling

  // Function to fetch prompts from the API
  const fetchPrompts = async () => {
    const url = 'http://localhost:8000/api/v1/insight'; // Adjust the endpoint as needed
    try {
      const response = await fetch(url, {
        cache: 'no-cache', // Avoid caching issues
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Prompts');
      }

      const data = await response.json(); // Parse the JSON response
      setPrompts(data.insight || []); // Ensure prompts is an array
    } catch (err) {
      console.error('Error fetching Prompts:', err);
      setError('Error fetching Prompts'); // Set error state for error handling
    }
  };

  
  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/insight/del/${_id}`, {
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

  const handleInsightDel=()=>{
    fetchPrompts();
  }
  // Fetch data when the component is mounted
  useEffect(() => {
    fetchPrompts();
  }, []); // Only run once on mount

  if (error) {
    return <div>Error: {error}</div>; // Display error message if an error occurs
  }

  return (
    <div>
      <h1>Insight</h1>
      <div className="classicTable">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PROMPT</th>
              <th>SECTION</th>
              <th>GROUP</th>
              <th>STATUS</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Prompts.length > 0 ? (
              Prompts.map((prompt) => (
                <tr key={prompt._id}> {/* Ensure a unique key */}
                  <td>#{prompt.insight_Id}</td>
                  <td><b>{prompt.name}</b></td>
                  <td><b>{prompt.prompt}</b></td>
                  <td><b>{prompt.section}</b></td>
                  <td><b>{prompt.group}</b></td>
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
                        <Link to={`/insight/view/${prompt._id}`}>&#128065;</Link> {/* View */}
                      </div>
                      <div className="btn btn-light" onClick={()=> handleDelete(prompt._id)} onDelete={handleInsightDel}>🗑</div> {/* Delete */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No prompts available</td> {/* Default message when no prompts */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
