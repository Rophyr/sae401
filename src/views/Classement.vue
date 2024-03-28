<script>
    import '../assets/styles.css'; 

</script>

<template>
    <div class="classement">

        <div class="container container__classement">

            <div class="container__left">
                <div class="logo-bg-white">
                    <img src="/public/images/logo-glasses.svg" alt="">
                </div>
                        
            <router-link to="/" class="btn btn--green btn--round"><img src="/images/back_door.svg" aria-label="retourner au menu"></router-link>

        </div>
        <div class="container__middle">

            <div class="title">
                <h1>{{$t('classement.title')}}</h1>
                <div class="green-bar"></div>
            </div>

            <div class="tableau tableau--green">
                
                <table>
                <thead>
                    <tr>
                        <th>{{$t('classement.top')}}</th>
                        <th>{{$t('classement.temps')}}</th>
                        <th>{{$t('classement.pseudo')}}</th>
                    </tr>
                </thead>
                
                <tbody>
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
                </tbody>
            </table>
            </div>
            <div class="niveau">
                <button class="btn btn--facile">{{$t('home.facile')}}</button>
                <button class="btn btn--moyen">{{$t('home.moyen')}}</button>
                <button class="btn btn--difficile">{{$t('home.difficile')}}</button>
                
                
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