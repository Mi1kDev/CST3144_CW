<script setup>
  import {watch, onMounted, ref} from 'vue';
  import DataManager from '../classes/dataManager.js';
  import Search from './Search.vue';
  import Sort from './Sort.vue';
  import LessonItem from './LessonItem.vue'; 
  import Carousel from './Carousel.vue';

  // define props and signals
  const props = defineProps(['pageState'])
  const emit = defineEmits(['basketAddItem'])
  // sets the starting value for the ascending variable (Sorts start in ascending order)
  const ascending = ref(true)
  // a reactive element to keep track of the sorted lessons
  let sortedList = ref([])
  // a reactive element to keep track of the category currently used for sorting
  const sortVal = ref(0)
  // gets a reference to the datamanager instance
  const dataManager = DataManager.getInstance()

  // sets the value of the ascending variable
  function setAscending(value){
      if(ascending.value === value){
        return
      }
      ascending.value = value
  }
  // informs the parent component that an item has been added to the basket, sending the name of said item
  function emitSignal(name){
    emit('basketAddItem', name)
  }
  // gets the initial set of lessons from the back end
  async function init(){
    const url = "https://cst3144-cw-express.onrender.com/lessons"
    let response
    try{
      // fetches lessons from the back end
        response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
      })
      const data = await response.json()
      // if no lessons were returned then it defaults to an empty list
      if(!data.status.value){
        sortedList.value = []
        return
      }
      // updates the datamanagers product list with the new data values
      dataManager.productList = data.value
      // sorts the product list
      let tempList = dataManager.sort(sortVal.value, ascending.value)
      // addss the list to the sorted list element which displays the contents in the HTML
      for(let obj of tempList){
        sortedList.value.push(obj)
      }
    }catch(err){
    }
  }
  // when the component is mounted it fetches the lessons for the initial display
  onMounted(async() =>{
    await init()
  })
  // updates lesson information whenever a search is performed
  function updateLessonInformation(){
    // sorts the updated product list
    sortedList.value = []
    let tempList = dataManager.sort(sortVal.value, ascending.value)
    // rebuilds the list
    for(let obj of tempList){
      // if a search is performed it returns the inital values stored in the database
      // in order to display accurate information, the quantity of items stored in the basket are deducted before the lesson is finally displayed
      if(obj.name in dataManager.basket){
        obj.availableSlots -= dataManager.basket[obj.name].qty
      }
      sortedList.value.push(obj)
    }
  }

  // checks for changes in the variables which affect the sort
  watch([ascending, sortVal], ([newValX, newValY], [oldValX, oldValY])=>{ 
    // if any of the relevant variables are different then the lessons are sorted with the new parameters
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
  <!-- display is dependent on the pageState -->
  <div v-if="props.pageState.isHomePage" class="col-12 d-flex flex-column justify-content-center mx-0 w-100 p-0">
    <Carousel />
    <div class="px-4">
      <!-- binds signal emitted from search component to a function updating lesson information -->
      <Search @found="updateLessonInformation" />
      <Sort @setIsAsc="setAscending" v-model:sortVal="sortVal" />
    </div>
    <div class="lessonGrid mt-3 mx-4 overflow-y off-white px-5 py-3 rounded-3 border border-1 border-dark mb-3">
      <LessonItem v-for="(item, index) in sortedList" :item="item" :index="index" @addToBasket="emitSignal" />
    </div>
  </div>
</template>