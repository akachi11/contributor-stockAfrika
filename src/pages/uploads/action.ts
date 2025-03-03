import axios from "axios";
import { returnErrorMessage } from "../../utils/errorManager";
import { getToken } from "../../services/AuthServices";
import { Stock } from "../../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const saveDraft = async (data: Stock) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    const formData = new FormData();
    formData.append("name", data.name!);
    formData.append("category", String(data.category));
    formData.append("explicit", String(data.explicit));
    formData.append("fileType", data.fileType!);
    formData.append("imgUrl", data.imgUrl!);
    formData.append("description", data.description!);
    formData.append("location", data.location!);
    formData.append("main_file", data.main_file!);
    formData.append("releaseForm", String(data.releaseForm));
    formData.append("type", data.type!);
    formData.append("usageType", data.usageType!);
    formData.append("user", String(data.user));
    data.keywords?.forEach((keyword) => {
      formData.append("keywords", keyword);  
    });

    const response = await axios.post(`${BASE_URL}/contributor/draft/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: returnErrorMessage(error),
    };
  }
};

export const createStock = async (data: Stock) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    const formData = new FormData();
    formData.append("name", data.name!);
    formData.append("category", String(data.category));
    formData.append("explicit", String(data.explicit));
    formData.append("fileType", data.fileType!);
    formData.append("imgUrl", data.imgUrl!);
    formData.append("description", data.description!);
    formData.append("location", data.location!);
    formData.append("main_file", data.main_file!);
    formData.append("releaseForm", String(data.releaseForm));
    formData.append("type", data.type!);
    formData.append("usageType", data.usageType!);
    formData.append("user", String(data.user));
    data.keywords?.forEach((keyword) => {
      formData.append("keywords", keyword);  
    });

    const response = await axios.post(`${BASE_URL}/contributor/stock/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: returnErrorMessage(error),
    };
  }
};

export const draftToStock = async (data: Stock) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    const response = await axios.post(`${BASE_URL}/contributor/draft_to_stock/`, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: returnErrorMessage(error),
    };
  }
};
