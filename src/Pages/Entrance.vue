<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/Stores/StoreDashboard';

let user = useUserStore();
user.aside = false;

const router = useRouter();

// переход на страницу с регистарцией
let registration = () => {
    router.push('/Registration');
}

// Вход
let OnEntrance = reactive({
    email: '',
    password: ''
})
let Entrance = async () => {
    try{
        // волидация данных
        if(OnEntrance.email.length == 0 || OnEntrance.password.length == 0){
            alert("Не все поля заполнены");
            return;
        }
        let response = await axios.get(user.usersURL);
        let getUsers = response.data; 
        let authorization = getUsers.find((user) => user.email == OnEntrance.email && user.password == OnEntrance.password)
        if(authorization){
            // добавляем эти данные в стор
            console.log(authorization);
            user.$id = authorization.id;
            user.name = authorization.name;
            user.surname = authorization.surname;
            user.patronymic = authorization.patronymic;
            user.email = authorization.email;
            user.password = authorization.password;
            // включаем левый борд
            user.aside = true;

            await router.push('/Dashboard');
        }else{
            alert("Проверьте логин и пароль");
            OnEntrance.email = "";
            OnEntrance.password = "";
        }
    }
    catch(error){
        alert("Проблема с сервером" + error);
    }
}
</script>

<template>
  <main>
    <section class="content">
        <div class="form">
            <h1>Вход</h1>
            <h2>Email</h2>
            <input v-model="OnEntrance.email" type="text" placeholder="Введите Email">
            <h2>Пароль</h2>
            <input v-model="OnEntrance.password" type="text" placeholder="Введите Пароль">
            <br/>
            <section class="btms">
                <button @click="Entrance" class="entrance">Вход</button>
                <button @click="registration" class="registration">Регистрация</button>
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
