import React, { useState } from "react";
import axios from "axios";
import ButtonAppBar from "./Appbar";

function CreateCourse() {

  
  const backgroundImages = [
    "../src/images/admin_createcourse.png",
    
  ];

  const getRandomBackground = () => {
    return backgroundImages[0];
  };

  const backgroundImage = getRandomBackground();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageLink(e.target.value);
  };

  const handlePublishedChange = (e) => {
    setPublished(e.target.value);
  };

  const handleCreateCourse = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.post(
          "http://localhost:3000/admin/courses",
          {
            title: title,
            description: description,
            price: price,
            imageLink: imageLink,
            published: published,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.message); // Display success message
        // Additional actions upon successful course creation
      } else {
        console.log("Token not found in localStorage"); // Log an error if token is not found
        // Handle the case where the user is not authenticated
      }
    } catch (error) {
      console.error("Error creating course:", error.message);
      // Display error message or perform error handling
    }
  };

  return (
    <div>
      <ButtonAppBar/>
    <div style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "80vh",
    padding: "100px"}}>
      
  
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div
        style={{
          background: "#ffffff",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "40px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 style={{  marginBottom: "20px", textAlign: "center" ,textShadow:"2px 2px 4px rgba(0, 0, 0, 0.4)" ,fontSize:"50px" }}>Create Course</h1>
        <form style={{ display: "grid", gap: "20px" }}>
          <label>
           
            < span style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" ,textShadow:"2px 2px 4px rgba(0, 0, 0, 0.4)" }}> Title:</span>
            <br/>
            <input type="text" value={title} onChange={handleTitleChange} style={
        { width: "100%",
         padding: "10px", 
         marginBottom: "10px",
          border: "1px solid #ccc",
           borderRadius: "5px" }
        
        }/>
          </label>
          <label>
          < span style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" ,textShadow:"2px 2px 4px rgba(0, 0, 0, 0.4)" }}> Description:</span>
            <br/>
            <input type="text" value={description} onChange={handleDescriptionChange}  style={
        { width: "100%",
         padding: "10px", 
         marginBottom: "10px",
          border: "1px solid #ccc",
           borderRadius: "5px" }
        
        }/>
          </label>
          <label>
          < span style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" ,textShadow:"2px 2px 4px rgba(0, 0, 0, 0.4)" }}> Price:</span>
            <br/>
            <input type="text" value={price} onChange={handlePriceChange} style={
        { width: "100%",
         padding: "10px", 
         marginBottom: "10px",
          border: "1px solid #ccc",
           borderRadius: "5px" }
        
        } />
          </label>
          <label>
          < span style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" ,textShadow:"2px 2px 4px rgba(0, 0, 0, 0.4)" }}> Imagelink:</span>
            <br/>
            <input type="text" value={imageLink} onChange={handleImageChange} style={
        { width: "100%",
         padding: "10px", 
         marginBottom: "10px",
          border: "1px solid #ccc",
           borderRadius: "5px" }
        
        }/>
          </label>
          <label>
          < span style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" ,textShadow:"2px 2px 4px rgba(0, 0, 0, 0.4)" }}> Published:</span>
            <br/>
            <input type="text" value={published} onChange={handlePublishedChange} style={
        { width: "100%",
         padding: "10px", 
         marginBottom: "10px",
          border: "1px solid #ccc",
           borderRadius: "5px" }
        
        } />
          </label>
          <button
            onClick={handleCreateCourse}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              background: "#007bff",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}

export default CreateCourse;
