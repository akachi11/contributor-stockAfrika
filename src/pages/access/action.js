import axios from "axios";
import { returnErrorMessage } from "../../utils/errorManager";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signUp = async (data) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/user/contributor_sign_up/`,
      method: "POST",
      data,
    });
    return res.data;
  } catch (error) {
    return { status: "error", message: returnErrorMessage(error) };
  }
};