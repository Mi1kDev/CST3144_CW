<script setup>
    const props = defineProps(['item', 'index'])

    function calc(){
        return props.item.qty * props.item.price
    }
</script>

<template>
    <div class="basketItem rounded bg-light text-dark">
        <p>Product Name: {{ item.name }}</p>
        <p>Quantity: {{ item.qty }}</p>
        <p>Price: {{ item.price }}</p>
        <p>Total Cost: {{ calc() }}</p>
    </div>
</template>