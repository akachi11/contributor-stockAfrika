import axios from "axios";
import { returnErrorMessage } from "../../utils/errorManager";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { getToken } from "../../services/AuthServices";

export const editProfile = async (data) => {
  try {
    const res = await axios({
      url: `${BASE_URL}/user/contributor_edit_profile/`,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
      method: "PUT",
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error)
    return { status: "error", message: returnErrorMessage(error) };
  }
};
