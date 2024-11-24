<script setup>
  import {ref, reactive} from 'vue';
  import DataManager from './classes/dataManager';
  import BasketPage from './components/BasketPage.vue';
  import LessonPage from './components/LessonPage.vue';
  import Navbar from './components/Navbar.vue';
  
  const basket = ref([])
  let basketCount = ref(0)
  const pageState = reactive({
    isHomePage: true,
    isCheckout: false,
  })
  const dataManager = DataManager.getInstance()

  function addToBasket(item){
    basket.value = []
    let tempBask = dataManager.addToBasket(item)
    basketCount.value = dataManager.getBasketCount()
    for(let key of Object.keys(tempBask)){
      let obj = {lessonId: tempBask[key].lessonId, qty: tempBask[key].qty, price: tempBask[key].price, name: tempBask[key].name, maxSlots: tempBask[key].maxSlots}
      basket.value.push(obj)
    }
  }

  function removeFromBasket(name){
    let idx = dataManager.findProductIdx(name)
    dataManager.productList[idx].availableSlots++
    dataManager.basketCount--
    dataManager.basket[dataManager.productList[idx].name].qty--
    if(dataManager.productList[idx].availableSlots >= dataManager.productList[idx].maxSlots /*Upper limit of slots */){
      let tempBask = dataManager.removeFromBasket(dataManager.productList[idx])
      basket.value = []
      for(let key of Object.keys(tempBask)){
        let obj = {lessonId: tempBask[key].lessonId, qty: tempBask[key].qty, price: tempBask[key].price, name: tempBask[key].name, maxSlots: tempBask[key].maxSlots}
        basket.value.push(obj)
      }
    }
  }

  function hasBasket(){
    return Object.keys(dataManager.basket).length <= 0 && pageState.isCheckout == false
  }  

</script>

<template>
  <div class="container-fluid bg-light text-dark mx-0 my-0">
    <div class="row">
      <Navbar
        :pageState="pageState"
        :basketCount="basketCount"
      />
      <BasketPage
        :basket="basket"
        :pageState="pageState"
        @basket-remove-item="removeFromBasket"
      />
      <LessonPage
        :pageState="pageState"
        @basket-add-item="addToBasket"
      />
    </div>
  </div>  
</template>


