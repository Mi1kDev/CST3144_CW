<script setup>
    // imports datamanager class
    import DataManager from '@/classes/dataManager.js';
    // define props for passing in data from a parent component
    const props = defineProps(['pageState', 'basketCount'])
    // gets a reference to the datamanager instacne
    const dataManager = DataManager.getInstance()
    // function to change the text content of the button used for swapping between the two pages
    // the text is dependent on which page the user is currently viewing
    function getPageButton(){
      let pageState = props.pageState
      if(pageState.isCheckout){
        return "Home"
      }
      if(pageState.isHomePage){
        return props.basketCount + " Cart"
      }
    }
    // returns a class for the proper display icon for the page the button will take the user to
    // Therefore a home icon if the button takes the user to home and a cart icon if it takes them to checkout
    function getNavIcon(){
      let pageState = props.pageState
      if(pageState.isCheckout){
        return "fa fa-home"
      }
      if(pageState.isHomePage){
        return "fa fa-shopping-cart"
      }
    }
    // determines if the button should be disabled. The button is disabled if the number of items in the basket is zero or less and if the user is not currently viewing the checkout page
    function isDisabled(){
      return dataManager.basketCount <= 0 && props.pageState.isCheckout == false
    }
    // swaps to the other page [Home or Checkout]
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