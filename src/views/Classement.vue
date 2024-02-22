<script>
    import '../assets/styles.css'; 
    
</script>

<template>
    <div class="classement">

        <div class="classement__left">
            <router-link to="/homepage">Home</router-link>
            <div class="niveau">
                <button class="btn btn--facile">Facile</button>
                <button class="btn btn--moyen">Intermédiaire</button>
                <button class="btn btn--difficile">Difficile</button>
                
                
            </div>
            <br>
            <button class="btn btn--green">jouer</button>
            <button class="btn btn--green">Niveau <i class="fa-solid fa-chevron-down"></i></button>

            <button class="btn btn--round btn--green">
                <i class="fa-solid fa-play"></i>
            </button>

        </div>
        <div class="classement__right">
            <div class="tableau">
                <h2 class="titre">Classement</h2>
                <table>
                <tr>
                    <th>Top</th>
                    <th>Temps</th>
                    <th>Date</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>00:00:00</td>
                    <td>01/01/2021</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>00:00:00</td>
                    <td>01/01/2021</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>00:00:00</td>
                    <td>01/01/2021</td>
                </tr>
            </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

    .niveau{
        display: flex;
        flex-direction: row;
        gap: 10px;
        // font-size: 0.8em;
    }



</style>