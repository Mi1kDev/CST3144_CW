<script setup>
  import {ref, computed, reactive, watch} from 'vue';
  import LessonItem from './components/LessonItem.vue'; 
  import DataManager from './classes/dataManager';
  import BasketPage from './components/BasketPage.vue';

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

  function setAscending(value){
    if(ascending.value === value){
      return
    }
    ascending.value = value
  }

  function swap(){
    pageState.value.isCheckout = !pageState.value.isCheckout
    pageState.value.isHomePage = !pageState.value.isHomePage

    console.log(pageState.value)
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
  <div v-if="pageState.isHomePage">
    <div>
      <button @click="setAscending(true)">Ascending</button>
      <button @click="setAscending(false)">Descending</button>
    </div>
    <label for="sortVal">Sort By:</label>
    <select name="sortVal" id="sortVal" v-model="sortVal">
      <option value="0">Lesson Name</option>
      <option value="2">Location</option>
      <option value="3">Cost</option>
      <option value="4">Available Slots</option>
    </select>
    <LessonItem
      v-for="(item, index) in sortedList"
      :item="item"
      :index="index"
      @addToBasket="addToBasket"
    />
  </div>
  <button @click="swap()">Swap Pages</button>
  
</template>


