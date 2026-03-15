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



  // GETTERS (вычисляемые свойства)
//   const chtoto = computed(() => {

//   })

  // ACTIONS (действия)
//   function increment() {
    
//   }

//   return { count, doubleCount, increment }
  return { id, name, surname, patronymic, email, password, aside}
})