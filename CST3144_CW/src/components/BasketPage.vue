<script setup>
    import BasketItem from './BasketItem.vue';
    const  props = defineProps(['basket', 'pageState'])

    function calculateTotal(){
        let total = 0
        for(let obj of props.basket){
            total += obj.qty * obj.price
        }
        return total
    }
</script>
<template>
    <div v-if="pageState.isCheckout" class="row">
        <div class="col mh-100">
            <BasketItem
                v-for="(item, key) in basket"
                :key="key"
                :item="item"
            />
            <div class="checkout">
                <p>Total: {{ calculateTotal() }}</p>
            </div>
        </div>
        
    </div>
</template>