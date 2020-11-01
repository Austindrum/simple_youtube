<template>
    <div class="main">
        <loading :active.sync="isLoading"></loading>
        <h1>Your Favorites</h1>
        <div class="cards">
            <template v-if="videos">
                <div class="card" v-for="video in pageListData" :key="video.id">
                    <img :src="video.image" alt="video-picture">
                    <p class="duration">{{video.duration}}</p>
                    <div class="link">
                        <router-link :to="{name: 'video', params: {id: video.id}}">{{video.title}}...</router-link>
                    </div>
                    <p class="description">{{video.description}}...</p>
                    <div class="btn">
                        <button class="favorite" @click.prevent="editFavorite(video.id)"><i class="fas fa-heart fa-lg"></i></button>
                    </div>
                </div>
            </template>
            <template>
                <div class="empty-title">
                    {{ emptyMessage }}
                </div>
            </template>
        </div>
        <Paginate
            :page-count="pageNum"
            :prev-text="'<<'"
            :prev-class="'page-item'"
            :next-text="'>>'"
            :next-class="'page-item'"
            :click-handler="pageCallBack"
            :page-class="'page-item'"
            :container-class="'pagination'"
        />
    </div>
</template>

<script>
import axios from 'axios';
import helpers from '../utils/helpers';
export default {
    name: "Favorites",
    data() {
        return {
            videos: [],
            pageSize: 8,
            pageNum: 1,
            currentPage: 1,
            isLoading: false,
            emptyMessage: ""
        }
    },
    methods: {
        editFavorite(id){
            helpers.editFavorite(id);
            this.videos.forEach(video=>{
                if(video.id === id){
                    video.isFavorite = !video.isFavorite;
                }
            })
            this.getFavorites();
        },
        pageCallBack(num){
            this.currentPage = num;
        },
        setPageNum(){
            this.pageNum = Math.ceil(this.videos.length / this.pageSize);
            this.videos.forEach((video, key)=>{
                this.$set(video, "page", parseInt( key / this.pageSize) + 1);
                this.$set(video, "num", key + 1);
            })
        },
        async getFavorites(){
            let vm =this;
            vm.isLoading = true;
            let favorites = JSON.parse(localStorage.getItem("allied_favorites_videos")) || [];
            if(favorites.length > 0){
                let temp = ``;
                favorites.forEach(favorite=>{
                    temp += `&id=${favorite}`;
                })
                await axios.get(`${process.env.VUE_APP_YOUTUBE_URL}?part=snippet&part=contentDetails&key=${process.env.VUE_APP_YOUTUBE_API_KEY}${temp}`).then(res=>{
                    console.log(res);
                    vm.videos = res.data.items.map(item=> ({
                        id: item.id,
                        title: item.snippet.title.substring(0, 40),
                        duration: helpers.timeFormat(item.contentDetails.duration),
                        description: item.snippet.description.substring(0, 50),
                        image: item.snippet.thumbnails.medium.url,
                        isFavorite: helpers.isFavorite(item.id)
                    }))
                }).then(()=>{
                    vm.isLoading = false;
                })
            }else{
                this.isLoading = false;
                this.emptyMessage = "No Favorites";
            }
        }
    },
    computed: {
        pageListData: function(){
            if(this.videos && this.videos.length > 0){
                return this.videos.filter(video=>{
                    return video.page === this.currentPage;
                })
            }
            return [];
        }
    },
    watch: {
        videos: function (){
            this.setPageNum();
        }
    },
    created() {
        this.getFavorites();
    },
}
</script>

<style>
.empty-title{
    width: 100%;
    margin-top: 30px;
    text-align: center;
    font-size: 30px;
    font-weight: 800;
}
</style>