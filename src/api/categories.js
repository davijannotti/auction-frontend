import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const fetchCategories = async () => {
  try {
    // Com Axios, você não precisa de 'response.json()'
    const response = await api.get("/categories/");
    
    // Os dados reais vindos do back estão sempre dentro de .data
    return response.data; 
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    throw error;
  }
};