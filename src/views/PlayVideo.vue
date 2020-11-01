<template>
    <div>
        <h1>Playpage</h1>
        <div v-if="isPause" style="width: 200px; height: 200px; background-color: red">
            <p style="color: white">advertising</p>
        </div>
        <video
        id="myVideo"
        class="video-js vjs-default-skin"
        >
         <!-- data-setup= '{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }' -->
        </video>
        <p>{{video.duration}}</p>
        <div>
            <button :class="{ test: video.isFavorite }" @click.prevent="editFavorite(videoId)">Add Favotiate</button>
        </div>
        <p>{{video.publishedAt}}</p>
        <h4>{{video.title}}</h4>
        <p>{{video.description}}</p>
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
                        duration: helpers.timeFormat(res.data.items[0].contentDetails.duration),
                        isFavorite: helpers.isFavorite(videoId)
                    }
            })
        }
    },
    mounted(){
        let vm = this;
        videojs.options.techOrder = ["youtube"];
        let player = videojs("myVideo", {
            controls: true,
            width:"640", 
            height:"400",
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
.test{
    color: red
}
</style>