<script setup>
    // defines signals and props for the component
    const emit = defineEmits(['addToBasket'])
    const props = defineProps(['item','index'])
    
    // emits a signal to add an item to the basket
    function addToBasket(item){
        if(item.availableSlots > 0){
            item.availableSlots -= 1
            emit('addToBasket', item)
        }
    }
    // sets the add to basket button to be disabled if there are zero or less slots available
    function isDisabled(){
        return props.item.availableSlots <= 0
    }
    // uses a placeholder url for the image if the provided item did not have an image url attached to it
    function getImageURL(item){
        let placeholder = "https://cst3144-cw-express.onrender.com/placeholder.png"
        if(item.imageURL === "https://cst3144-cw-express.onrender.com"){
            return placeholder
        }
        return item.imageURL
    }
</script>

<template>
    <div class="card lessonItem rounded burgundy">
        <div class="card-body text-light rounded h-75 hiddenScroll">
            <img class="card-img-top h-50" :src="getImageURL(item)" :alt="item.name">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <p class="card-text">Location: {{ item.location }}</p>
            <p class="card-text">Price: £{{ item.cost }}</p>
            <p class="card-text">Slots: {{ item.availableSlots }}</p>
        </div>
        <div class="card-footer h-25">
            <button class="btn btn-primary text-center" @click="addToBasket(item)" :disabled="isDisabled()">Add to Cart</button>
        </div>
    </div>

</template>