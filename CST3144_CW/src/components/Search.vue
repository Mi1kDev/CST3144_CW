<script setup>
    import {ref, watch} from 'vue';
    // imports datamanager class for use
    import DataManager from '@/classes/dataManager.js';
    // define emit signals
    const emit = defineEmits(['found'])
    // get a reference to the dataManager
    const dataManager = DataManager.getInstance()
    let searchTerm = ref("")
    let isReqActive = false
    // an abort controller attached to prior requests
    let prevController = new AbortController()
    // checks for changes in the searchterm variable
    watch(searchTerm, async(newSearchTerm, oldSearchTerm) =>{
        // if the  search term is different then a search fetch request is made to the back end
        if(newSearchTerm !== oldSearchTerm){
            try{
                // creates a new abort controller for each request
                const currentController = new AbortController()
                // removes operators that may interfere with the regex search utilized by the back end
                let disallowedOperators = ['*', '.', '+', '/', '\\', '[', ']', '(', ')', '{', '}']
                for(let operator of disallowedOperators){
                    newSearchTerm = newSearchTerm.replace(operator, '')
                }
                // if a request is already active and the watch function has been called again then it means this request is more recent and the old can be discarded
                if(isReqActive){
                    // the old request is aborted
                    prevController.abort("New request made")
                    // the boolean is changed to reflect that there is no longer any requests active
                    isReqActive = false
                }
                // if there are no requests active then the boolean is changed to reflect that there is now a request active
                if(!isReqActive){
                    isReqActive = true
                    // if there were no requests active and this statement is reached then the old abort controller is no longer necessary and the current one is now registered as the old controller
                    prevController = currentController
                }
                // if the search term is empty then performs a regex search for everything on the backend
                if(newSearchTerm === ""){
                    newSearchTerm = ".*"
                }
                // makes a fetch request to the back end using the search query as a url parameter
                let resp = await fetch("https://cst3144-cw-express.onrender.com/search/" + newSearchTerm, {
                    method: 'get',
                    signal: currentController.signal,
                })
                // if the request completes then the request is no longer active and the boolean is changed to reflect that
                isReqActive = false
                // parses the response object
                let respObj = await resp.json()
                // extracts the returned data from the response object
                let lessons = respObj.value
                dataManager.setProductList(lessons)
                // emits a signal to the parent component, letting it know that search results have been found
                emit('found')
            }catch(err){
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