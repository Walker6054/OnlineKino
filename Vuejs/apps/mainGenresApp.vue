<template>
  	<div id="genres">
		<BlockGenres v-for="value in arrayGenres" :key="value.idGenres" :id1="value.idGenres" :nameGenre1="value.genre"/>
  	</div>
</template>

<script>
    import BlockGenres from '../components/mainPage/blockGenres.vue'
	export default {
  		name: 'genres',
  		components: {
    		BlockGenres
  		},
		data() {
			return {
				arrayGenres: this.$root.$data.arrayGenres
			}
		}
	}
</script>