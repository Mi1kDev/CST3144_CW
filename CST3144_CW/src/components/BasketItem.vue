<script setup>
    // define signals and props for the component
    const emit = defineEmits(['removeFromBasket'])
    const props = defineProps(['item', 'index'])
    // calculates the total price for the given lesson
    function calc(){
        return props.item.qty * props.item.price
    }
    // removes an item from the basket
    function removeFromBasket(item){
        if(item.qty > 1){
            item.qty--
        }
        if(item.qty > 0){
            let name = item.name
            emit('removeFromBasket', name)
        }
    }
    // returns the number of items
    function getItemQty(item){
        return item.qty
    }
</script>

<template>
    <div class="basketItem rounded burgundy text-light mb-3 ">
        <p>Product Name: {{ item.name }}</p>
        <p>Quantity: {{ getItemQty(item) }}</p>
        <p>Price: {{ item.price }}</p>
        <p>Total Cost: {{ calc() }}</p>
        <button class="btn btn-success w-100" @click="removeFromBasket(item)"><i class="fa fa-trash" aria-hidden="true"></i></button>
    </div>
</template>