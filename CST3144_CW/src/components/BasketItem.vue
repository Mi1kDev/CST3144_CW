<script setup>
    const emit = defineEmits(['removeFromBasket'])
    const props = defineProps(['item', 'index'])

    function calc(){
        return props.item.qty * props.item.price
    }

    function removeFromBasket(item){
        if(item.qty > 1){
            item.qty--
        }
        if(item.qty > 0){
            let name = item.name
            emit('removeFromBasket', name)
        }
    }

    function getItemQty(item){
        console.log(item.qty)
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