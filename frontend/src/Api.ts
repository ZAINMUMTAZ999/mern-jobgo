import { registerUserTypes } from "./pages/Register";
import { AddJobTypes } from "../../backend/src/models/addJob.models";
import { jobSearchResponse } from "../../backend/src/routes/loginRouter";
// const Base_Url_API = import.meta.env.VITE_API_BSE_URL || "";
// const Base_Url_API = import.meta.env.PROD 
//   ? '/.netlify/functions/api'
//   : '/api';
const Base_Url_API = import.meta.env.PROD 
  ? '/api' 
  : import.meta.env.FRONTEND_URL;

  type loginUserTypes = {
    email: string;
    password: string;
  };
  console.log(Base_Url_API)
const registerApi = async (formDatajson: registerUserTypes) => {
  const response = await fetch(`${Base_Url_API}/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDatajson),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
// http://localhost:8000/api/login
const loginApi = async (formDatajson: loginUserTypes) => {
  const response = await fetch(`${Base_Url_API}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDatajson),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    console.log("login Api 30");
    throw new Error("login Error Api");
  }
  console.log("response:", responseBody);
  return responseBody;
};

const validateToken = async () => {
  const response = await fetch(`${Base_Url_API}/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("fetch validate-token");
  }
  return await response.json();
};
const LogoutApi = async () => {
  const response = await fetch(`${Base_Url_API}/logout`, {
    credentials: "include",
    method: "POST",
 
  });
  if (!response.ok) {
    throw new Error("logout api not fetch");
  }
  return response.json();
};

const AddJobApi = async (formData: FormData) => {
  // const formData = new FormData();
  // formData.append("imageFile", file);

  const response = await fetch(`${Base_Url_API}/addJob`, {
    method: "POST",
    credentials: "include",
    // headers:{
    //   "Content-Type": "multipart/form-data",
    // },
    body: formData, // Automatically sets the Content-Type
  });

  if (!response.ok) {
    throw new Error("JobApi not fetched");
  }

  console.log("apiJobPostResponse", response);
  return await response.json();
};
const deleteJobApi = async (jobId: string) => {
  const response = await fetch(`${Base_Url_API}/jobDelete/${jobId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
    // No body needed for simple deletion by ID
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete job");
  }

  return await response.json();
};

// const AllJobsFetcing = async (): Promise<AddJobTypes[]> => {
//   const response = await fetch(`${Base_Url_API}/allJobs`, {
//     credentials: "include",
//   });

//   if (!response.ok) {
//     throw new Error("JobApi not fetched");
//   }
//   return response.json();
// };
// const AllUserFetcing = debounce(async ():Promise<registerUserTypes>  => {
//   const response = await fetch(`${Base_Url_API}/userInfo`, {
//     credentials:"include",
//   });

//   if (!response.ok) {
//     throw new Error("JobApi not fetched");
//   }
//   return response.json();
// },2000);

const AllUserFetching = async (): Promise<registerUserTypes> => {
  const response = await fetch(`${Base_Url_API}/userInfo`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("JobApi not fetched");
  }

  const data = await response.json();
  return data || { user: null };
};
const JobFetching = async (): Promise<AddJobTypes> => {
  const response = await fetch(`${Base_Url_API}/jobs`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("JobApi not fetched");
  }

  const data = await response.json();
  return data || { user: null };
};

const dashboardApi = async (): Promise<AddJobTypes> => {
  const response = await fetch(`${Base_Url_API}/dashboard`, {
    credentials: "include",
    

  });

  if (!response.ok) {
    throw new Error("JobApi not fetched");
  }

  const data = await response.json();
  return data || { user: null };
};

const updateMyProfileById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${Base_Url_API}/UpdateUser`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

type searchParams = {
  jobTitle?: string;
  companysIndustry?: string;
  jobLocation?: string;

  starRating?: string[];
  salary?: string;
  sortOption?: string;
  page?: string;
};
const searchPage = async (
  searchParams: searchParams
): Promise<jobSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("jobTitle", searchParams.jobTitle || "");
  queryParams.append("jobLocation", searchParams.jobLocation || "");
  queryParams.append("companysIndustry", searchParams.companysIndustry || "");
  // queryParams.append("starRating",searchParams.starRating  || "");
  // queryParams.append("salary", searchParams.salary || "");
  // queryParams.append("salary", searchParams.salary || "");
queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.starRating?.forEach((star) =>
    queryParams.append("starRating", star)
  );

  queryParams.append("page", searchParams.page || "");
  try {
    const repsonse = await fetch(`${Base_Url_API}/search?${queryParams}`);
    if (!repsonse.ok) {
      throw new Error("Something Went Wrong!");
    }
    return repsonse.json();
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
console.log(searchPage);

export {
  registerApi,
  loginApi,
  validateToken,
  LogoutApi,
  AddJobApi,
  deleteJobApi,
  JobFetching,
  AllUserFetching,
  updateMyProfileById,
  dashboardApi,
  searchPage,
};
