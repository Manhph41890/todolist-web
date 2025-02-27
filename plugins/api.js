import createTodolistApi from '~/server/api/todolist';
import createTitletasksApi from '~/server/api/titletask';
// import createLogin from '~/server/api/login';

export default ({ $axios }, inject) => {
  console.log('Kiểm tra plugin');

  $axios.todolists = createTodolistApi($axios);
  $axios.titletasks = createTitletasksApi($axios);
  // $axios.login = createLogin($axios);
};
