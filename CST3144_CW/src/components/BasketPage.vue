<script setup>
    import BasketItem from './BasketItem.vue';
    import {reactive, ref} from 'vue'

    // define signals and props for the component
    const emit = defineEmits(['basketRemoveItem', 'clearBasket', 'goHome'])
    const props = defineProps(['basket', 'pageState'])
    // object keeping track of the name and phonenumber entered by the user
    const userInformation = reactive({
        name: "",
        phoneNumber: "",
    })
    // object to store whether or not the user entered information is valid or not
    const validation = {
        name: false,
        phoneNumber: false,
    }
    // object to store modal message information
    const checkoutStatus = reactive({
        title: "",
        message: ""
    })

    // regex for validation
    const basicText = new RegExp("[a-zA-Z]+")
    const phoneNumber = new RegExp("^([0-9]{11})$")

    // initial state for the checkout button
    let isDisabled = ref(true)

    // calculates the total cost of all lessons in the basket
    function calculateTotal(){
        let total = 0
        for(let obj of props.basket){
            total += obj.qty * obj.price
        }
        return total
    }
    // informs the parent component when a item is removed as well as the item that was removed
    function emitSignal(name){
        emit('basketRemoveItem', name)
    }
    // strips unneeded properties from items in the basket
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
    // submits the user's order
    async function submitOrder(){
        let success = false
        // constructs order object that will be stored in the database
        const order = {
            name: userInformation.name,
            phoneNumber: userInformation.phoneNumber,
            orders: stripBasket()
        }
        try{
            // posts order information to the back end
            const response = await fetch("https://cst3144-cw-express.onrender.com/order", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(order)
            })
            const data = await response.json()
            // if the order was placed successfully then this information is returned
            if(data.status.value){
                success = true
                return success
            }
        }catch(err){
            if(err){throw err}
        }
        return success
    }
    // updates the properties of lessons in the database with new properties
    async function updateLesson(){
        let lessonSimple = []
        // calculates the updated number of slots for each lesson in the basket and stores them in an object
        for(let obj of props.basket){
            let i = {lessonId: obj.lessonId, property: {type: ["availableSlots", "maxSlots"], value: [(obj.maxSlots - obj.qty), (obj.maxSlots - obj.qty)]}}
            lessonSimple.push(i)
        }
        // makes a fetch to the backend with the formatted data
        try{
            const response = await fetch("https://cst3144-cw-express.onrender.com/update", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(lessonSimple)
            })
            const data = await response.json()
        }catch(err){
            if(err){throw err}
        }
        
    }
    // resets the basket and any user input fields
    function resetFields(){
        userInformation.name = ""
        userInformation.phoneNumber = ""
        emit('clearBasket')
    }
    // lets the parent component know to return to the home page
    function backToHomePage(){
        emit('goHome')
    }
    // shows confirmation message to the user informing them that the order was successful
    function showConfirmationModal(title, message){
        const modal = document.getElementById("confirmationModal")
        const modalEl = new bootstrap.Modal(modal)
        modal.addEventListener("hide.bs.modal", ()=>{
            backToHomePage()
        })
        checkoutStatus.title = title
        checkoutStatus.message = message
        modalEl.show()
    }
    // submits the order 
    async function submit(){
        let success = await submitOrder()
        // if the order was placed successfully
        if(success){
            // updates the lessons to reflect the changes made
            await updateLesson()
            // resets fields
            resetFields()
            // shows a confirmation message
            showConfirmationModal("Order placed successfully.", "Thank you for using the Learning Society!")   
        }else{
            // shows error message
            showConfirmationModal("Error", "Something went wrong!")
        }
        
    }
    // determines if the checkout button should be active or not
    function isValid(){
        isDisabled.value =  !(validation.name && validation.phoneNumber)
    }
    // checks if input string matches input regex
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