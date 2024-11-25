<script setup>
    // import { socket } from '../socket.js';
    import {ref, watch} from 'vue';
    import DataManager from '@/classes/dataManager.js';
    
    const emit = defineEmits(['found'])

    const dataManager = DataManager.getInstance()
    let searchTerm = ref("")
    let isReqActive = false
    let prevController = new AbortController()
    watch(searchTerm, async(newSearchTerm, oldSearchTerm) =>{
        if(newSearchTerm !== oldSearchTerm){
            try{
                const currentController = new AbortController()
                let disallowedOperators = ['*', '.', '+', '/', '\\', '[', ']', '(', ')', '{', '}']
                for(let operator of disallowedOperators){
                    newSearchTerm = newSearchTerm.replace(operator, '')
                }
                if(isReqActive){
                    prevController.abort("New request made")
                    isReqActive = false
                }
                if(!isReqActive){
                    isReqActive = true
                    prevController = currentController
                }
                if(newSearchTerm === ""){
                    newSearchTerm = ".*"
                }

                let resp = await fetch("https://cst3144-cw-express.onrender.com/search/" + newSearchTerm, {
                    method: 'get',
                    signal: currentController.signal,
                })
                isReqActive = false
                let respObj = await resp.json()
                let lessons = respObj.value
                dataManager.setProductList(lessons)
                emit('found')
            }catch(err){
                console.log(err)
            }    
        }
    })
</script>
<template>
    <div class="input-group">
        <span class="input-group-text burgundy text-light"><i class="fa fa-search" aria-hidden="true"></i></span>
        <input type="text" class="form-control border-dark" v-model="searchTerm">
    </div>
</template>