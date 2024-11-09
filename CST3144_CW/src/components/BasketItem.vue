<script setup>
    const props = defineProps(['item', 'index'])
</script>

<template>
    <div class="basketItem">
        <h3>{{ item.name }}</h3>
        <p>{{ item.qty }}</p>
        <p>{{ item.price }}</p>
    </div>
</template>