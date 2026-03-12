import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const fetchCategories = async () => {
  let categories = [];

  try {
    let nextUrl = "/categories/";

    while(nextUrl){
      const response = await api.get(nextUrl);
      const data = response.data;

      categories = [...categories, ...data.results];
      nextUrl = data.next;
    }

    return categories;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error.response?.data || error.message);
    throw error;
  }
};