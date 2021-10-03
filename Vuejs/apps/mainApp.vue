<template>
  	<div class="row movies" id="films" name="1">
		<BlockFilm v-for="value in arrayFilms" :key="value.id" :nameFilm1="value.nameFilm" :imgPoster1="value.imgPoster" :jenre1="value.jenre_1" :rating1="value.rating" :yearOfMake1="value.yearOfMake"/>
  	</div>
</template>

<script>
    import BlockFilm from '../components/blockFilm.vue'
	export default {
  		name: 'films',
  		components: {
    		BlockFilm
  		},
		data() {
			return {
				arrayFilms: this.$root.$data.arrayFilms
			}
		}
	}
</script>

