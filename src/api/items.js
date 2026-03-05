import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const fetchItems = async () => {
  try {
    const response = await api.get("/items/");

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar items:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const createItem = async (itemData) => {
  try {
    const formData = new FormData();

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcyODA1ODYxLCJpYXQiOjE3NzI3MTk0NjEsImp0aSI6IjZlOTk4MGMxMjdhZTRhODc4N2Q0MTNlNWY2Y2ExYWRhIiwidXNlcl9pZCI6IjEifQ.pmt2f_9uiOWUqjdijk7LzuGptwsDquTzLAkNiE7zXDs";

    const response = await api.post("/items/", itemData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error creating item", error.response?.data);
    throw error;
  }
};
