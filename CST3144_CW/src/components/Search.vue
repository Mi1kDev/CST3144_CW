<script setup>
    import { socket } from '../socket.js';
    import {ref, watch} from 'vue';
    let searchTerm = ref("")
    watch(searchTerm, (newSearchTerm, oldSearchTerm) =>{
        if(newSearchTerm !== oldSearchTerm){
            let x = newSearchTerm
            socket.emit("search", x)
        }
    })
</script>
<template>
    <div class="input-group mb-3">
        <span class="input-group-text">Search</span>
        <input type="text" class="form-control" v-model="searchTerm">
        <button class="btn btn-light">Search</button>
    </div>
</template>