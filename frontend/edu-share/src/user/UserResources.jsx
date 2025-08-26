import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserResources() {
  const { group_id: groupId } = useParams();

  console.log(groupId)
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  // fetch resources
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/groups/${groupId}/resources`)
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
        `${import.meta.env.VITE_API_BASE_URL}/groups/${groupId}/resources`,
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
        `${import.meta.env.VITE_API_BASE_URL}/groups/${groupId}/resources/${resourceId}`
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

</div>

      
      {/* Resource list */}
      <ul>
        
        {resources.map((res) => (
          <li
            key={res._id}
            className="flex items-center justify-between border p-3 mb-2 rounded-lg"
          >
           <a 
  href={`${import.meta.env.VITE_API_BASE_URL}${res.fileUrl}`} 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-gray-500 hover:text-gray-600 underline"
>
  {res.title}
</a>

            
          </li>
        ))}
      </ul>
    
    </div>
  );
}
