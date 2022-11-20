<script setup>
    import ErrorsVue from '../../components/errors/Errors.vue';
    import axios from 'axios';
    import router from '../../router/router'
    import { ref } from 'vue'

    const customer = ref({
        name: 'clone3',
        email: 'clone3@gmail.com',
        password: 'ewqqwe',
        password_confirmation: 'ewqqwe',
        confirm_success_url: '/',
        type: 'Customer'
    })
    const errors = ref([])

    const sign_up = async () => {
        let response = await axios.post('http://localhost:3000/auth', customer.value)
        .catch((error) => {
            errors.value = error.response.data.errors.full_messages;
        })

        if (response && response.status === 200) {
        router.push({ name: 'sign_in' })
        }
    }

    const sign_in = () => {
        router.push({ name:'sign_in' })
    }
</script>   

<template>
    <ErrorsVue :errors="errors"/>

    <form class="sign-up-form centrenize-content-row">
        <div class="form-elements centrenize-content-column">
            <input type="text" class="form-element" v-model="customer.name" />

            <input type="text" class="form-element" v-model="customer.email" />

            <input type="text" class="form-element" v-model="customer.password" />

            <input type="text" class="form-element" v-model="customer.password_confirmation" />
            
            <div>
                <button type="button" class="form-element" @click="sign_up">Sign Up</button>
                <button type="button" class="form-element" @click="sign_in">Sign In</button>
            </div>
        </div>
    </form>
</template>

<style>
    .block {
        border: 3px solid black;
        padding: 3px;
    }

    .centrenize-content-column {
        display: flex;
        justify-content: space-around;        
        flex-direction: column;
    }

    .centrenize-content-row {
        display: flex;
        justify-content: space-around;
        flex-direction: row;        
    }

    .form-elements {
        width: 20%;
        height: 100%;        
    }

    .form-element {
        margin: 7% 10% 7% 10%;
        flex: 1;
        font-size: 25px;
    }

    .sign-up-form {
        height: 35em;
    }
</style>
