<script setup>
  import {ref, computed, reactive, watch} from 'vue';
  import LessonItem from './components/LessonItem.vue'; 
  
  const productList = [
    {
      name: "Mathematics",
      description: "Mathematics for beginners",
      location: "103 Address Street",
      cost: 10,
      availableSlots: 5,
      imageURL: '/icons/Calculator.png',
    },
    {
      name: "English",
      description: "English for beginners",
      location: "123 Address Street",
      cost: 20,
      availableSlots: 5,
      imageURL: "",
    },
    {
      name: "Spanish",
      description: "Spanish for beginners",
      location: "123 Address Street",
      cost: 15,
      availableSlots: 5,
      imageURL: "",
    },
    {
      name: "Chemistry",
      description: "Chemistry for beginners",
      location: "123 Address Street",
      cost: 10,
      availableSlots: 5,
      imageURL: "/icons/Chemistry.png",
    },
    {
      name: "Physics",
      description: "Physics for beginners",
      location: "123 Address Street",
      cost: 16,
      availableSlots: 5,
      imageURL: "",
    },
    {
      name: "Biology",
      description: "Biology for beginners",
      location: "123 Address Street",
      cost: 21,
      availableSlots: 5,
      imageURL: "",
    },
    {
      name: "Mechanical Engineering",
      description: "Mechanical Engineering for beginners",
      location: "123 Address Street",
      cost: 20,
      availableSlots: 5,
      imageURL: "",
    },
    {
      name: "IT",
      description: "IT for beginners",
      location: "123 Address Street",
      cost: 25,
      availableSlots: 5,
      imageURL: "",
    },
    {
      name: "Computer Science",
      description: "Computer Science for beginners",
      location: "123 Address Street",
      cost: 20,
      availableSlots: 5,
      imageURL: "",
    },
    {
      name: "French",
      description: "French for beginners",
      location: "123 Address Street",
      cost: 8,
      availableSlots: 5,
      imageURL: "",
    },
    
  ]
  let sortedList = ref([])
  const ascending = ref(true)
  let sortVal = ref(0)

  function addToBasket(item){
    console.log(item.name)
  }

  function sortByName(value, isAsc){
    const keys = Object.keys(productList[0])
    productList.sort((a, b) =>{
      let smallVal = -1
      let bigVal = 1
      if(a[keys[value]].toUpperCase() < b[keys[value]].toUpperCase()){
        if(isAsc){
          return smallVal
        }else{
          return bigVal
        }
      }
      if(a[keys[value]].toUpperCase() > b[keys[value]].toUpperCase()){
        if(isAsc){
          return bigVal
        }else{
          return smallVal
        }
      }
      return 0
    })
    console.log("Product List After sort NAME: ",productList)
  }

  function sortByNumber(value, isAsc){
    const keys = Object.keys(productList[0])
    if(isAsc){
      productList.sort((a, b) =>a[keys[value]] - b[keys[value]])
    }else{
      productList.sort((a, b) =>b[keys[value]] - a[keys[value]])
    }
    console.log("Product list after sort number", productList)
  }

  function sortItems(isAsc, value){
    if(typeof(value) !== 'number'){
      value = parseInt(value)
    }
    sortedList.value = []
    //name description location cost availableSlots imageURL
    if(value === 0 || value === 2){
      sortByName(value, isAsc.value)
    }else if(value == 3 || value == 4){
      sortByNumber(value, isAsc.value)
    }
    
    for(let obj of productList){
      sortedList.value.push(obj)
    }
  }

  function setAscending(value){
    if(ascending.value === value){
      return
    }
    ascending.value = value
  }

  watch([ascending, sortVal], ([newValX, newValY], [oldValX, oldValY])=>{ 
    if(newValX !== oldValX || newValY !== oldValY){
      console.log("ASC: "+ascending.value+" SORT VAL: "+sortVal.value)
      sortItems(ascending, sortVal.value)
    } 
  }, {immediate: true})

  // sortedList = sortItems(ascending, sortVal)
</script>

<template>
  <div>
    <button @click="setAscending(true)">Ascending</button>
    <button @click="setAscending(false)">Descending</button>
  </div>
  <label for="sortVal">Sort By:</label>
  <select name="sortVal" id="sortVal" v-model="sortVal">
    <option value=0>Lesson Name</option>
    <option value=2>Location</option>
    <option value=3>Cost</option>
    <option value=4>Available Slots</option>
  </select>
  <LessonItem
    v-for="(item, index) in sortedList"
    :item="item"
    :index="index"
    @addToBasket="addToBasket"
  />
</template>


