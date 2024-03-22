<template>
    <div id="app" class="profil">
        <div class="container container--bleu">
            <div class="container__left">

                <div class="logo-bg-white">
                    <img src="/public/images/logo-glasses.svg" alt="">
                </div>

                <router-link link to="/" class="btn btn--blue btn--round"><img src="/images/back_door.svg" aria-label="Retourner au menu" alt="Retour au menu"></router-link>

            </div>

            <div class="container__middle">

                <div class="title">
                    <h1>Ton profil</h1>
                    <div class="green-bar green-bar--blue"></div>
                </div>

                <div class="tableau tableau--blue">
                    <table>
                        <tr>
                            <th>Niveau</th>
                            <th>Parties jouées</th>
                            <th>Meilleur temps</th>
                            <th>Classement</th>
                        </tr>

                        <tr>
                            <td>Facile</td>
                            <td>32</td>
                            <td>1 min 02sec</td>
                            <td>3e</td>
                        </tr>

                        <tr>
                            <td>Moyen</td>
                            <td>18</td>
                            <td>1 min 37sec</td>
                            <td>2e</td>
                        </tr>

                        <tr>
                            <td>Difficile</td>
                            <td>4</td>
                            <td>2 min 19sec</td>
                            <td>15e</td>
                        </tr>

                        <tr>
                            <td>Difficile</td>
                            <td>4</td>
                            <td>2 min 19sec</td>
                            <td>15e</td>
                        </tr>

                        <tr>
                            <td>Difficile</td>
                            <td>4</td>
                            <td>2 min 19sec</td>
                            <td>15e</td>
                        </tr>

                        <tr>
                            <td>Difficile</td>
                            <td>4</td>
                            <td>2 min 19sec</td>
                            <td>15e</td>
                        </tr>

                        <tr>
                            <td>Difficile</td>
                            <td>4</td>
                            <td>2 min 19sec</td>
                            <td>15e</td>
                        </tr>

                        <tr>
                            <td>Difficile</td>
                            <td>4</td>
                            <td>2 min 19sec</td>
                            <td>15e</td>
                        </tr>
                    </table>

                    

                </div>

                <router-link to="/mentions-legales" class="at-bottom"><p class="underline">Mentions Légales</p></router-link>

            </div>

            <div class="container__right">
                <router-link to="/logout" class="btn btn--round btn--blue"><img src="/public/images/logout.svg" alt="logout icon"></router-link>
            </div>

        </div>
    </div>
</template>