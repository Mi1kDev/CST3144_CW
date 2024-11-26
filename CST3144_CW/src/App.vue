<script setup>
  import {ref, reactive} from 'vue';
  // import various components used to formulate the webpage
  import DataManager from './classes/dataManager';
  import BasketPage from './components/BasketPage.vue';
  import LessonPage from './components/LessonPage.vue';
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';

  // a basket reference meant to update in realtime the HTML visuals in correspondence with the changes made to data
  const basket = ref([])
  // similarly updates the count of items in the basket
  let basketCount = ref(0)
  // keeps track of which page the user is currently viewing
  const pageState = reactive({
    isHomePage: true,
    isCheckout: false,
  })
  // gets a reference to the data manager object
  const dataManager = DataManager.getInstance()

  // adds a new item to the basket list, the basket is rebuilt from scratch so that the update is registered by vue and visual changes are made
  function addToBasket(item){
    basket.value = []
    let tempBask = dataManager.addToBasket(item)
    // updates the value of the reactive leement keeping track of the number of items in the basket
    basketCount.value = dataManager.getBasketCount()
    for(let key of Object.keys(tempBask)){
      // extracts the necessary properties from the basket object
      let obj = {lessonId: tempBask[key].lessonId, qty: tempBask[key].qty, price: tempBask[key].price, name: tempBask[key].name, maxSlots: tempBask[key].maxSlots}
      basket.value.push(obj)
    }
  }

  // removes a specified item from the basket
  function removeFromBasket(name){
    // finds the index of a specific item in the basket
    let idx = dataManager.findProductIdx(name)
    // updates the list of products to reflect the now increasing amount of slots available as an item has been removed from the basket
    dataManager.productList[idx].availableSlots++
    // reduces the basket count
    dataManager.basketCount--
    // updates the value of the reactive element tracking the number of items in the basket
    basketCount.value = dataManager.getBasketCount()
    dataManager.basket[dataManager.productList[idx].name].qty--
    // removes a lesson entry from the basket entirely if the total number of slots available for that lesson in the product list has reached its max once more
    if(dataManager.productList[idx].availableSlots >= dataManager.productList[idx].maxSlots){
      let tempBask = dataManager.removeFromBasket(dataManager.productList[idx])
      basket.value = []
      for(let key of Object.keys(tempBask)){
        let obj = {lessonId: tempBask[key].lessonId, qty: tempBask[key].qty, price: tempBask[key].price, name: tempBask[key].name, maxSlots: tempBask[key].maxSlots}
        basket.value.push(obj)
      }
    }
  }  

  // completely clears the basket and all elements tracking basket values
  function clearBasket(){
    basket.value = []
    dataManager.basket = {}
    dataManager.basketCount = 0
    basketCount.value = 0
  }

  // swaps to the next page
  function togglePage(){
    pageState.isCheckout = !pageState.isCheckout
    pageState.isHomePage = !pageState.isHomePage
  }

</script>

<template>
  <div class="container-fluid bg-light text-dark mx-0 my-0">
    <div class="row p-0">
      <Navbar
        :pageState="pageState"
        :basketCount="basketCount"
      />
      <BasketPage
        :basket="basket"
        :pageState="pageState"
        @basket-remove-item="removeFromBasket"
        @clearBasket="clearBasket"
        @goHome="togglePage"
      />
      <LessonPage
        :pageState="pageState"
        @basket-add-item="addToBasket"
      />
      <Footer/>
    </div>
  </div>  
</template>


