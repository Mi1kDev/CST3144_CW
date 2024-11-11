<script setup>
    import BasketItem from './BasketItem.vue';
    const emit = defineEmits(['basketRemoveItem'])
    const  props = defineProps(['basket', 'pageState'])
    function calculateTotal(){
        let total = 0
        for(let obj of props.basket){
            total += obj.qty * obj.price
        }
        return total
    }
    function emitSignal(count, name){
        emit('basketRemoveItem', count, name)
    }
</script>
<template>
    <div v-if="pageState.isCheckout" class="row">
        <div class="col-3 basketPage overflow-auto p-5">
            <BasketItem
                v-for="(item, key) in basket"
                :key="key"
                :item="item"
                @remove-from-basket="emitSignal"
            />
        </div>
        <div class="col-12">
            <div class="checkout">
                <p>Total: {{ calculateTotal() }}</p>
            </div>
        </div>
        <div class="col-12">
            <input type="text" class="input-group">
            <input type="number" class="input-group">
            <button class="btn btn-success">Checkout</button>
        </div>
    </div>
</template>