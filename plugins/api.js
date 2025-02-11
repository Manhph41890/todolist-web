import createTodolistApi from '~/server/api/todolist';

export default ({ $axios }, inject) => {
  console.log('Kiểm tra plugin');
  $axios.todolists = createTodolistApi($axios);
};
