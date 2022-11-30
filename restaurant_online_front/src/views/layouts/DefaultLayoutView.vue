<script setup>
    import axios from 'axios';
    import { onBeforeMount, ref } from 'vue';
    import { useTokensStore } from '../../stores/tokens'

    const restaurants = ref([])
    const tokens = useTokensStore()


    onBeforeMount(async () => {
        await getRestaurants()
    })

    const getRestaurants = async () => {        
        let response = await axios.get('http://localhost:3000/restaurants', {
            headers: tokens.auth_headers
        })
        .catch((error) => {            
            console.log(error);
        })
        
        if (response && response.status === 200) {
            restaurants.value = response.data
            tokens.setAuthTokens(response.headers)
        }
    }
</script>

<template>
    <header class="block centrenize-content-row">
        HEADER
    </header>

    <div class="centrenize-content-row">
        <div class="menu centrenize-content-column">
            <div class="block centrenize" v-for="restaurant in restaurants">
                {{ restaurant.name }}
            </div>
        </div>

        <div class="content block centrenize-content-row">
            CONTENT
        </div>
    </div>

    <footer class="block centrenize-content-row">
        FOOTER
    </footer>
</template>

<style>
    .block {
        border: 3px solid black;
        padding: 3px;
        margin: 3px;
    }

    .centrenize {
        display: flex;        
        justify-content: space-around;    
    }

    .centrenize-content-column {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .centrenize-content-row {
        display: flex;
        flex-direction: row ;        
        justify-content: space-around;        
    }

    .menu {
        flex: 1;

        margin: 1.5px;
    }

    .content {
        flex: 1;

        margin: 1.5px;
    }
</style>
