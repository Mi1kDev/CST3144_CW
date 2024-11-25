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

    function getImageURL(item){
        let placeholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s"
        if(item.imageURL == "https://cst3144-cw-express.onrender.com"){
            console.log("LOL")
            return placeholder
        }
        return item.imageURL
    }
</script>

<template>
    <div class="card lessonItem rounded burgundy">
        <!-- <div class="d-flex justify-content-center h-25">
            <img v-if="isImage()" class="card-img-top h-100" :src="item.imageURL" :alt="item.name">
        </div> -->
        <div class="card-body text-light rounded h-75 hiddenScroll">
            <img class="card-img-top h-50" :src="getImageURL(item)" :alt="item.name">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <p class="card-text">Location: {{ item.location }}</p>
            <p class="card-text">Price: £{{ item.cost }}</p>
            <p class="card-text">Slots: {{ item.availableSlots }}</p>
        </div>
        <div class="card-footer h-25">
            <button class="btn btn-primary text-center" @click="addToBasket(item)" :disabled="isDisabled()">Add to Basket</button>
        </div>
    </div>

</template>