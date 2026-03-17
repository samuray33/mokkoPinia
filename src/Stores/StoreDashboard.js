import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('User', () => {
  // STATE (состояние) - переменные
  let id = ref();
  let name = ref("");
  let surname = ref("");
  let patronymic = ref("");
  let email = ref("");
  let password = ref("");
//   это для true / false aside
  let aside = ref(false);

  // тут наша api
  let usersURL = 'http://localhost:3000/users';
  let postsURL = 'http://localhost:3000/posts';


  // GETTERS (вычисляемые свойства)
//   const chtoto = computed(() => {

//   })

  // ACTIONS (действия)
//   function increment() {
    
//   }

//   return { count, chtoto, increment }
  return { id, name, surname, patronymic, email, password, aside, usersURL, postsURL}
})