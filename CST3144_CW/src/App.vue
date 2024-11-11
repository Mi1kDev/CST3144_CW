<script setup>
  import {ref, computed, reactive, watch, onMounted} from 'vue';
  import LessonItem from './components/LessonItem.vue'; 
  import DataManager from './classes/dataManager';
  import BasketPage from './components/BasketPage.vue';
  import Search from './components/Search.vue';
  import Sort from './components/Sort.vue'

  let sortedList = ref([])
  const ascending = ref(true)
  const sortVal = ref(0)
  const basket = ref([])
  const pageState = ref({
    isHomePage: true,
    isCheckout: false,
  })
  const dataManager = new DataManager()

  function addToBasket(item){
    basket.value = []
    let tempBask = dataManager.addToBasket(item)
    for(let key of Object.keys(tempBask)){
      let obj = {qty: tempBask[key].qty, price: tempBask[key].price, name: tempBask[key].name}
      basket.value.push(obj)
    }
  }

  function removeFromBasket(count, name){
    let idx = dataManager.findProductIdx(name)
    dataManager.productList[idx].availableSlots = dataManager.productList[idx].availableSlots + count
    dataManager.basketCount--
    console.log("SLOTS FOR "+name+" "+dataManager.productList[idx].availableSlots)
    if(dataManager.productList[idx].availableSlots >= 5 /*Upper limit of slots */){
      let tempBask = dataManager.removeFromBasket(dataManager.productList[idx])
      basket.value = []
      for(let key of Object.keys(tempBask)){
        let obj = {qty: tempBask[key].qty, price: tempBask[key].price, name: tempBask[key].name}
        basket.value.push(obj)
      }
    }
  }

  function hasBasket(){
    return Object.keys(dataManager.basket).length <= 0 && pageState.value.isCheckout == false
  }

  function setAscending(value){
    if(ascending.value === value){
      return
    }
    ascending.value = value
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

  watch([ascending, sortVal], ([newValX, newValY], [oldValX, oldValY])=>{ 
    if(newValX !== oldValX || newValY !== oldValY){
      sortedList.value = []
      let tempList = dataManager.sort(sortVal.value, ascending.value)
      for(let obj of tempList){
        sortedList.value.push(obj)
      }
    } 
  })

  async function init(){
    const url = "http://localhost:5174/api/lessons"
    let response
    try{
        response = await fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      })
      const data = await response.json()
      dataManager.productList = data
      let tempList = dataManager.sort(sortVal.value, ascending.value)
      for(let obj of tempList){
        sortedList.value.push(obj)
      }
    }catch(err){
      console.log(err)
    }
  }
  onMounted(async() =>{
    await init()
  })
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
    <div class="row">
      <div v-if="pageState.isHomePage" class="col-12 d-flex flex-column justify-content-center rounded p-5">
        <Search/>
        <Sort
          @setIsAsc="setAscending"
          v-model:sortVal="sortVal"
        />
        <div class="lessonGrid mt-3 mx-4 overflow-auto">
          <LessonItem
            v-for="(item, index) in sortedList"
            :item="item"
            :index="index"
            @addToBasket="addToBasket"
          />
        </div>
      </div>
    </div>
  </div>  
</template>


