import React, { useState } from "react";
import axios from "axios";
import ButtonAppBar from "./Appbar";
import { useParams, useNavigate } from "react-router-dom";

function CourseUpdate() {
  const navigate = useNavigate();
  const { keys } = useParams();

  const backgroundImages = ["../src/images/admin_createcourse.png"];

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

  const handleUpdateCourse = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const token = localStorage.getItem("token");

      if (token) {
        if (title || description || price || imageLink || published) {
          const updateData = {
            title,
            description,
            price,
            imageLink,
            published,
          };

          const response = await axios.put(
            `http://localhost:3000/admin/courses/${keys}`,
            updateData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response.data.message);
          navigate("/update");
        } else {
          console.log("Invalid input");
        }
      } else {
        console.log("Token not found in localStorage");
      }
    } catch (error) {
      console.error("Error updating course:", error.message);
    }
  };

  return (
    <div>
      <ButtonAppBar />

      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "80vh",
          padding: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
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
            <h1
              style={{
                marginBottom: "20px",
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                fontSize: "50px",
              }}
            >
              Update Courses
            </h1>
            <form style={{ display: "grid", gap: "20px" }} onSubmit={handleUpdateCourse}>
              <label>
                <span
                  style={{
                    fontSize: "24px",
                    marginBottom: "20px",
                    textAlign: "center",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Title:
                </span>
                <br />
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </label>
              <label>
                <span
                  style={{
                    fontSize: "24px",
                    marginBottom: "20px",
                    textAlign: "center",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Description:
                </span>
                <br />
                <input
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </label>
              <label>
                <span
                  style={{
                    fontSize: "24px",
                    marginBottom: "20px",
                    textAlign: "center",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Price:
                </span>
                <br />
                <input
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </label>
              <label>
                <span
                  style={{
                    fontSize: "24px",
                    marginBottom: "20px",
                    textAlign: "center",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Imagelink:
                </span>
                <br />
                <input
                  type="text"
                  value={imageLink}
                  onChange={handleImageChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </label>
              <label>
                <span
                  style={{
                    fontSize: "24px",
                    marginBottom: "20px",
                    textAlign: "center",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Published:
                </span>
                <br />
                <input
                  type="text"
                  value={published}
                  onChange={handlePublishedChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </label>

              <button
                type="submit"
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
                Update Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseUpdate;
