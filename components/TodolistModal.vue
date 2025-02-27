<template>
    <div class="modal fade show d-block" v-if="showModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ todo.title }}</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <p class="text-muted">Trong danh sách <span class="badge bg-secondary">{{ todo.list }}</span></p>

                    <div class="d-flex align-items-center gap-2 my-2">
                        <button class="btn btn-success btn-sm">{{ todo.priority }}</button>
                        <button class="btn btn-outline-secondary btn-sm">Theo dõi</button>
                    </div>

                    <h6 class="mt-3"><i class="bi bi-text-left me-2"></i>Mô tả</h6>
                    <textarea class="form-control" v-model="todo.description"
                        placeholder="Thêm mô tả chi tiết hơn..."></textarea>

                    <h6 class="mt-4"><i class="bi bi-check2-square me-2"></i>Việc cần làm</h6>
                    <div class="progress my-2">
                        <div class="progress-bar bg-success" role="progressbar" :style="{ width: progress + '%' }">
                            {{ progress }}%
                        </div>
                    </div>
                    <ul class="list-group">
                        <li v-for="(task, index) in todo.tasks" :key="index"
                            class="list-group-item d-flex align-items-center">
                            <input type="checkbox" v-model="task.done" @change="updateProgress"
                                class="form-check-input me-2">
                            {{ task.name }}
                        </li>
                    </ul>
                    <button class="btn btn-outline-primary btn-sm mt-2" @click="addTask">Thêm một mục</button>

                    <h6 class="mt-4"><i class="bi bi-list-task me-2"></i> Hoạt động</h6>
                    <div class="d-flex align-items-center gap-2">
                        <img src="https://via.placeholder.com/40" class="rounded-circle" width="40" height="40">
                        <input type="text" class="form-control" placeholder="Viết bình luận...">
                    </div>
                </div>

                <div class="modal-footer d-flex justify-content-between">
                    <div>
                        <button class="btn btn-outline-secondary btn-sm">Tham gia</button>
                        <button class="btn btn-outline-secondary btn-sm">Thành viên</button>
                        <button class="btn btn-outline-secondary btn-sm">Nhãn</button>
                        <button class="btn btn-outline-secondary btn-sm">Ngày</button>
                        <button class="btn btn-outline-secondary btn-sm">Đính kèm</button>
                    </div>
                    <button class="btn btn-secondary" @click="closeModal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        progress() {
            if (!this.todo || !this.todo.tasks || this.todo.tasks.length === 0) {
                return 0; // Trả về 0% nếu không có task
            }
            const completedTasks = this.todo.tasks.filter(task => task.done).length;
            return Math.round((completedTasks / this.todo.tasks.length) * 100);
        }
    },
    props: {
        todo: Object,
        showModal: Boolean,
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        addTask() {
            if (!this.todo.tasks) {
                this.$set(this.todo, 'tasks', []); // Đảm bảo danh sách tồn tại
            }
            this.todo.tasks.push({ name: "Công việc mới", done: false });
        }
    },
};
</script>

<style scoped>
.modal-content {
    border-radius: 8px;
}

.modal-header {
    background: #f8f9fa;
}

.btn-sm {
    font-size: 14px;
}
</style>
