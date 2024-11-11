<script setup>
    const emit = defineEmits(['removeFromBasket'])
    const props = defineProps(['item', 'index'])
    let count = 0

    function calc(){
        return props.item.qty * props.item.price
    }

    function removeFromBasket(item){
        if(item.qty > 1){
            item.qty--
            count++
        }
        if(item.qty > 0){
            let name = item.name
            emit('removeFromBasket', 1, name)
        }
    }
</script>

<template>
    <div class="basketItem rounded bg-light text-dark">
        <p>Product Name: {{ item.name }}</p>
        <p>Quantity: {{ item.qty }}</p>
        <p>Price: {{ item.price }}</p>
        <p>Total Cost: {{ calc() }}</p>
        <button class="btn btn-danger" @click="removeFromBasket(item)">Remove from Basket</button>
    </div>
</template>