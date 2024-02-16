import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthWrapper = ({ children }) => {
  const useAxiosSetup = () => {
    const navigate = useNavigate();
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          error.response.data.message = "Sorry, you are unauthorized";
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  };
  useAxiosSetup();
  return children;
};
