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
    <div class="input-group">
        <span class="input-group-text burgundy text-light"><i class="fa fa-search" aria-hidden="true"></i></span>
        <input type="text" class="form-control border-dark" v-model="searchTerm">
    </div>
</template>