<template>
	<body id="body">
        <header id="header">
            <Header/>
        </header>

        <div class="container">
            <div class="row">
                <!-- Фильтры -->
                <div class="col-md-auto filters">
                    <h6 class="text-left mt-4">ЖАНРЫ</h6>

                    <div id="genres">
                        <BlockGenres v-for="value in arrayGenres" :key="value.idGenres" :id1="value.idGenres" :nameGenre1="value.genre"/>
                    </div>

                    <h6 class="text-left mt-4">ГОД</h6>
                    <div class="form-check inputYear filter">
                        <div class="input-group inputYear mb-3">
                            <input type="number" class="form-control" id="inputYear1" min="1980" max="2020" placeholder="1980">
                            <span class="input-group-text">-</span>
                            <input type="number" class="form-control" id="inputYear2" min="1981" max="2021" placeholder="2021">
                        </div>
                    </div>

                    <h6 class="text-left mt-4">РЕЙТИНГ</h6>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="radio" value="9" id="r1" name="rating" />
                        <label class="form-check-label" for="r1">9+</label>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="radio" value="8" id="r2" name="rating" />
                        <label class="form-check-label" for="r2">8+</label>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="radio" value="7" id="r3" name="rating" />
                        <label class="form-check-label" for="r3">7+</label>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="radio" value="6" id="r4" name="rating" />
                        <label class="form-check-label" for="r4">6+</label>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="radio" value="5" id="r5" name="rating" />
                        <label class="form-check-label" for="r5">5+</label>
                    </div>

                    <div class="sort">
                        <select class="form-select selectSort">
                            <option selected>Сортировать по:</option>
                            <option value="1">Алфавиту</option>
                            <option value="2">Году</option>
                            <option value="3">Рейтингу</option>
                        </select>
                    </div>
                    
                    <button type="button" class="btn btn-outline-primary buttonCommitFilter">
                        Использовать фильтры
                    </button>

                </div>

                <div class="col-md films mx-4" id="blockFilms">
                    <!-- Фильмы -->
                    <div class="row movies" id="films">
                        <BlockFilm v-for="value in arrayFilms" :key="value.id" :nameFilm1="value.nameFilm" :imgPoster1="value.imgPoster" :jenre1="value.jenre_1" :rating1="value.rating" :yearOfMake1="value.yearOfMake"/>
                    </div>

                    <!-- Тулбар -->
                    <div class="row movies row-cols-3">
                        <ul class="pagination">
                            <li class="page-item">
                                <button class="page-link prev" disabled>Предыдущая</button>
                            </li>

                            <li class="page-item">
                                <p class="pageOfFilm">{{indexOfPage}}</p>
                            </li>

                            <li class="page-item">
                                <button class="page-link next">Следующая</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <footer class="footer pt-4">
            <Footer/>
        </footer>
    </body>
</template>

<script>
    import BlockFilm from '../components/mainPage/blockFilm.vue'
    import BlockGenres from '../components/mainPage/blockGenres.vue'
    import Header from '../components/header.vue'
    import Footer from '../components/footer.vue'
	export default {
  		name: 'mainPage',
  		components: {
    		BlockFilm,
            BlockGenres,
            Header,
            Footer
  		},
		data() {
			return {
				arrayFilms: this.$root.$data.arrayFilms,
                arrayGenres: this.$root.$data.arrayGenres,
                indexOfPage: this.$root.$data.indexOfPage
			}
		}
	}
</script>