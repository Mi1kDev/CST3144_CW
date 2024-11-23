<script setup>
    import DataManager from '@/classes/dataManager.js';
    import {watch, ref} from 'vue';
    const props = defineProps(['pageState', 'basketCount'])
    const dataManager = DataManager.getInstance();

    function getPageButton(){
      console.log("CALC")
      let pageState = props.pageState
      if(pageState.isCheckout){
        return "Home"
      }
      if(pageState.isHomePage){
        return "Cart - " + props.basketCount
      }
    }
    
    function swap(){
      let pageState = props.pageState
      pageState.isCheckout = !pageState.isCheckout
      pageState.isHomePage = !pageState.isHomePage
    } 

</script>

<template>
    <div class="col-12 navbar px-3">
        <button class="rounded btn btn-light navButton p-0" @click="swap()">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            {{ getPageButton() }}
        </button>
    </div>
</template>