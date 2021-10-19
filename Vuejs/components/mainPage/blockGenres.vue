<template>
    <div class="form-check filter ml-2 mb-1">
        <input class="form-check-input" type="checkbox" :id="'f'+id1"/>
        <label class="form-check-label" :for="'f'+id1">{{nameGenre1}}</label>
    </div>
</template>

<script>
    export default {
        name: 'BlockGenres',
        props: {
            nameGenre1: String,
            id1: Number
        }
    }
</script>