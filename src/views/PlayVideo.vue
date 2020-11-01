<template>
    <div class="single-video">
        <div class="video-block">
            <div class="advertising" v-if="isPause">
                <p style="color: black;">advertising</p>
            </div>
            <video
            id="myVideo"
            class="video-js vjs-default-skin"
            >
            <!-- data-setup= '{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }' -->
            </video>
        </div>
        <div class="info">
            <h4 class="title">{{video.title}}</h4>
            <div class="time-btn">
                <div class="btn">
                    <button :class="{ favorite: video.isFavorite }" @click.prevent="editFavorite(videoId)"><i class="fas fa-heart fa-2x"></i></button>
                </div>
                <p class="publishedAt">Published On。{{video.publishedAt}}</p>
            </div>
            <p class="description">{{video.description}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import videojs from "video.js";

import helpers from '../utils/helpers';

export default {
    name: "PlayVideo",
    data() {
        return {
            videoId: "",
            video: {},
            isPause: false,
        }
    },
    methods: {
        editFavorite(id){
            helpers.editFavorite(id);
            this.video.isFavorite = !this.video.isFavorite;
        },
        async getVideo(videoId){
                const vm = this;
                await axios.get(`${process.env.VUE_APP_YOUTUBE_URL}?part=snippet&part=contentDetails&key=${process.env.VUE_APP_YOUTUBE_API_KEY}&id=${videoId}`)
                .then(res=>{
                    vm.video = { 
                        ...res.data.items[0].snippet,
                        publishedAt: vm.dateTime(res.data.items[0].snippet.publishedAt),
                        isFavorite: helpers.isFavorite(videoId)
                    }
            })
        },
        dateTime(datetime){
            let d = new Date(datetime);
            let result = d.toDateString() +" " + d.toTimeString().split(/\s/)[0] 
            return result;
        }
    },
    mounted(){
        let vm = this;
        videojs.options.techOrder = ["youtube"];
        let player = videojs("myVideo", {
            controls: true,
            sources:[{ 
                src: `https://www.youtube.com/watch?v=${this.videoId}`,
                type: "video/youtube",
            }]
        })
        player.on("pause", ()=>{
            vm.isPause = true
        })
        player.on("playing", ()=>{
            vm.isPause = false
        })
    },
    created() {
        this.videoId = this.$route.params.id;
        this.getVideo(this.videoId);
    },
    destroyed() {
        videojs("myVideo").dispose();
    },
}
</script>

<style>
.favorite{
    color: red
}
.single-video{
    position: relative;
}
.single-video .video-block{
    position: relative;
}
.single-video .video-block .advertising{
    position: absolute;
    width: 150px; 
    height: 150px; 
    background-color: red;
    z-index: 9999;
}
#myVideo{
    margin-top: 20px;
}
.single-video .info .title{
    font-weight: 800;
    font-size: 40px;
}
.single-video .info .description{
    /* width: 320px; */
    padding: 10px 0;
}
.single-video .info .time-btn{
    display: flex;
    padding: 20px 0 10px 0;
    color: #696969;
}
.single-video .info .time-btn .publishedAt{
    line-height: 30px;
    margin-left: 10px;
}
.single-video .info .time-btn .btn button{
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
}
@media screen and (min-width: 319px) and (max-width: 376px){
    #myVideo{
        width: 100%;
        height: 180px;
        margin: 20px auto;
    }
    .single-video .info .title{
        font-weight: 800;
        font-size: 20px;
    }
    .single-video .info .time-btn .publishedAt{
        font-size: 12px;
    }
    .single-video .video-block .advertising{
        width: 100px;
        height: 100px;
    }
}
@media screen and (min-width: 377px) and (max-width: 426px) {
    #myVideo{
        width: 100%;
        height: 240px;
        margin: 20px auto;
    }
    .single-video .info .title{
        font-weight: 800;
        font-size: 20px;
    }
}
@media screen and (min-width: 427px) and (max-width: 654px) {
    #myVideo{
        width: 100%;
        height: 320px;
        margin: 20px auto;
    }
    .single-video .info .title{
        font-weight: 800;
        font-size: 20px;
    }
}
@media screen and (min-width: 655px) and (max-width: 769px) {
    #myVideo{
        width: 100%;
        height: 420px;
        margin: 20px auto;
    }
    .single-video .info .title{
        font-weight: 800;
        font-size: 30px;
    }
}
@media screen and (min-width: 770px) {
    #myVideo{
        width: 750px;
        height: 420px;
        margin: 20px auto;
    }
    .single-video .info{
        width: 750px;
        margin: 0 auto;
    }
    .single-video .video-block .advertising{
        left: 400px
    }
}
</style>