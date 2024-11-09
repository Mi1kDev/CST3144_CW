<script setup>
    const emit = defineEmits(['addToBasket'])
    const props = defineProps(['item','index'])
    function addToBasket(item){
        if(item.availableSlots > 0){
            item.availableSlots -= 1
            emit('addToBasket', item)
        }
    }

    function isDisabled(){
        return props.item.availableSlots <= 0
    }

    function isImage(){
        if(props.item.imageURL !== ""){
            return true
        }
        return false
    }
</script>

<template>
    <div class="lessonItem">
        <img class="limitImg" v-if="isImage()" :src="item.imageURL" :alt="item.name">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p>Location: {{ item.location }}</p>
        <p>Price: {{ item.cost }}</p>
        <p>Slots: {{ item.availableSlots }}</p>
        <button @click="addToBasket(item)" :disabled="isDisabled()">Add to Basket</button>
    </div>
</template>