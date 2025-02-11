export default ($axios) => ({
  get(id) {
    return $axios.$get(`todolists/${id}`);
  },
  getList(params) {
    return $axios.$get('todolists', { params });
  },
  create(data) {
    return $axios.$post('todolists', data);
  },
  update(id, data) {
    return $axios.$put(`todolists/${id}`, data);
  },
  delete(id) {
    return $axios.$delete(`todolists/${id}`);
  }
});
