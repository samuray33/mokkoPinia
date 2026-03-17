<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/Stores/StoreDashboard';

let user = useUserStore();

const router = useRouter();

// переход на страницу со входом 
let entrance = () => {
    router.push('/Entrance');
}

// добавление данных на сервер через axios
let OnAddUser = reactive({
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    password: ""
})
let AddUser = async () => {
    try{
        // Волидация
        if(
            OnAddUser.name.length > 0 &&
            OnAddUser.surname.length > 0 &&
            OnAddUser.patronymic.length > 0 &&
            OnAddUser.email.length > 0 &&
            OnAddUser.password.length > 0
        ){
            await axios.post(user.usersURL, {
                name: OnAddUser.name,
                surname: OnAddUser.surname,
                patronymic: OnAddUser.patronymic,
                email: OnAddUser.email,
                password: OnAddUser.password
            })
            // обнуление полей 
            OnAddUser.name = "";
            OnAddUser.surname = "";
            OnAddUser.patronymic = "";
            OnAddUser.email = "";
            OnAddUser.password = "";
            await router.push('./Entrance');
        }else{
            alert("Не все поля заполнены")
        }
    }
    catch(error){
        alert.log("не удалось добавить пользователя", error);
    }
}
</script>

<template>
  <main>
    <section class="content">
        <div class="form">
            <h1>Регистрация</h1>
            <h2>Имя</h2>
            <input type="text" v-model="OnAddUser.name" placeholder="Введите имя">
            <h2>фамилия</h2>
            <input type="text" v-model="OnAddUser.surname" placeholder="Введите фамилию">
            <h2>Отчество</h2>
            <input type="text" v-model="OnAddUser.patronymic" placeholder="Введите отчество">
            <h2>Email</h2>
            <input type="email" v-model="OnAddUser.email" placeholder="Введите Email">
            <h2>Пароль</h2>
            <input type="password" v-model="OnAddUser.password" placeholder="Введите Пароль">
            <br/>
            <section class="btms">
                <button @click="entrance" class="entrance">Вход</button>
                <button @click="AddUser" class="registration">Регистрация</button>
            </section>
        </div>
    </section>
  </main>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.content{
	margin: 0 auto;
    max-width: 1305px;
    display: flex;
    justify-content: center;
}

.form{
    margin-top: 20vh;
    width: 60vh;
    border-radius: 10px;
    padding: 4vh 8vh;
    box-shadow: 0px 0px 10px rgb(55, 124, 55);
}

h1{
    text-align: center;
    margin-bottom: 4vh;
    font-size: 5vh;
}

h2{
    font-size: 3.5vh;
}

input{
    width: 57vh;
    height: 5vh;
    margin-top: 1vh;
    margin-bottom: 2vh;
    padding: 1vh 2vh;
    font-size: 2.5vh;
    border-radius: 10px;
    border: 1px solid #000;
    outline:none;
}

.btms{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2vh 0px 0px 0px;
}
.entrance{
    background-color: rgb(55, 124, 55);
    color: #fff;
    border: none;
    width: 20vh;
    padding: 1.5vh 0vh;
    font-size: 2.5vh;
    border-radius: 10px;
    margin: 1vh;
    cursor: pointer;
}
.registration{
    background-color: rgb(111, 128, 52);
    color: #fff;
    border: none;
    width: 20vh;
    padding: 1.5vh 0vh;
    font-size: 2.5vh;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
}
</style>
