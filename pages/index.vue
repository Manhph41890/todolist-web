<template>
  <div class="row p-4">
    <div class="col-md-4">
      <div class="card shadow-sm rounded-3">
        <div class="card-body">
          <h4 class="card-title text-center p-3 text-primary">
            <strong>New Task</strong>
          </h4>
          <form @submit.prevent="addTask">
            <div class="mb-3">
              <label for="title" class="form-label">Title
                <span class="text-danger">*</span>
              </label>
              <input type="text" v-model="newTask.title" id="title" class="form-control" placeholder="Title" required>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description
                <span class="text-danger">*</span>
              </label>
              <textarea v-model="newTask.description" id="description" class="form-control" rows="3"
                placeholder="Description" required></textarea>
            </div>
            <div class="d-flex justify-content-between align-content-between">
              <div class="mb-3 me-1" style="width: 200px;">
                <label for="due-date" class="form-label">Due Date
                  <span class="text-danger">*</span>
                </label>
                <input type="date" v-model="newTask.due_date" id="due-date" class="form-control" required>
              </div>
              <div class="mb-3 ms-1">
                <label for="priority" class="form-label">Priority</label>
                <select v-model="newTask.priority" id="priority" class="form-select" style="width: 200px;">
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">Add</button>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-content-between">
            <h3 class="card-title p-3 text-primary">
              <strong>Todo list</strong>
            </h3>
            <div class="input-group" style="width: 30%;">
              <form class="form-control d-flex align-items-center"
                style="height: 40px; padding: 0;border: 1px solid #0d6efd; border-radius: 8px;"
                @submit.prevent="searchTasks">
                <input type="text" class="form-control border-0" placeholder="keyword"
                  style="box-shadow: none; height: 100%; font-size: 14px; padding: 0 10px;" v-model="searchKeyword">
                <button class="btn bg-transparent border-0" type="submit" style="height: 100%; padding: 0 10px;">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.2em"
                    width="1.2em" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
                    </path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div class="list">
            <section class="rounded-3" style="border: 1px solid rgb(230, 228, 228);">
              <!-- <div v-for="task in todo" :key="task.id" class="p-2"> -->
              <div v-for="(task, index) in todo" :key="task.id" class="p-2">
                <div
                  class="list-group-item d-flex align-items-center justify-content-between bg-light pt pe-2 ps-2 rounded-2 pt-2 pb-2">
                  <div class="d-flex align-items-center justify-content-center">
                    <input class="form-check-input me-3" type="checkbox">
                    <span class="badge me-2 pe-3 ps-3 text-white" :class="{
                      'bg-secondary': task.priority === 'normal',
                      'bg-warning': task.priority === 'high',
                      'bg-success': task.priority === 'low'
                    }">
                      {{ task.priority }}
                    </span>
                    {{ task.title }}
                  </div>
                  <div class="">
                    <button class="btn btn-light" @click="deleteTask(task.id)">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em"
                        width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z">
                        </path>
                      </svg>
                    </button>
                    <button class="btn btn-light" @click="editTask(index)">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em"
                        width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path
                          d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z">
                        </path>
                      </svg>
                    </button>
                  </div>
                </div>
                <transition name="slide-fade">
                  <div v-show="editingIndex === index" class="">
                    <form @submit.prevent="updateTask">
                      <div class="mb-3">
                        <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                        <input type="text" v-model="editingTask.title" id="title" class="form-control"
                          placeholder="Title" required>
                      </div>
                      <div class="mb-3">
                        <label for="description" class="form-label">Description <span
                            class="text-danger">*</span></label>
                        <textarea v-model="editingTask.description" id="description" class="form-control" rows="3"
                          placeholder="Description" required></textarea>
                      </div>
                      <div class="d-flex justify-content-between align-content-between">
                        <div class="mb-3 me-1" style="width: 400px;">
                          <label for="due-date" class="form-label">Due Date <span class="text-danger">*</span></label>
                          <input type="date" v-model="editingTask.due_date" id="due-date" class="form-control" required>
                        </div>
                        <div class="mb-3 ms-1">
                          <label for="priority" class="form-label">Priority</label>
                          <select v-model="editingTask.priority" id="priority" class="form-select"
                            style="width: 400px;">
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary w-100">Update</button>
                      <button type="button" class="btn btn-secondary w-100 mt-2"
                        @click="cancelEdit(index)">Cancel</button>
                    </form>
                  </div>
                </transition>

              </div>
            </section>
          </div>
          <div class="d-flex justify-content-between p-4 bg-light rounded-3 mt-3">
            <div class="mt-2">
              <span>Bluk Action</span>
            </div>
            <div class="sc-iCfMLu hPTJGL">
              <button class="btn btn-primary me-3">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em"
                  width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z">
                  </path>
                  <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"></path>
                </svg>Done</button>

              <button class="btn btn-outline-primary">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em"
                  width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z">
                  </path>
                </svg>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: [],
      editingIndex: -1,
      editingTask: {},
      searchKeyword: '',
      newTask: {
        title: '',
        description: '',
        due_date: null,
        priority: 'normal'
      },
    }
  },
  mounted() {
    this.fetchTasks()
    console.log('Component mounted.', this.$axios.todolists);
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await this.$axios.todolists.getList();
        console.log('API Response (Fetch):', response);

        // Kiểm tra cấu trúc response
        if (response.status === 'success' && response.data && Array.isArray(response.data)) {
          this.todo = response.data; // Gán dữ liệu vào this.todo
        } else {
          throw new Error('Định dạng response không hợp lệ');
        }
      } catch (error) {
        console.error('Lỗi khi tải tasks:', error);
        this.$toast.error(`Lỗi khi tải tasks: ${error.message}`);
      }
    },
    async addTask() {
      try {
        const response = await this.$axios.todolists.create(this.newTask);
        console.log('📥 Response sau khi thêm:', response.message);
        if (response.message === 'Created successfully') {
          this.$toast.success('Thêm task thành công');
          this.newTask = {
            title: '',
            description: '',
            due_date: null,
            priority: 'normal',
          };
          await this.fetchTasks();
        } else {
          console.error('⚠️ API trả về dữ liệu không mong muốn:', response);
        }
      } catch (error) {
        console.error('❌ Lỗi khi thêm task:', error);
      }
    },

    async deleteTask(id) {
      try {
        const response = await this.$axios.todolists.delete(id);
        console.log('Response sau khi xóa:', response);
        console.log('Failed to delete task', response.message);
        if (response.message === 'Deleted successfully') {
          this.$toast.success(`Xóa task #${id} thành công!`, {
            timeout: 3000,
            position: 'top-right',
          });
          await this.fetchTasks();
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    },

    editTask(index) {
      console.log('Edit task:', index);
      if (this.editingIndex === index) {
        // Nếu đang chỉnh sửa task hiện tại, tắt form
        this.editingIndex = -1;
        this.editingTask = {};
      } else {
        // Nếu không, mở form chỉnh sửa
        if (this.todo && this.todo[index]) {
          this.editingIndex = index;
          this.editingTask = { ...this.todo[index] };
        } else {
          console.error('Không tìm thấy task để chỉnh sửa');
          this.$toast.error('Không tìm thấy task để chỉnh sửa');
        }
      }
    },

    async updateTask() {
      try {
        const response = await this.$axios.todolists.update(
          this.editingTask.id,  // ID của task
          this.editingTask      // Dữ liệu cập nhật
        );

        console.log(' Response cập nhật:', response.message);

        if (response.message === 'Updated successfully') {
          this.$toast.success('Cập nhật task thành công!');
          this.editingIndex = -1;
          await this.fetchTasks();
        } else {
          this.$toast.error('Cập nhật thất bại: ' + (response.message || 'Lỗi không xác định'));
        }
      } catch (error) {
        console.error(' Lỗi khi cập nhật:', error);
        this.$toast.error(' Lỗi hệ thống: ' + error.message);
      }
    },

    async searchTasks() {
      console.log('Search keyword:', this.searchKeyword);
      try {
        const params = {
          search: this.searchKeyword.trim(), // Thêm tham số search
          limit: 50 // Giới hạn số lượng kết quả
        };

        const response = await this.$axios.todolists.getList(params);

        if (response.status === 'success') {
          this.todo = response.data;

          // Hiển thị thông báo nếu không có kết quả
          if (this.todo.length === 0) {
            this.$toast.info('Không tìm thấy kết quả phù hợp');
          }
        } else {
          throw new Error(response.message || 'Lỗi định dạng response');
        }
      } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
        this.$toast.error(`Lỗi tìm kiếm: ${error.message}`);
      }
    },

    cancelEdit() {
      this.editingIndex = -1;
      this.editingTask = {};
    },
  },
}
</script>

<style scoped>
.row {
  background-color: rgb(152, 193, 217);
}

.list {
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #0d6efd #f0f0f0;
}

.list::-webkit-scrollbar {
  width: 8px;
}

.list::-webkit-scrollbar-thumb {
  background-color: #0d6efd;
  /* Màu thanh cuộn */
  border-radius: 10px;
  /* Bo góc thanh cuộn */
}

.list::-webkit-scrollbar-track {
  background: #f0f0f0;
  /* Màu nền của track */
  border-radius: 10px;
}

section {
  min-height: 400px;
}
</style>