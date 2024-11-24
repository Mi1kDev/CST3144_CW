<script setup>
    import {ref} from "vue";
    const emit = defineEmits(['setIsAsc', 'update:sortVal'])
    const props = defineProps({
        sortVal: {
            required: true,
        }
    })
    const sortVal = ref(props.sortVal)
    function setIsAscending(value){
        emit('setIsAsc', value)
    }

</script>
<template>
    <div class="text-light burgundy rounded fitContent">
        <label class="form-check-label" for="Ascending">Asc.</label>
        <input class="form-check-input" type="radio" name="SortVal" checked @click=setIsAscending(true)>
        <label class="form-check-label" for="Descending">Dsc.</label>
        <input class="form-check-input" type="radio" name="SortVal" @click="setIsAscending(false)">
        
        <!-- <button class="btn btn-light" @click="setIsAscending(true)">Ascending</button>
        <button class="btn btn-light" @click="setIsAscending(false)">Descending</button> -->
        <label for="sortVal">Sort By:</label>
        <select @change="e => $emit('update:sortVal',e.target.value)" class="form-select-sm burgundy text-light border-0" name="sortVal" id="sortVal">
            <option value="0">Lesson Name</option>
            <option value="1">Location</option>
            <option value="2">Cost</option>
            <option value="3">Available Slots</option>
        </select>
    </div>
</template>
