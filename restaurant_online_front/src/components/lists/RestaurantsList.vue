<script setup>
import { ref, computed } from 'vue';
import ModesSelect from '../modes/ModesSelect.vue';

const restaurantsModes = ref(['index', 'create'])
const restaurantsModesProperties = ref({
  index:{ action:'index', allowed:false, visible:true },
  create:{ action:'create', allowed:false, visible:true,
    args: {}
  }
})
const currentRestaturantMode = ref('index')
const setRestaturantMode = (modeName) => currentRestaturantMode.value = modeName

const restaurants = ref([
    {
        "id": 1,
        "address": "st.Avenue-15",
        "email": "avenue@gmail.com",
        "menus": [
            {
                "id": 11,
                "name": "Asian 1",
                "restaurant": {
                    "id": 1,
                    "address": "st.Avenue-15",
                    "email": "avenue@gmail.com",
                    "name": "Avenue",
                    "tables": []
                },
                "dishes": [
                    {
                        "id": 6,
                        "name": "coffee 1"
                    },
                    {
                        "id": 7,
                        "name": "poreage 2"
                    }
                ],
            },
            {
                "id": 1,
                "name": "Belarusuan 2",
                "restaurant": {
                    "id": 1,
                    "address": "st.Avenue-15",
                    "email": "avenue@gmail.com",
                    "name": "Avenue",
                    "tables": []
                },
                "dishes": [
                    {
                        "id": 8,
                        "name": "tea 3"
                    },
                    {
                        "id": 9,
                        "name": "buterbroad 4"
                    }
                ],
            },
            {
                "id": 15,
                "name": "Russian 3",
                "restaurant": {
                    "id": 1,
                    "address": "st.Avenue-15",
                    "email": "avenue@gmail.com",
                    "name": "Avenue",
                    "tables": []
                },
                "dishes": [
                    {
                        "id": 10,
                        "name": "latte 5"
                    },
                    {
                        "id": 11,
                        "name": "soup 6"
                    }
                ],
            }
        ],
        "name": "Avenue",
        "tables": []
    },
    {
        "id": 2,
        "address": "st.Avenue-15",
        "email": "avenue@gmail.com",
        "menus": [
            {
                "id": 11,
                "name": "Italian 1",
                "restaurant": {
                    "id": 1,
                    "address": "st.Avenue-15",
                    "email": "avenue@gmail.com",
                    "name": "Avenue",
                    "tables": []
                },
                "dishes": [
                    {
                        "id": 12,
                        "name": "sweats"
                    },
                    {
                        "id": 13,
                        "name": "sushi 4"
                    }
                ],
            },
            {
                "id": 1,
                "name": "French 2",
                "restaurant": {
                    "id": 1,
                    "address": "st.Avenue-15",
                    "email": "avenue@gmail.com",
                    "name": "Avenue",
                    "tables": []
                },
                "dishes": [
                    {
                        "id": 14,
                        "name": "potatto"
                    },
                    {
                        "id": 15,
                        "name": "salat"
                    }
                ],
            },
            {
                "id": 15,
                "name": "German 3",
                "restaurant": {
                    "id": 1,
                    "address": "st.Avenue-15",
                    "email": "avenue@gmail.com",
                    "name": "Avenue",
                    "tables": []
                },
                "dishes": [
                    {
                        "id": 16,
                        "name": "pizza"
                    },
                    {
                        "id": 17,
                        "name": "buritto"
                    }
                ],
            }
        ],
        "name": "Avenue",
        "tables": []
    },
    {
        "id": 3,
        "address": "st.Avenue-15",
        "email": "avenue@gmail.com",
        "menus": [
            {
                "id": 11,
                "name": "Chines 1",
                "restaurant": {
                    "id": 1,
                    "address": "st.Avenue-15",
                    "email": "avenue@gmail.com",
                    "name": "Avenue",
                    "tables": []
                },
                "dishes": [
                    {
                        "id": 18,
                        "name": "meat"
                    },
                    {
                        "id": 19,
                        "name": "chips"
                    }
                ],
            },
            {
                "id": 1,
                "name": "Jappanies 2",
                "restaurant": {
                    "id": 1,
                    "address": "st.Avenue-15",
                    "email": "avenue@gmail.com",
                    "name": "Avenue",
                    "tables": []
                },
                "dishes": [
                    {
                        "id": 20,
                        "name": "guliash"
                    },
                    {
                        "id": 21,
                        "name": "colbasa"
                    }
                ],
            },
            {
                "id": 15,
                "name": "Turkiesh 3",
                "restaurant": {
                    "id": 1,
                    "address": "st.Avenue-15",
                    "email": "avenue@gmail.com",
                    "name": "Avenue",
                    "tables": []
                },
                "dishes": [
                    {
                        "id": 22,
                        "name": "hinkali"
                    },
                    {
                        "id": 23,
                        "name": "shahluk"
                    }
                ],
            }
        ],
        "name": "Avenue",
        "tables": []
    }
])
const currentRestaurant = ref(restaurants.value[0])

const menus = computed(() => {
  return currentRestaurant.value.menus
})
const currentMenu = ref(menus.value[0])
const menuModes = ['index', 'create']
const menusModesProperties = ref({
  index:{ action:'index', allowed:true, visible:true },
  create:{ action:'create', allowed:true, visible:true },
})

const dishes = computed(() => {
  return currentMenu.value.dishes
})
const restaurantActivityStyle = (restaurant) => {
  let commonStyle = 'restaurant-pd border'

  if (restaurant.id == currentRestaurant.value.id) {
    return `current-restaurant-bg ${commonStyle}`
  }

  return `restaurant-bg ${commonStyle}`
}
const setCurrentRestaurant = (restaurant) => {
  currentRestaurant.value = restaurant
  currentMenu.value = menus.value[0]
}

const menuActivityStyle = (menu) => {
  let commonStyle = 'border menu-padding mb-element-flex'

  if (menu.id == currentMenu.value.id) {
    return `current-menu-bg ${commonStyle}`
  }

  return `menu-bg ${commonStyle}`
}

const setCurrentMenu = (menu) => {
  currentMenu.value = menu
}

</script>

<template>
  <div class="restaurants-list-content-container">
    <div class="restaurants-list-container">
      <ModesSelect :modes="restaurantsModes"
                  :current-mode="currentRestaturantMode"
                  :modes-properties="restaurantsModesProperties"
                  :record="currentRestaurant"
                  :with-slot="false"
                  @set-mode="setRestaturantMode" />

      <ul class="restaurants-list block">
        <li v-for="restaurant in restaurants" class="restaurant-li"
            @click="setCurrentRestaurant(restaurant)">
          <div v-bind:class="restaurantActivityStyle(restaurant)">
            <p>Name: {{ restaurant.name }}</p>
            <p>Address: {{ restaurant.address }}</p>
            <p>Email: {{ restaurant.email }}</p>
          </div>
        </li>
      </ul>
    </div>
    
    <div class="restaurant-content">

      <div class="menus-bar">
        <div v-for="menu in menus" 
              v-bind:class="menuActivityStyle(menu)"
              @click="setCurrentMenu(menu)">
          {{ menu.name }}
        </div>

        <div>
          <!-- modes select -->
          <ModesSelect :modes="menuModes"
                        :current-mode="currentMenuMode"
                        :modes-properties="menusModesProperties"
                        :record="currentMenu"
                        :with-slot="false"
                        @set-mode="setMenuMode"/>
        </div>
      </div>

      <!-- v-if="currentMenuMode == 'index'" -->
      <div class="menu-dishes-container">
        <div v-for="dish in dishes"
              class="border md-background md-padding">
          {{ dish.name }}
        </div>
      </div>

    </div>
  </div>
</template>

<style>
  .restaurants-list-content-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .restaurants-list-container {
    display: flex;
    flex-direction: column;
  }

  .restaurants-list {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .restaurant-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 6;
  }

  .menus-bar {
    display: flex;
    flex-direction: row;
    flex: 1;
  }  

  .mb-element-flex {
    flex: 1;

    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
  }

  .menu-dishes-container {
    flex: 10;
    background-color: antiquewhite;

    display: flex;
    flex-direction: column;
  }

  .md-background {
    background-color: rgb(221, 160, 183);
    flex: 1;
  }

  .md-padding {
    padding: 1px;
  }

  .current-menu-bg {
    background-color:blueviolet;
  }

  .menu-bg {
    background-color: rgb(191, 160, 221);
  }

  .menu-padding {
    padding: 3px;
  }

  .block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
  }

  .current-restaurant-bg {
    background-color:blueviolet;
  }

  .restaurant-bg {
    background-color: rgb(191, 160, 221);
  }

  .restaurant-pd {
    padding: 5px;
  }

  .border {
    border: 1px solid black;
  }

  .restaurant-li {
    margin: 0px;
  }
</style>