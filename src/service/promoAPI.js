import axios from "axios";

const API_URL = "https://duwukjqwgtpvdfvudrcz.supabase.co/rest/v1/promos";
const API_KEY = "sb_publishable_GnJ3SiBSbMuXix0AF0f3lA_4-buJFMo";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const promoAPI = {
  // Ambil semua data promo
  async fetchPromos() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  // Tambah promo baru (Mengirim dalam bentuk Array sesuai standar Supabase)
  async createPromo(data) {
    const payload = Array.isArray(data) ? data : [data];
    const response = await axios.post(API_URL, payload, {
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
    });
    return response.data;
  },

  // Update data promo berdasarkan ID
  async updatePromo(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
    });
    return response.data;
  },

  // Hapus data promo berdasarkan ID
  async deletePromo(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers: headers,
    });
    return response.data;
  },
};