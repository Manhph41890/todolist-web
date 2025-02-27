<template>
    <div>
        <button v-if="!isAddingTodo" class="add-card-btn" @click="isAddingTodo = true">
            <i class="bi bi-plus-lg"></i> Thêm thẻ
        </button>

        <div v-else class="">
            <input type="text" class="form-control mb-2" v-model="newTask.title" placeholder="Nhập tiêu đề thẻ" />

            <div class="d-flex align-items-center">
                <button class="btn btn-primary btn-sm me-2" @click="addTask">
                    Thêm
                </button>
                <button class="btn btn-light btn-sm" @click="cancelAdding">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        titleId: Number,
    },
    data() {
        return {
            isAddingTodo: false, // Trạng thái hiển thị input
            newTask: {
                title: '',
                titletask_id: this.titleId,
            },
        };
    },
    methods: {
        async addTask() {
            try {
                const response = await this.$axios.todolists.create(this.newTask);
                console.log('API Response (Add):', response);
                if (response.message === 'Created successfully') {
                    this.$toast.success('Thêm thẻ thành công');
                    this.newTask.title = '';
                    this.isAddingTodo = false;
                    this.$emit('taskAdded'); // Emit sự kiện khi thêm thành công
                }
            } catch (error) {
                console.error('❌ Lỗi khi thêm thẻ:', error);
                this.$toast.error('Thêm thẻ thất bại!');
            }
        },
        cancelAdding() {
            this.isAddingTodo = false;
            this.newTask.title = '';
        },
    },
};
</script>
