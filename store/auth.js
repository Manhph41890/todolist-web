export const state = () => ({
  user: null, // Lưu thông tin user
  token: null // Lưu token xác thực
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  LOGOUT(state) {
    state.user = null;
    state.token = null;
  }
};

export const actions = {
  async loginWithGoogle({ commit }) {
    try {
      // Gọi API backend để xác thực
      // const response = await this.$axios.$get("http://localhost:8080/api/auth/google");
      axios.get('http://127.0.0.1:8000/api/auth/google/callback')
        .then(response => {
          localStorage.setItem('auth_token', response.data.access_token);
          window.location.href = '/taskTitle'; // Chuyển đến trang sau khi đăng nhập
        })
        .catch(error => console.error(error));

      if (response.token) {
        commit("SET_USER", response.user);
        commit("SET_TOKEN", response.token);
        localStorage.setItem("auth_token", response.token); // Lưu token vào localStorage
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  },

  logout({ commit }) {
    commit("LOGOUT");
    localStorage.removeItem("auth_token"); // Xóa token khi đăng xuất
  }
};
