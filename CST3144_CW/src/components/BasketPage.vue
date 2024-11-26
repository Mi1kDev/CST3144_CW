<script setup>
    import DataManager from '@/classes/dataManager.js';
    import BasketItem from './BasketItem.vue';
    import {reactive, ref} from 'vue'

    const emit = defineEmits(['basketRemoveItem', 'clearBasket', 'goHome'])
    const props = defineProps(['basket', 'pageState'])
    const userInformation = reactive({
        name: "",
        phoneNumber: "",
    })
    const validation = {
        name: false,
        phoneNumber: false,
    }
    const checkoutStatus = reactive({
        title: "",
        message: ""
    })

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
            let i = {lessonId: obj.lessonId, property: {type: ["availableSlots", "maxSlots"], value: [(obj.maxSlots - obj.qty), (obj.maxSlots - obj.qty)]}}
            lessonSimple.push(i)
        }
        console.log(lessonSimple)
        try{
            const response = await fetch("https://cst3144-cw-express.onrender.com/update", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(lessonSimple)
            })
            const data = await response.json()
            console.log(data)
        }catch(err){
            if(err){throw err}
        }
        
    }

    function resetFields(){
        userInformation.name = ""
        userInformation.phoneNumber = ""
        emit('clearBasket')
    }

    function backToHomePage(){
        emit('goHome')
    }

    function showConfirmationModal(){
        const modal = document.getElementById("confirmationModal")
        const modalEl = new bootstrap.Modal(modal)
        modal.addEventListener("hide.bs.modal", ()=>{
            backToHomePage()
        })
        checkoutStatus.title = "Order placed successfully!"
        checkoutStatus.message = "Thank you for using the Learning Society!"
        modalEl.show()
    }

    async function submit(){
        let success = await submitOrder()
        if(success){
            console.log("RESET")
            await updateLesson()
            resetFields()
            showConfirmationModal()   
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
        <div class="modal fade" tabindex="-1" id="confirmationModal" data-bs-backrop="static" data-bs-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ checkoutStatus.title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>{{ checkoutStatus.message }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4 px-3 py-2 mt-3">
            <div class="overflow-auto off-white rounded-top p-2 basketPage">
                <BasketItem
                v-for="(item, key) in basket"
                :key="key"
                :item="item"
                @remove-from-basket="emitSignal"
                />
            </div>
            <div class="checkout rounded-bottom burgundy text-light">
                <p>Total: £{{ calculateTotal() }}</p>
            </div>
        </div>
        <div class="col-8 mt-3 checkoutSect h-100">
            <div class="w-100 h-100 d-flex flex-column flex-grow-1 justify-content-center align-items-center mx-auto">
                <div class="checkoutInput w-75 h-75 d-flex flex-column justify-content-center p-5 text-light border border-3 border-white checkoutContainer">
                    <h3>Please enter details to place your order.</h3>
                    <div>
                        <label for="userName" class="form-label">Name</label>
                        <input id="userName" type="text" class="form-control" v-model="userInformation.name" @keyup="validate(userInformation.name, basicText,'name')">
                    </div>
                    <div>
                        <label for="phoneNum" class="form-label">Phone Number</label>
                        <input id="phoneNum" type="number" class="form-control" v-model="userInformation.phoneNumber" @keyup="validate(userInformation.phoneNumber, phoneNumber,'phoneNumber')">
                    </div>
                    <button class="btn btn-success" @click="submit()" :disabled="isDisabled">Checkout</button>
                </div>
            </div>
              
        </div>  
    </div>
</template>