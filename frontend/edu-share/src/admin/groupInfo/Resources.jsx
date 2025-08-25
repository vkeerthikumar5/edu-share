import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Resources() {
  const { group_id: groupId } = useParams();

  console.log(groupId)
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  // fetch resources
  useEffect(() => {
    axios
      .get(`http://localhost:5000/groups/${groupId}/resources`)
      .then((res) => {
        setResources(Array.isArray(res.data) ? res.data : res.data.resources || []);
      })
      .catch((err) => console.error(err));
  }, [groupId]);

  // handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // add resource
  const handleAddResource = async () => {
    if (!title || !file) {
      alert("Please enter a title and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const res = await axios.post(
        `http://localhost:5000/groups/${groupId}/resources`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResources(Array.isArray(res.data) ? res.data : res.data.resources || []);
      setTitle("");
      setFile(null);
      document.getElementById("dropzone-file").value = ""; // reset input
    } catch (err) {
      console.error(err);
      alert("Failed to upload resource.");
    }
  };

  // delete resource
  const handleDelete = async (resourceId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/groups/${groupId}/resources/${resourceId}`
      );
      setResources(Array.isArray(res.data) ? res.data : res.data.resources || []);
    } catch (err) {
      console.error(err);
      alert("Failed to delete resource.");
    }
  };

  return (
    <div>
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Group Resources</h2>

      {/* Title input */}
      <input
        type="text"
        className="border rounded p-2 w-full mb-3"
        placeholder="Enter document title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
</div>
      {/* Dropzone */}
      <div className="flex items-center justify-center w-full mb-3">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, PDF, DOCX (Max 10MB)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {file && (
        <p className="text-sm text-gray-600 mb-2">
          Selected file: <span className="font-medium">{file.name}</span>
        </p>
      )}

      <button
        onClick={handleAddResource}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mb-6"
      >
        Upload Resource
      </button>

      {/* Resource list */}
      <ul>
        {resources.map((res) => (
          <li
            key={res._id}
            className="flex items-center justify-between border p-3 mb-2 rounded-lg"
          >
           <a 
  href={`http://localhost:5000${res.fileUrl}`} 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-gray-500 hover:text-gray-600 underline"
>
  {res.title}
</a>

            <button
              onClick={() => handleDelete(res._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    
    </div>
  );
}
