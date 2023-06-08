import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8800",
})

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const {data} = await api.post("/api/auth/login", userCredential);
    console.log(data);
    if(data.success) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
    } else {
      dispatch({ type: "LOGIN_FAILURE", payload: data.reason });
    }
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
