import axios from "axios";

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: "https://your-api-url.com",
  timeout: 10000, // Timeout after 10 seconds
});

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that falls within the range of 2xx will trigger this function
    return response;
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx will trigger this function
    if (error.response) {
      // Server responded with a status code other than 2xx
      console.error(
        `API Error: ${error.response.status} - ${error.response.data.message}`
      );
      return Promise.reject({
        status: error.response.status,
        message:
          error.response.data.message ||
          "Something went wrong. Please try again.",
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network error: No response from server");
      return Promise.reject({
        status: "NETWORK_ERROR",
        message: "Network error. Please check your internet connection.",
      });
    } else {
      // Something happened in setting up the request
      console.error("Error:", error.message);
      return Promise.reject({
        status: "REQUEST_ERROR",
        message: error.message,
      });
    }
  }
);

export default apiClient;
