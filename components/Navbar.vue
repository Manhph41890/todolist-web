<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-custom">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <i class="bi bi-kanban me-2"></i>
        <span>Trello Clone</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link active" href="#"><i class="bi bi-grid me-1"></i> Bảng</a></li>
          <li class="nav-item"><a class="nav-link" href="#"><i class="bi bi-clock-history me-1"></i> Gần đây</a></li>
        </ul>
        <form class="d-flex me-3">
          <input class="form-control me-2" type="search" placeholder="Tìm kiếm" />
          <button class="btn btn-outline-light"><i class="bi bi-search"></i></button>
        </form>
        <div class="dropdown">
          <!-- Nếu chưa đăng nhập, hiển thị nút Đăng nhập -->
          <button v-if="!user" class="btn btn-secondary dropdown-toggle" type="button" id="userDropdown"
            @click="loginWithGoogle">
            <i class="bi bi-person-circle me-1"></i> Đăng nhập
          </button>

          <!-- Nếu đã đăng nhập, hiển thị avatar và tên -->
          <div v-else class="d-flex align-items-center">
            <img :src="user.avatar || 'https://via.placeholder.com/40'" alt="Avatar" class="rounded-circle me-2"
              width="40" height="40">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="userDropdown"
                data-bs-toggle="dropdown">
                {{ user.name }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#"><i class="bi bi-person-badge me-2"></i>Thông tin tài khoản</a>
                </li>
                <li><a class="dropdown-item" href="#" @click="logout"><i class="bi bi-box-arrow-right me-2"></i>Đăng
                    xuất</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapState("auth", ["user"]) // Lấy user từ Vuex Store
  },
  methods: {
    ...mapActions("auth", ["loginWithGoogle", "logout"]), // Gọi action từ Vuex

    loginWithGoogle() {
      window.location.href = "http://127.0.0.1:8080/api/auth/google/redirect";
    },
    async asyncData({ query, redirect, store }) {
      if (query.token) {
        localStorage.setItem('auth_token', query.token);

        // Gọi API để lấy user
        try {
          const response = await fetch("http://localhost:8080/api/auth/user", {
            headers: { Authorization: `Bearer ${query.token}` }
          });
          const data = await response.json();
          store.commit("auth/SET_USER", data.user);
        } catch (error) {
          console.error("Lỗi lấy user:", error);
        }

        return redirect('/');
      }
    }

  },
  mounted() {
    // Kiểm tra nếu đã có token thì lấy thông tin user
    const token = localStorage.getItem("auth_token");
    if (token) {
      this.$axios.$get("http://localhost:8080/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          this.$store.commit("auth/SET_USER", response.user);
        })
        .catch(() => {
          this.logout();
        });
    }
  }
};
</script>

<style scoped>
.rounded-circle {
  border: 2px solid #fff;
}
</style>