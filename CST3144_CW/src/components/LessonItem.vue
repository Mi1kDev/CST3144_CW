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
    <div class="card lessonItem">
        <img v-if="isImage()" class="card-img-top limitImg" :src="item.imageURL" :alt="item.name">
        <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <p class="card-text">Location: {{ item.location }}</p>
            <p class="card-text">Price: {{ item.cost }}</p>
            <p class="card-text">Slots: {{ item.availableSlots }}</p>
            <button class="btn btn-primary text-center" @click="addToBasket(item)" :disabled="isDisabled()">Add to Basket</button>   
        </div>
    </div>
</template>