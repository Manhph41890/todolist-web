export default ($axios) => ({
    get(id) {
        return $axios.$get(`titletask/${id}`);
    },
    getList(params) {
        return $axios.$get('titletask', { params });
    },
    create(data) {
        return $axios.$post('titletask', data);
    },
    update(id, data) {
        return $axios.$put(`titletask/${id}`, data);
    },
    delete(id) {
        return $axios.$delete(`titletask/${id}`);
    }
});
