<template>
	<div class="col-md films mx-4" id="blockFilms">
		<div class="row backToMain" v-if="flagSearching">
			<div class="col-6 col-md-6 colHeadFilter">
				<button class="buttonbackToMain">
					Вернуться на главную страницу
				</button>
			</div>
			<div class="col-6 col-md-6 colHeadFilter">
				<p class="textResult">
					Результаты поиска:
				</p>
			</div>
		</div>

		<div class="row backToMain" v-if="!flagSearching">
			<div class="col-6 col-md-6 colHeadFilter">
				<button class="buttonbackToMain">
					Вернуться на главную страницу
				</button>
			</div>
			<div class="col-6 col-md-6 colHeadFilter">
				<p class="textResult">
					Совпадений не найдено
				</p>
			</div>
		</div>

        <div class="row movies" id="films" v-if="flagSearching">
            <BlockFilm v-for="value in arrayFilms" :key="value.id" :id1="value.idfilms" :nameFilm1="value.nameFilm" :imgPoster1="value.imgPoster" :genres1="value.genres" :rating1="value.rating" :yearOfMake1="value.yearOfMake"/>
        </div>
    </div>

</template>

<script>
    import BlockFilm from '../components/mainPage/blockFilm.vue'
	export default {
  		name: 'films',
  		components: {
    		BlockFilm
  		},
		data() {
			return {
				arrayFilms: this.$root.$data.arrayFilms,
				flagSearching: this.$root.$data.flagSearching
			}
		}
	}
</script>

