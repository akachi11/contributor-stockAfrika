import axios from "axios";
import { baseAPI } from "../../utils/apiUrls";
import { SignUpArgs, SignUpResponse } from "../../types";

export const signUp = async ({ data, isModel }: SignUpArgs): Promise<SignUpResponse> => {
  const endpoint = isModel ? "/user/model_sign_up/" : "/user/contributor_sign_up/";

  try {
    const res = await axios.post(`${baseAPI}${endpoint}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
