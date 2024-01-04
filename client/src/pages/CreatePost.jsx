import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreatePost = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      } else {
        const { data } = await axios.get("http://localhost:5000/current-user", {
          withCredentials: true,
        });
        const { status, username, userId } = data;
        if (status) {
          setUsername(username);
          setUserId(userId);
        } else {
          removeCookie("token");
          navigate("/login");
        }
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const [inputValue, setInputValue] = useState({
    prompt: "",
  });

  const { prompt } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
        ...inputValue,
        userId: userId,
      });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/posts",
        {
          ...inputValue,
          userId: userId,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      prompt: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Create a Post!</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="prompt">Prompt</label>
            <input
                type="textvox"
                name="prompt"
                value={prompt}
                placeholder="Enter your prompt"
                onChange={handleOnChange}
            />
        </div>
        <button type="submit">Post</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;