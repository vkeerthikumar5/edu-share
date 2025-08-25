import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function UserAboutGroup() {
  const { group_id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
        try {
            let res = await axios.get(`http://localhost:5000/group_info/${group_id}`);
            setGroup(res.data.info);
            console.log(res);
        } catch(err) {
            console.log(err.message);
        }
    };

    fetchGroup();
  }, [group_id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(group.joinCode);
    alert("Join code copied!");
  };

  if (!group) return (<p>Loading...</p>);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-2">{group.name}</h2>
      <p className="text-gray-700 mb-4">{group.description}</p>

      <div className="mb-4">
        <span className="font-semibold">Join Code:</span>
        <span className="ml-2 bg-gray-100 px-2 py-1 rounded">{group.joinCode}</span>
        <button
          onClick={copyToClipboard}
          className="ml-2 px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Copy
        </button>
      </div>

      <p>
        <span className="font-semibold">Members:</span>{" "}
        {group.members?.length || 0}
      </p>
      <p>
        <span className="font-semibold">Created At:</span>{" "}
        {new Date(group.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
