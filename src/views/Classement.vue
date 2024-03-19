<script>
    import '../assets/styles.css'; 
</script>

<template>
    <div class="classement">

        <div class="container container__classement">

            <div class="container__left">
            <router-link to="/"><img src="/public/images/logo_glasses.svg" alt=""></router-link>
            
            <router-link to="/" class="btn btn--green btn--round"><img src="/images/back_door.svg" aria-label="retourner au menu"></router-link>

        </div>
        <div class="container__middle">

            <div class="title">
                <h1>CLASSSEMENT</h1>
                <div class="green-bar"></div>
            </div>

            <div class="tableau">
                
                <table>
                <tr>
                    <th>Top</th>
                    <th>Temps</th>
                    <th>Pseudo</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>00:00:00</td>
                    <td>Enzo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>00:00:00</td>
                    <td>Julien</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>00:00:00</td>
                    <td>Amandine</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>00:00:00</td>
                    <td>Alyson</td>
                </tr>
            </table>
            </div>
            <div class="niveau">
                <button class="btn btn--facile">Facile</button>
                <button class="btn btn--moyen">Intermédiaire</button>
                <button class="btn btn--difficile">Difficile</button>
                
                
            </div>
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