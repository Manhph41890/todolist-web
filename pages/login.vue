<template>
    <div>
        <h1>Đăng nhập</h1>
        <button @click="loginWithGoogle">Đăng nhập bằng Google</button>
    </div>
</template>

<script>
export default {
    methods: {
        loginWithGoogle() {
            window.location.href = "http://127.0.0.1:8080/auth/google/redirect";
        },
        async asyncData({ query, redirect }) {
            if (query.token) {
                // Lưu token localStorage
                localStorage.setItem('token', query.token);
                // Chuyển hướng sang trang home
                return redirect('/');
            }
        }
    }
};
</script>