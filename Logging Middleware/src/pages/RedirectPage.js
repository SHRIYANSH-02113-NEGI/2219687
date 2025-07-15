import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RedirectPage = () => {
  const { code } = useParams();
  const API = process.env.REACT_APP_API_BASE;
  const token = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    const resolve = async () => {
      try {
        const res = await axios.get(`${API}/url/resolve/${code}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        window.location.href = res.data.originalUrl;
      } catch (e) {
        alert("Redirect failed");
      }
    };
    resolve();
  }, [code]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
