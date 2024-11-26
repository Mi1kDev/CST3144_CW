<script setup>
  import {watch, onMounted, ref} from 'vue';
  import DataManager from '../classes/dataManager.js';
  import Search from './Search.vue';
  import Sort from './Sort.vue';
  import LessonItem from './LessonItem.vue'; 
  import Carousel from './Carousel.vue';

  const props = defineProps(['pageState'])
  const emit = defineEmits(['basketAddItem'])
  const ascending = ref(true)
  let sortedList = ref([])
  const sortVal = ref(0)
  const dataManager = DataManager.getInstance()

  function setAscending(value){
      if(ascending.value === value){
        return
      }
      ascending.value = value
  }

  function emitSignal(name){
    emit('basketAddItem', name)
  }
  async function init(){
    const url = "https://cst3144-cw-express.onrender.com/lessons"
    let response
    try{
        response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
      })
      const data = await response.json()
      if(!data.status.value){
        sortedList.value = []
        return
      }
      dataManager.productList = data.value
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

  function updateLessonInformation(){
    sortedList.value = []
    let tempList = dataManager.sort(sortVal.value, ascending.value)
    for(let obj of tempList){
      if(obj.name in dataManager.basket){
        obj.availableSlots -= dataManager.basket[obj.name].qty
      }
      sortedList.value.push(obj)
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
</script>

<template>
      <div v-if="props.pageState.isHomePage" class="col-12 d-flex flex-column justify-content-center mx-0 w-100 p-0">
        <Carousel/>
        <div class="px-4">
          <Search
            @found="updateLessonInformation"
          />
          <Sort
            @setIsAsc="setAscending"
            v-model:sortVal="sortVal"
          />
        </div>
        <div class="lessonGrid mt-3 mx-4 overflow-y off-white px-5 py-3 rounded-3 border border-1 border-dark mb-3">
          <LessonItem
            v-for="(item, index) in sortedList"
            :item="item"
            :index="index"
            @addToBasket="emitSignal"
          />
        </div>
      </div>
</template>