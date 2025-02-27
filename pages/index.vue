<template>
  <div id="container">
      <div class="overlay">
          <Navbar />
          <div class="container-fluid py-3">
              <h4 class="text-white board-title mb-3">{{ boardTitle }}</h4>
              <div class="board-lists d-flex flex-nowrap align-items-start">
                  <div v-for="(title, index) in task" :key="index" class="trello-list">
                      <div class="d-flex justify-content-between align-items-center">
                          <h6>{{ title.title }}</h6>
                          <DropdownMenu :taskId="title.id" @delete="deleteTitle" />
                      </div>
                      <div class="trello-card" v-for="(todo, i) in title.todolists" :key="i">

                          <a class="d-flex justify-content-between align-items-center mb-1 btn"
                              @click="isModalOpen = true; selectedTodo = todo" style="cursor: pointer;">
                              <span>{{ todo.title }}</span>
                          </a>
                          <span class=" trello-label" style="min-width: 5px;"></span>

                      </div>
                      <TodolistModal :todo="selectedTodo" :showModal="isModalOpen" @close="isModalOpen = false" />

                      <AddTodo :titleId="title.id" @taskAdded="fetchTitle" />

                  </div>
                  <div class="trello-list d-flex align-items-center justify-content-center"
                      style="background-color: rgba(255, 255, 255, 0.4)">
                      <div v-if="!isAddingList">
                          <button class="add-list-btn" @click="isAddingList = true">
                              <i class="bi bi-plus-lg"></i> Thêm danh sách khác
                          </button>
                      </div>

                      <div v-else class="add-list-form">
                          <input type="text" class="form-control mb-2" v-model="newTitle.title"
                              placeholder="Nhập tiêu đề danh sách" />
                          <div class="d-flex">
                              <button class="btn btn-primary btn-sm me-2" @click="addTitle">Thêm danh
                                  sách</button>
                              <button class="btn btn-sm" @click="cancelAddList"><i class="bi bi-x-lg"></i>
                              </button>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </div>
  </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue';
import AddTodo from '@/components/AddTodo.vue';
import TodolistModal from '@/components/TodolistModal.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';

export default {
  components: { Navbar, DropdownMenu, AddTodo, TodolistModal },
  props: {
      todo: Object, // Nhận danh sách thẻ từ component cha
      showModal: Boolean,
  },
  data() {
      return {
          isModalOpen: false,
          selectedTodo: null,
          boardTitle: "Trello ",
          isAddingList: false,
          task: [],
          newTitle: {
              title: '',
          },
          errors: {},
      };
  },
  mounted() {
      this.fetchTitle()
      console.log('Component mounted.', this.$axios.titletasks);
  },
  methods: {
      async fetchTitle() {
          try {
              const response = await this.$axios.titletasks.getList();
              console.log('API Response (Fetch):', response);

              // Kiểm tra cấu trúc response
              if (response.status === 'success' && response.data && Array.isArray(response.data)) {
                  this.task = response.data; // Gán dữ liệu vào this.todo
              } else {
                  throw new Error('Định dạng response không hợp lệ');
              }
          } catch (error) {
              console.error('Lỗi khi tải tasks:', error);
              this.$toast.error(`Lỗi khi tải tasks: ${error.message}`);
          }
      },
      async addTitle() {
          try {
              const response = await this.$axios.titletasks.create(this.newTitle);
              console.log('API Response (Add):', response);
              if (response.message === 'Created successfully') {
                  this.$toast.success('Thêm task thành công');
                  this.newTitle = {
                      title: '',
                  };
                  await this.fetchTitle();
              } else {
                  console.error('⚠️ API trả về dữ liệu không mong muốn:', response);
              }
          } catch (error) {
              console.error('❌ Lỗi khi thêm task:', error);
          }
      },
      cancelAddList() {
          this.isAddingList = false;
          this.newTitle.title = '';
      },
      async deleteTitle(id) {
          try {
              const response = await this.$axios.titletasks.delete(id);
              console.log('Response sau khi xóa:', response);
              if (response.message === 'Deleted successfully') {
                  this.$toast.success('Xóa task thành công');
                  await this.fetchTitle();
              } else {
                  console.error('���️ API trả về dữ liệu không mong muốn:', response);
              }
          } catch (error) {
              console.error('�� L��i khi xóa task:', error);
          }
      },
      closeModal() {
          this.$emit('close');
          console.log("nhan dong task");
      },

  }
};
</script>

<style>
/* 1. Đặt ảnh nền toàn trang */
#container {
  background: url("https://mega.com.vn/media/news/2707_phong-nen-lich-su-dep-lam-slide7.jpg") center center;
  background-size: cover;
}

/* 2. Overlay giúp chữ đọc rõ hơn */
.overlay {
  min-height: 100vh;
}

/* 3. Navbar tuỳ chỉnh */
.navbar-custom {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

.add-card-form {
  background: #ebecf0;
  padding: 8px;
  border-radius: 4px;
  margin-top: 8px;
}

.add-card-btn {
  background: none;
  border: none;
  color: #5e6c84;
  width: 100%;
  text-align: left;
  padding: 8px;
}

.add-card-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* 4. Tiêu đề bảng */
.board-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.trello-card span {
  word-wrap: break-word;
  /* Đảm bảo chữ không tràn ra ngoài */
  white-space: normal;
  /* Cho phép chữ xuống dòng */
  overflow-wrap: break-word;
  /* Đảm bảo xuống dòng khi cần */
  display: block;
  /* Để text tự động chiếm toàn bộ width */
  max-width: 100%;
  /* Giới hạn độ rộng để không tràn */
}

/* 5. Khu vực hiển thị các danh sách */
.board-lists {
  overflow-x: auto;
  white-space: nowrap;
  /* Giữ các danh sách trên một dòng */
  scrollbar-width: none;
  /* Ẩn thanh cuộn trên Firefox */
  -ms-overflow-style: none;
  /* Ẩn thanh cuộn trên IE/Edge */
}

.board-lists::-webkit-scrollbar {
  display: none;
  /* Ẩn thanh cuộn trên Chrome, Safari */
}


/* 6. Mỗi cột (list) Trello */
.trello-list {
  display: inline-block;
  /* để xếp ngang */
  vertical-align: top;
  min-width: 272px;
  background-color: #ebecf0;
  border-radius: 6px;
  margin-right: 12px;
  padding: 8px;
}

/* Tiêu đề cột */
.trello-list h6 {
  font-size: 0.95rem;
  margin-bottom: 8px;
  font-weight: 600;
}

/* 7. Card (thẻ) Trello */
.trello-card {
  background-color: #ffffff;
  border-radius: 6px;
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  transition: background-color 0.2s ease-in-out;
}

.trello-card:hover {
  background-color: #f4f5f7;
}

/* Label nho nhỏ bên trong card (dạng badge) */
.trello-label {
  display: inline-block;
  font-size: 0.75rem;
  color: #fff;
  background-color: #5aac44;
  border-radius: 4px;
  padding: 2px 6px;
  margin-right: 4px;
}

/* 8. Nút + Thêm thẻ / + Thêm danh sách */
.add-card-btn,
.add-list-btn {
  width: 100%;
  background-color: transparent;
  border: none;
  text-align: left;
  color: #5e6c84;
  padding: 6px 8px;
  margin-bottom: 0;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.add-card-btn:hover,
.add-list-btn:hover {
  background-color: #dadce0;
  color: #172b4d;
}

/* Form thêm card ẩn mặc định */
.add-card-form {
  background-color: #ffffff;
  border-radius: 6px;
  padding: 8px;
  margin-bottom: 8px;
  display: none;
}

/* 9. Thanh cuộn */
.board-lists::-webkit-scrollbar {
  height: 8px;
}

.board-lists::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.board-lists::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

/* 10. Responsive: ẩn text navbar khi màn hình nhỏ để gọn */
@media (max-width: 576px) {
  .navbar-nav .nav-link span {
      display: none;
  }

  .navbar-brand {
      font-size: 0.9rem;
  }

  .board-title {
      font-size: 1rem;
  }
}
</style>
