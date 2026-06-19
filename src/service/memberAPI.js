import axios from "axios";

const API_URL = "https://duwukjqwgtpvdfvudrcz.supabase.co/rest/v1/data_member";
const API_KEY = "sb_publishable_GnJ3SiBSbMuXix0AF0f3lA_4-buJFMo";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const memberAPI = {
  async fetchMembers() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createMember(data) {
    const response = await axios.post(API_URL, data, {
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
    });
    return response.data;
  },

  // 1. Tambahkan fungsi UPDATE (Menggunakan HTTP PATCH)
  async updateMember(id_member, data) {
    const response = await axios.patch(`${API_URL}?id_member=eq.${id_member}`, data, {
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
    });
    return response.data;
  },

  // 2. Tambahkan fungsi DELETE (Menggunakan HTTP DELETE)
  async deleteMember(id_member) {
    const response = await axios.delete(`${API_URL}?id_member=eq.${id_member}`, {
      headers: headers,
    });
    return response.data;
  },
};