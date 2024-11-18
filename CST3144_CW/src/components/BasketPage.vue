<script setup>
    import BasketItem from './BasketItem.vue';
    import {ref} from 'vue'

    const emit = defineEmits(['basketRemoveItem'])
    const  props = defineProps(['basket', 'pageState'])
    const userInformation = {
        name: "",
        phoneNumber: "",
        ccNum: "",
        expDate: "",
        ccv: ""
    }
    const validation = {
        name: false,
        phoneNumber: false,
        ccNum: false,
        expDate: false,
        ccv: false
    }

    const basicText = new RegExp("[a-zA-Z]+")
    const phoneNumber = new RegExp("[0-9]{11}")
    const card = new RegExp("[0-9]{16}")
    const date = new RegExp("[0-9]{1,2}\/{1}[0-9]{4}")
    const cvv = new RegExp("[0-9]{3}")

    let submitAllowed = ref(false)

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

    async function submit(){
        const order = {
            name: userInformation.name,
            phoneNumber: userInformation.phoneNumber,
            orders: props.basket
        }
        console.log(order)
        try{
            const response = await fetch("http://localhost:5174/order", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(order)
            })
            
        }catch(err){
            if(err){throw err}
        }
        
    }

    function isValid(){
        //invert
        submitAllowed.value =  (validation.name && validation.phoneNumber && validation.ccNum && validation.expDate && validation.ccv)
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
        <div class="col-8">
            <input type="text" class="input-group" v-model="userInformation.ccNum" @keyup="validate(userInformation.ccNum, card,'ccNum')">
        </div>
        <div class="col-2">
            <input type="text" class="input-group" v-model="userInformation.expDate" @keyup="validate(userInformation.expDate, date,'expDate')">
        </div>
        <div class="col-2">
            <input type="text" class="input-group" v-model="userInformation.ccv" @keyup="validate(userInformation.ccv, cvv,'ccv')">
        </div>
        <div class="col-12">
            <button class="btn btn-success" @click="submit()" :disabled="submitAllowed">Checkout</button>
        </div>
    </div>
</template>