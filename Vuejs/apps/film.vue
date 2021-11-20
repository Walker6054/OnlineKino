<template>
	<body id="body">
        <header id="header">
            <Header/>
        </header>

        <div class="container">
            <div class="row rowMain">
                <div class="col-5 col-md-5 colPoster">
                    <img class="imgPoster" :id="arrayFilm.idFilm" :src="arrayFilm.imgPoster">
                </div>
                <div class="col-7 col-md-7 colDescription">
                    <div class="row rowNameFilm">
                        <h1 class="textNameFilm">{{arrayFilm.nameFilm}}</h1>
                    </div>
                    <div class="row rowSlogan">
                        <p class="textSlogan">{{arrayFilm.slogan}}</p>
                    </div>

                    <div class="row rowInfo">
                        <div class="col-5 col-md-5 colHeadInfo">
                            <p class="textHeadInfo">Год производства:</p>
                        </div>
                        <div class="col-6 col-md-6 colInfo">
                            <p class="textInfo">{{arrayFilm.yearOfMake}}</p>
                        </div>
                    </div>

                    <div class="row rowInfo">
                        <div class="col-5 col-md-5 colHeadInfo">
                            <p class="textHeadInfo">Страна:</p>
                        </div>
                        <div class="col-6 col-md-6 colInfo">
                            <p class="textInfo">{{arrayFilm.countrys}}</p>
                        </div>
                    </div>

                    <div class="row rowInfo">
                        <div class="col-5 col-md-5 colHeadInfo">
                            <p class="textHeadInfo">Жанры:</p>
                        </div>
                        <div class="col-6 col-md-6 colInfo">
                            <p class="textInfo">{{arrayFilm.genres}}</p>
                        </div>
                    </div>

                    <div class="row rowInfo">
                        <div class="col-5 col-md-5 colHeadInfo">
                            <p class="textHeadInfo">Возраст:</p>
                        </div>
                        <div class="col-6 col-md-6 colInfo">
                            <p class="textInfo">{{arrayFilm.age}}</p>
                        </div>
                    </div>

                    <div class="row rowInfo">
                        <div class="col-5 col-md-5 colHeadInfo">
                            <p class="textHeadInfo">Продолжительность:</p>
                        </div>
                        <div class="col-6 col-md-6 colInfo">
                            <p class="textInfo">{{arrayFilm.time}}</p>
                        </div>
                    </div>

                    <div class="row rowInfo">
                        <div class="col-5 col-md-5 colHeadInfo">
                            <p class="textHeadInfo">Рейтинг:</p>
                        </div>
                        <div class="col-6 col-md-6 colInfo">
                            <p class="textInfo">{{arrayFilm.rating}} - {{arrayFilm.ratingFrom}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row rowTrailerHead">
                <h5 class="textHeadTrailer">Трейлер:</h5>
            </div>
            <div class="row rowTrailer">
                <div class="trailer col-md-auto text-center">
                    <iframe id="trailer" width="856" height="470" :src="arrayFilm.urlTrailer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <div class="row rowDescriptionFilm">      
                <h5 class="textHeadDescription">Описание фильма:</h5>
                <p class="textDescription">{{arrayFilm.description}}</p>
            </div>
        </div>

        <footer class="footer pt-4">
            <Footer/>
        </footer>
    </body>
</template>

<script>
    import Header from '../components/headerAll.vue'
    import Footer from '../components/footer.vue'
	export default {
  		name: 'filmPage',
  		components: {
            Header,
            Footer
  		},
		data() {
			return {
				arrayFilm: this.$root.$data.arrayFilm
			}
		}
	}
</script>