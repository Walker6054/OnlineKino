<template>
    <div class="card film mx-3 mt-1 mb-3" style="width: 16rem;">
        <img class="card-img-top" style="height: 24rem;" :src="imgPoster1" :alt="nameFilm1">
        <div class="card-body text-center pt-3 pb-3">
            <div class="justify-content-center align-items-center mb-3 d-flex" style="height: 64px;">
                <h5 class="card-title mb-0">{{nameFilm1}}</h5>
            </div>
            <div class="align-items-center mb-3 d-flex" style="height: 30px;">
                <div class="janri text-left mb-0 mx-2 px-0"><small>{{genres1}}</small></div>
            </div>
            <div class="row mb-3">
                <div class="col text-left ">
                    <p class="mb-0 mx-2 px-0">{{rating1}}<img src="/static/image/star.png" alt="star" class="ml-1"></p>
                </div>
                <div class="col text-right">
                    <p class="mb-0 mx-2 px-0">{{yearOfMake1}}</p>
                </div>
            </div>
            <a :id="id1" class="btn btn-outline-dark btn-block btn-film buttonGotoFilm">Смотреть</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BlockFilm',
        props: {
            nameFilm1: String,
            genres1: String,
            rating1: String,
            yearOfMake1: String,
            imgPoster1: String,
            id1: Number
        }
    }
</script>
