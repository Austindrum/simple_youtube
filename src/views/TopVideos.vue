<template>
    <div>
        <h1>Top 100 Video</h1>
        <div style="display: flex;flex-wrap: wrap">
            <div style="width: 320px" v-for="video in pageListData" :key="video.id">
                <img :src="video.image" alt="video">
                <p>{{video.duration}}</p>
                <router-link :to="{name: 'video', params: {id: video.id}}">{{video.title}}</router-link>
                <p>{{video.description}}</p>
            </div>
        </div>
        <Paginate
            :page-count="pageNum"
            :prev-text="'<<'"
            :next-text="'>>'"
            :click-handler="pageCallBack"
        />
    </div>
</template>

<script>
import axios from "axios";
import moment from 'moment';

export default {
    data() {
        return {
            videos: {},
            pageSize: 8,
            pageNum: 1,
            currentPage: 1
        }
    },
    methods: {
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
        timeFormat(milliseconds){
            function pad(n, z) {
                z = z || 2;
                return ('00' + n).slice(-z);
            }
            let duration = moment.duration(milliseconds).asMilliseconds()
            let ms = duration % 1000;
            duration = (duration - ms) / 1000;
            let secs = duration % 60;
            duration = (duration - secs) / 60;
            let mins = duration % 60;
            let hrs = (duration - mins) / 60;
            
            return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
        },
        async getVideos(){
            const vm = this;
            await axios.get(`${process.env.VUE_APP_YOUTUBE_URL}?part=snippet&part=contentDetails&key=${process.env.VUE_APP_YOUTUBE_API_KEY}&chart=mostPopular&maxResults=100`)
            .then(res=>{
                vm.videos = res.data.items.map(item=> ({
                    id: item.id,
                    title: item.snippet.title,
                    duration: this.timeFormat(item.contentDetails.duration),
                    description: item.snippet.description.substring(0, 50),
                    image: item.snippet.thumbnails.medium.url
                }))
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

<style lang="">
    
</style>