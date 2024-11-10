<script setup>
  import {ref, computed, reactive, watch} from 'vue';
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

  function hasBasket(){
    return Object.keys(dataManager.basket).length <= 0
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

  watch([ascending, sortVal], ([newValX, newValY], [oldValX, oldValY])=>{ 
    if(newValX !== oldValX || newValY !== oldValY){
      sortedList.value = []
      let tempList = dataManager.sort(sortVal.value, ascending.value)
      for(let obj of tempList){
        sortedList.value.push(obj)
      }
    } 
  }, {immediate: true})
</script>

<template>
  <BasketPage
    :basket="basket"
    :pageState="pageState"
  />
  <div v-if="pageState.isHomePage" class="container bg-dark text-light">
    <div class="row">
      <div class="col-12 d-flex flex-column justify-content-center">
        <Search/>
        <Sort
          @setIsAsc="setAscending"
          v-model:sortVal="sortVal"
        />
        <div class="lessonGrid mt-3 mx-4">
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
  <button class="btn btn-light" @click="swap()" :disabled="hasBasket()">Swap Pages</button>
  
</template>


