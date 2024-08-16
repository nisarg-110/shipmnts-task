import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};

  const handleEdit = () => {
    navigate("/", { state: { formData } });
  };

  const handleSubmit = () => {
    navigate("/submitted");
  };

  return (
    <div className="p-4 max-w-lg mx-auto mt-4 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-black">Preview:</h2>
      <div className="mb-4">
        <strong>First Name:</strong> {formData.firstName}
      </div>
      <div className="mb-4">
        <strong>Last Name:</strong> {formData.lastName}
      </div>
      <div className="mb-4">
        <strong>Bio:</strong> {formData.bio}
      </div>
      <div className="mb-4">
        <strong>Gender:</strong> {formData.gender}
      </div>
      <div className="mb-4">
        <strong>Skills:</strong> {formData.skills.join(", ")}
      </div>
      <div className="mb-4">
        <strong>Language:</strong> {formData.language}
      </div>
      <div className="mb-4">
        <strong>Birth Date:</strong> {formData.birthDate}
      </div>
      <div className="mb-4">
        <strong>Resume:</strong>{" "}
        {formData.resume ? formData.resume.name : "No file uploaded"}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={handleEdit}
      >
        Edit
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Preview;
