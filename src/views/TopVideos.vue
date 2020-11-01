<template>
    <div class="main">
        <loading :active.sync="isLoading"></loading>
        <h1>Top 50 Popular Video</h1>
        <div class="cards">
            <div class="card" v-for="video in pageListData" :key="video.id">
                <img :src="video.image" alt="video-picture">
                <p class="duration">{{video.duration}}</p>
                <div class="link">
                    <router-link :to="{name: 'video', params: {id: video.id}}">{{video.title}}...</router-link>
                </div>
                <p class="description">{{video.description}}...</p>
                <div class="btn">
                    <button :class="{ favorite: video.isFavorite }" @click.stop.prevent="editFavorite(video.id)"><i class="fas fa-heart fa-lg"></i></button>
                </div>
            </div>
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
import axios from "axios";
import helpers from '../utils/helpers';

export default {
    data() {
        return {
            videos: [],
            pageSize: 8,
            pageNum: 1,
            currentPage: 1,
            isLoading: false
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
        async getVideos(){
            const vm = this;
            vm.isLoading = true;
            await axios.get(`${process.env.VUE_APP_YOUTUBE_URL}?part=snippet&part=contentDetails&key=${process.env.VUE_APP_YOUTUBE_API_KEY}&chart=mostPopular&maxResults=100`)
            .then(res=>{
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
        this.getVideos();
    },
}
</script>

<style>
.favorite{
    color: red
}
.pagination {
    display: flex;
    justify-content:flex-end;
    padding: 16px 16px;
    font-size: 18px;
}
.pagination .page-item{
    padding: 8px;
    border: 1px solid #D7D7D7;
}
.pagination .page-item.active{
    background-color: #D7D7D7;
    color: white;
}
.pagination .page-item a{
    text-decoration: none;
    outline: none;
}
@media screen and (max-width: 426px) {
    .main{
        padding: 0 8px;
    }
    .main h1{
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        padding: 8px 0px;
    }
    .main .cards{
        display: flex;
        flex-wrap: wrap
    }
    .main .cards .card{
        width: 320px;
        margin: 0 auto;
        padding: 8px;
        position: relative;
    }
    .main .cards .card img{
        border-radius: 8px;
        opacity: .8;
    }
    .main .cards .card .duration{
        position: absolute;
        top: 160px;
        right: 16px;
        background-color: black;
        color: white;
        padding: 2px;
        border-radius: 2px;
    }
    .main .cards .card .link{
        margin: 8px 0px;
    }
    .main .cards .card .link a{
        text-decoration: none;
        color: black;
        font-weight: 600;
    }
    .main .cards .card .description{
        font-size: 12px;
    }
    .main .cards .card .btn{
        position: absolute;
        top: 24px;
        right: 16px;
    }
    .main .cards .card .btn button{
        border: none;
        background-color: transparent;
        outline: none;
    }
}

</style>