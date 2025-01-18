import axios from "axios";

export const sendOTP = async (email) => {
  try {
    const { data } = await axios.post("/api/auth/login", { email });
    alert(data.message);
    return true;
  } catch (err) {
    alert(err.response.data.message);
    return false;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const { data } = await axios.post("/api/auth/verify-otp", { email, otp });
    return data;
  } catch (err) {
    alert(err.response.data.message);
    return null;
  }
};

