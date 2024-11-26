<script setup>
    import DataManager from '@/classes/dataManager.js';
    const props = defineProps(['pageState', 'basketCount'])
    const dataManager = DataManager.getInstance()
    function getPageButton(){
      let pageState = props.pageState
      if(pageState.isCheckout){
        return "Home"
      }
      if(pageState.isHomePage){
        return props.basketCount + " Cart"
      }
    }
    function getNavIcon(){
      let pageState = props.pageState
      if(pageState.isCheckout){
        return "fa fa-home"
      }
      if(pageState.isHomePage){
        return "fa fa-shopping-cart"
      }
    }
    function isDisabled(){
      return dataManager.basketCount <= 0 && props.pageState.isCheckout == false
    }
    function swap(){
      let pageState = props.pageState
      pageState.isCheckout = !pageState.isCheckout
      pageState.isHomePage = !pageState.isHomePage
    } 

</script>

<template>
    <div class="col-12 navbar px-3">
        <button class="rounded btn btn-light navButton p-0" @click="swap()" :disabled="isDisabled()">
            <i :class="getNavIcon()" aria-hidden="true"></i>
            {{ getPageButton() }}
        </button>
    </div>
</template>