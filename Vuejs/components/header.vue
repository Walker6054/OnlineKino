<template>
    <nav class="navbar navbar-expand-lg navbar-dark py-1 navbar-custom">
        <div class="container">
            <a class="navbar-brand logo" href="#">OnlineKino</a>
            <div class="input-group blockSearch">
                <input type="text" class="form-control" id="inputSearch" placeholder="Введите название фильма">
                <button class="btn btn-outline-secondary" type="button" id="buttonSearch">Поиск</button>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>