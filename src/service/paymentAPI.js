import axios from "axios";

const API_URL = "https://duwukjqwgtpvdfvudrcz.supabase.co/rest/v1/data_transaksi";
const API_KEY = "sb_publishable_GnJ3SiBSbMuXix0AF0f3lA_4-buJFMo";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const paymentAPI = {
  async fetchPayments() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createPayment(data) {
    const response = await axios.post(API_URL, data, {
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
    });
    return response.data;
  },

  // 1. Tambahkan fungsi UPDATE (Menggunakan HTTP PATCH)
  async updatePayment(id_transaksi, data) {
    const response = await axios.patch(`${API_URL}?id_transaksi=eq.${id_transaksi}`, data, {
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
    });
    return response.data;
  },

  // 2. Tambahkan fungsi DELETE (Menggunakan HTTP DELETE)
  async deletePayment(id_transaksi) {
    const response = await axios.delete(`${API_URL}?id_member=eq.${id_member}`, {
      headers: headers,
    });
    return response.data;
  },
};