<script setup>
    import {ref} from "vue";
    // define signals and props used by the component
    const emit = defineEmits(['setIsAsc', 'update:sortVal'])
    const props = defineProps({
        sortVal: {
            required: true,
        }
    })
    const sortVal = ref(props.sortVal)
    // emits a signal to the parent component informing it to change whether or not the sort should be ascending or descending
    function setIsAscending(value){
        emit('setIsAsc', value)
    }

</script>
<template>
    <div class="text-light burgundy rounded fitContent">
        <label class="form-check-label" for="Ascending">Ascending</label>
        <!-- radio which sets the sort value for ascending to be true -->
        <input class="form-check-input" type="radio" name="Ascending" checked @click=setIsAscending(true)>
        <label class="form-check-label" for="Descending">Descending</label>
        <!-- radio which sets the sort value for ascending to be false (descending). Radios are mutually exclusive -->
        <input class="form-check-input" type="radio" name="Descending" @click="setIsAscending(false)">
        <label for="sortVal">Sort By:</label>
        <!-- emits a signal to the parent component whenever a change is made to what type of category the sort should be made using -->
        <select @change="e => $emit('update:sortVal',e.target.value)" class="form-select-sm burgundy text-light border-0" name="sortVal" id="sortVal">
            <option value="0">Lesson Name</option>
            <option value="1">Location</option>
            <option value="2">Cost</option>
            <option value="3">Available Slots</option>
        </select>
    </div>
</template>
