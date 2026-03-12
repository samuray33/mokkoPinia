<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

let registration = () => {
    router.push('./Registration');
}
</script>

<template>
  <main>
    <section class="content">
        <div class="form">
            <h1>Вход</h1>
            <h2>Email</h2>
            <input type="text" placeholder="Введите Email">
            <h2>Пароль</h2>
            <input type="text" placeholder="Введите Пароль">
            <br/>
            <section class="btms">
                <button class="entrance">Вход</button>
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
    margin-top: 10%;
    width: 40%;
    border-radius: 10px;
    padding: 20px 40px;
    box-shadow: 0px 0px 10px rgb(55, 124, 55);
}

h1{
    text-align: center;
    margin-bottom: 20px;
}

input{
    width: 100%;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 20px;
    padding: 5px 10px;
    font-size: 15px;
    border-radius: 10px;
    border: 1px solid #000;
    outline:none;
}

.btms{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0px 0px 0px;
}
.entrance{
    background-color: rgb(55, 124, 55);
    color: #fff;
    border: none;
    width: 30%;
    padding: 10px 0px;
    font-size: 15px;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
}
.registration{
    background-color: rgb(111, 128, 52);
    color: #fff;
    border: none;
    width: 30%;
    padding: 10px 0px;
    font-size: 15px;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
}
</style>
