import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const fetchAuctions = async () => {
  let auctions = [];

  try {
    let nextUrl = "/auctions/";

    while(nextUrl){
      const response = await api.get(nextUrl);
      const data = response.data;

      auctions = [...auctions, ...data.results];
      nextUrl = data.next;
    }

    return auctions;
  } catch (error) {
    console.error("Erro ao buscar leilões:", error.response?.data || error.message);
    throw error;
  }
};

export const createAuction = async (auctionData) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcyODA1ODYxLCJpYXQiOjE3NzI3MTk0NjEsImp0aSI6IjZlOTk4MGMxMjdhZTRhODc4N2Q0MTNlNWY2Y2ExYWRhIiwidXNlcl9pZCI6IjEifQ.pmt2f_9uiOWUqjdijk7LzuGptwsDquTzLAkNiE7zXDs";

    const response = await api.post("/auctions/", auctionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error creating auction", error.response?.data);
    throw error;
  }
};
