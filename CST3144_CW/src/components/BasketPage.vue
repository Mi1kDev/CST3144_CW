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
    const phoneNumber = new RegExp("^([0-9]{11})$")

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

    function stripBasket(){
        let strippedBask = []
        for(let item of props.basket){
            let obj = {
                lessonId: item.lessonId,
                price: item.price,
                qty: item.qty
            }
            strippedBask.push(obj)
        }
        return strippedBask
    }

    async function submitOrder(){
        let success = false

        const order = {
            name: userInformation.name,
            phoneNumber: userInformation.phoneNumber,
            orders: stripBasket()
        }
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
        try{
            const response = await fetch("https://cst3144-cw-express.onrender.com/update", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify(lessonSimple)
            })
        }catch(err){
            if(err){throw err}
        }
        
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
    <div v-if="pageState.isCheckout" class="row basketPageRow m-0 p-0">
        <div class="col-4 px-3 py-2 off-white mt-3 ms-3 rounded">
            <div class="overflow-auto basketPage">
                <BasketItem
                v-for="(item, key) in basket"
                :key="key"
                :item="item"
                @remove-from-basket="emitSignal"
                />
            </div>
            <div class="checkout">
                <p>Total: £{{ calculateTotal() }}</p>
            </div>
        </div>
        <div class="col-7">
            <input type="text" class="input-group" v-model="userInformation.name" @keyup="validate(userInformation.name, basicText,'name')">
            <input type="text" class="input-group" v-model="userInformation.phoneNumber" @keyup="validate(userInformation.phoneNumber, phoneNumber,'phoneNumber')">
            <button class="btn btn-success" @click="submit()" :disabled="isDisabled">Checkout</button>
        </div>  
    </div>
</template>