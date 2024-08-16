import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    gender: "",
    skills: [],
    language: "",
    birthDate: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        skills: checked
          ? [...prevData.skills, value]
          : prevData.skills.filter((skill) => skill !== value),
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        resume: file,
      }));
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        resume: file,
      }));
    }
  };

  const handleDivClick = () => {
    document.getElementById("file-input").click();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required.";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required.";
    }
    if (!formData.bio || formData.bio.length < 10) {
      newErrors.bio = "Bio should be at least 10 characters.";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender selection is required.";
    }
    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill must be selected.";
    }
    if (!formData.language) {
      newErrors.language = "Language selection is required.";
    }
    if (!formData.birthDate || new Date(formData.birthDate) > new Date()) {
      newErrors.birthDate = "Birth date cannot be in the future.";
    }
    if (!formData.resume) {
      newErrors.resume = "Resume is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate("/preview", { state: { formData } });
    }
  };

  return (
    <div
      className="max-w-lg mx-auto p-6 mt-6 bg-white border border-gray-300 rounded-lg shadow-md"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-xl font-semibold mb-4 text-black">First Name:</h2>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.firstName && (
        <p className="text-black mb-4">{errors.firstName}</p>
      )}

      <h2 className="text-xl font-semibold mb-4 text-black">Last Name:</h2>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.lastName && <p className="text-black mb-4">{errors.lastName}</p>}

      <h2 className="text-xl font-semibold mb-4 text-black">About:</h2>
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="About You"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      {errors.bio && <p className="text-black mb-4">{errors.bio}</p>}

      <h2 className="text-xl font-semibold mb-4 text-black">Gender:</h2>
      <div className="mb-4">
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            checked={formData.gender === "Male"}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 text-black">Male</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            checked={formData.gender === "Female"}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 text-black">Female</span>
        </label>
      </div>
      {errors.gender && <p className="text-black mb-4">{errors.gender}</p>}

      <h2 className="text-xl font-semibold mb-4 text-black">Good In:</h2>
      <div className="mb-4">
        <label className="inline-flex items-center mr-6">
          <input
            type="checkbox"
            name="skills"
            value="Frontend"
            onChange={handleChange}
            checked={formData.skills.includes("Frontend")}
            className="form-checkbox text-blue-600"
          />
          <span className="ml-2 text-black">Frontend</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="skills"
            value="Backend"
            onChange={handleChange}
            checked={formData.skills.includes("Backend")}
            className="form-checkbox text-blue-600"
          />
          <span className="ml-2 text-black">Backend</span>
        </label>
      </div>
      {errors.skills && <p className="text-black mb-4">{errors.skills}</p>}

      <h2 className="text-xl font-semibold mb-4 text-black">Language:</h2>
      <select
        name="language"
        value={formData.language}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
      </select>
      {errors.language && <p className="text-black mb-4">{errors.language}</p>}

      <h2 className="text-xl font-semibold mb-4 text-black">Birth Date:</h2>
      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.birthDate && (
        <p className="text-black mb-4">{errors.birthDate}</p>
      )}

      <h2 className="text-xl font-semibold mb-4 text-black">Resume:</h2>
      <div
        className="w-full h-12 border border-gray-300 rounded-md flex items-center justify-center bg-gray-100 text-black cursor-pointer"
        onClick={handleDivClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {formData.resume ? (
          <p className="text-center">{formData.resume.name}</p>
        ) : (
          <p className="text-center">
            Drag and drop your file here or click to upload
          </p>
        )}
        <input
          type="file"
          id="file-input"
          name="resume"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
      {errors.resume && <p className="text-black mb-4">{errors.resume}</p>}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
