<template>
    <div class="nav-bar">
        <ul>
            <li class="nav-brand">
                <router-link to="/">BRAND</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/">Top Videos</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/favorites">Favorites</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "NavBar"
}
</script>

<style>
.nav-bar{
    background-color: #808080;
    padding: 24px;
}
.nav-bar ul {
    list-style: none;
    display: flex;
}
.nav-bar ul li a {
    text-decoration: none;
    letter-spacing: 2px;
    color: white;
}
.nav-bar ul li a:hover{
    color: #DCDCDC;
    text-decoration: underline;
}
.nav-bar ul li.nav-brand{
    font-size: 24px;
    font-weight: 700;
}
.nav-bar ul li.nav-item{
    margin-left: 32px;
    line-height: 24px;
    font-weight: 700;
}
/* mobile style */
@media screen and (max-width: 376px) {
    .nav-bar{
        padding: 0;
    }
    .nav-bar ul {
        display: block;
    }
    .nav-bar ul li.nav-brand{
        text-align: center;
        padding: 8px;
    }
    .nav-bar ul li.nav-item{
        display: inline-block;
        margin: 0;
        padding: 8px 0px;
        width: 50%;
        text-align: center;
    }
}
</style>