<template>
	<body id="body">
        <header id="header">
            <Header/>
        </header>

        <div class="container mt-4">
            <div class="row">
                <!-- Фильтры -->
                <div class="col-md-auto filters mt-4">
                    <h6 class="text-left mt-4">ЖАНРЫ</h6>

                    <div id="genres">
                        <BlockGenres v-for="value in arrayGenres" :key="value.idGenres" :id1="value.idGenres" :nameGenre1="value.genre"/>
                    </div>

                    <h6 class="text-left mt-4">ГОД</h6>
                    <div class="form-check inputYear filter">
                        <div class="input-group inputYear mb-3">
                            <input type="text" class="form-control" id="inputYear1" placeholder="1990">
                            <span class="input-group-text">-</span>
                            <input type="text" class="form-control" id="inputYear2" placeholder="2021">
                        </div>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="checkbox" value="" id="y1"/>
                        <label class="form-check-label" for="y1">2021</label>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="checkbox" value="" id="y2"/>
                        <label class="form-check-label" for="y2">2020</label>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="checkbox" value="" id="y3" />
                        <label class="form-check-label" for="y3">2019</label>
                    </div>


                    <h6 class="text-left mt-4">РЕЙТИНГ</h6>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="checkbox" value="" id="r1" />
                        <label class="form-check-label" for="r1">9+</label>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="checkbox" value="" id="r2" />
                        <label class="form-check-label" for="r2">8+</label>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="checkbox" value="" id="r3" />
                        <label class="form-check-label" for="r3">7+</label>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="checkbox" value="" id="r4" />
                        <label class="form-check-label" for="r4">6+</label>
                    </div>
                    <div class="form-check filter ml-2 mb-1">
                        <input class="form-check-input" type="checkbox" value="" id="r5" />
                        <label class="form-check-label" for="r5">5+</label>
                    </div>

                </div>

                <div class="col-md films mx-4">
                    <!-- Сортировка -->
                    <div class="sort text-right mx-3">
                        <a>
                            <input type="button" value="BEST" />
                            <img class="ml-1 mb-1" src="" alt="" />
                        </a>
                        <input type="button" value="POPULAR" />
                        <hr class="mt-0" width="100%" size="1" color="#6C6C6C" />
                    </div>

                    <!-- Фильмы -->
                    <div class="row movies" id="films">
                        <BlockFilm v-for="value in arrayFilms" :key="value.id" :nameFilm1="value.nameFilm" :imgPoster1="value.imgPoster" :jenre1="value.jenre_1" :rating1="value.rating" :yearOfMake1="value.yearOfMake"/>
                    </div>

                    <!-- Тулбар -->
                    <div class="row movies row-cols-3">
                        <ul class="pagination">
                            <li class="page-item disabled">
                                <button class="page-link prev" disabled>Предыдущая</button>
                            </li>

                            <li class="page-item">
                                <p class="">2</p>
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
                arrayGenres: this.$root.$data.arrayGenres
			}
		}
	}
    //<BlockFilm v-for="value in arrayFilms" :key="value.id" :nameFilm1="value.nameFilm" :imgPoster1="value.imgPoster" :jenre1="value.jenre_1" :rating1="value.rating" :yearOfMake1="value.yearOfMake"/>
    //<BlockGenres v-for="value in arrayGenres" :key="value.idGenres" :id1="value.idGenres" :nameGenre1="value.genre"/>
</script>