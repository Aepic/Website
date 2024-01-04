import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Post from "../components/post";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      if (cookies.token) {
        const { data } = await axios.get("http://localhost:5000/current-user", {
          withCredentials: true,
        });
        const { status, username, userId } = data;
        if (status) {
          setUsername(username);
          setUserId(userId);
          setIsLoggedIn(true);
          toast(`Hello ${username}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
        }
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        {isLoggedIn ? (
          <>
            <h4>
              Welcome <span>{username}</span>
            </h4>
            <button onClick={Logout}>Logout</button>
          </>
        ) : (
          <h4>
            Welcome, guest! <a href="/login">Login</a> to be able to like, post, and comment!
          </h4>
        )}
      </div>
      <Post />
      <ToastContainer />
    </>
  );
};

export default Home;
