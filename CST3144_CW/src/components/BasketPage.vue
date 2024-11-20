<script setup>
    import BasketItem from './BasketItem.vue';
    import {ref} from 'vue'

    const emit = defineEmits(['basketRemoveItem'])
    const  props = defineProps(['basket', 'pageState'])
    const userInformation = {
        name: "",
        phoneNumber: "",
    }
    const validation = {
        name: false,
        phoneNumber: false,
    }

    const basicText = new RegExp("[a-zA-Z]+")
    const phoneNumber = new RegExp("[0-9]{11}")

    let isDisabled = ref(true)

    function calculateTotal(){
        let total = 0
        for(let obj of props.basket){
            total += obj.qty * obj.price
        }
        return total
    }
    function emitSignal(name){
        emit('basketRemoveItem', name)
    }

    async function submitOrder(){
        let success = false
        const order = {
            name: userInformation.name,
            phoneNumber: userInformation.phoneNumber,
            orders: props.basket
        }
        console.log(order)
        try{
            const response = await fetch("https://cst3144-cw-express.onrender.com/order", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(order)
            })
            const data = await response.json()
            console.log(data)
            if(data.status.value){
                success = true
                return success
            }
        }catch(err){
            if(err){throw err}
        }
        return success
    }

    async function updateLesson(){
        let lessonSimple = []
        for(let obj of props.basket){
            let i = {lessonId: obj.lessonId, property: {type: "availableSlots", value: (obj.maxSlots - obj.qty)}}
            lessonSimple.push(i)
        }
        fetch("https://cst3144-cw-express.onrender.com/update", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            mode: "cors",
            body: JSON.stringify(lessonSimple)
        })
    }

    async function submit(){
        let success = await submitOrder()
        if(success){
            await updateLesson()
        }
        
    }

    function isValid(){
        isDisabled.value =  !(validation.name && validation.phoneNumber)
    }

    function validate(testStr, regex, idx){
        let value = regex.test(testStr)
        validation[idx] = value
        isValid()
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
        <div class="col-6">
            <input type="text" class="input-group" v-model="userInformation.name" @keyup="validate(userInformation.name, basicText,'name')">
        </div>
        <div class="col-6">
            <input type="text" class="input-group" v-model="userInformation.phoneNumber" @keyup="validate(userInformation.phoneNumber, phoneNumber,'phoneNumber')">
        </div>
        <div class="col-12">
            <button class="btn btn-success" @click="submit()" :disabled="isDisabled">Checkout</button>
        </div>
    </div>
</template>