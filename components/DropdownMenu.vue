<template>
    <div class="position-relative d-inline-block">
        <!-- Nút mở menu -->
        <button class="btn btn-sm pb-3" @click="showMenu = !showMenu">
            <i class="bi bi-three-dots"></i>
        </button>

        <!-- Menu hiển thị khi bấm -->
        <div v-if="showMenu" class="custom-menu" @click.stop>
            <div class="menu-header">
                <span>Thao tác</span>
                <button class="btn-close" @click="showMenu = false"></button>
            </div>
            <button class="dropdown-item" @click="$emit('delete', taskId)">
                <i class="bi bi-archive"></i> Lưu trữ
            </button>
        </div>

        <div v-if="showMenu" class="overlay" @click="showMenu = false"></div>
    </div>
</template>

<script>
export default {
    props: {
        taskId: Number,
    },
    data() {
        return {
            showMenu: false,
        };
    },

};
</script>

<style scoped>
.custom-menu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 250px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding: 8px;
    z-index: 1000;
}

.menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    padding-bottom: 6px;
    border-bottom: 1px solid #ddd;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
}

.dropdown-item:hover {
    background: #f4f4f4;
}

.overlay {
    position: fixed;
    inset: 0;
    background: transparent;
    z-index: 999;
}
</style>
