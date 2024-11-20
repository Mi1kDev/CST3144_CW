<script setup>
  import {ref, watch, onMounted} from 'vue';
  import DataManager from './classes/dataManager';
  import BasketPage from './components/BasketPage.vue';
  import LessonPage from './components/LessonPage.vue';
  
  const basket = ref([])
  const pageState = ref({
    isHomePage: true,
    isCheckout: false,
  })
  const dataManager = DataManager.getInstance()

  function addToBasket(item){
    basket.value = []
    let tempBask = dataManager.addToBasket(item)
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
    return Object.keys(dataManager.basket).length <= 0 && pageState.value.isCheckout == false
  }

  function swap(){
    pageState.value.isCheckout = !pageState.value.isCheckout
    pageState.value.isHomePage = !pageState.value.isHomePage
  }

  function getPageButton(){
    if(pageState.value.isCheckout){
      return "Home"
    }
    if(pageState.value.isHomePage){
      return "View Basket: " + dataManager.getBasketCount()
    }
  }

  

</script>

<template>
  <div class="container-fluid bg-dark text-light mx-0 my-0">
    <div class="col-12">
        <button class="btn btn-light" @click="swap()" :disabled="hasBasket()">{{ getPageButton() }}</button>
      </div>
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
</template>


