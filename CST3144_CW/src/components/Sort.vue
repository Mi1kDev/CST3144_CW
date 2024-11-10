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
    <div>
        <button class="btn btn-light" @click="setIsAscending(true)">Ascending</button>
        <button class="btn btn-light" @click="setIsAscending(false)">Descending</button>
        <label for="sortVal">Sort By:</label>
        <select @change="e => $emit('update:sortVal',e.target.value)" class="form-select-sm" name="sortVal" id="sortVal">
            <option value="0">Lesson Name</option>
            <option value="2">Location</option>
            <option value="3">Cost</option>
            <option value="4">Available Slots</option>
        </select>
    </div>
</template>
