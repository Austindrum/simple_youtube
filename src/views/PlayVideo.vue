<template>
    <div>
        <h1>Playpage</h1>
        <video
        id="myVideo"
        class="video-js vjs-default-skin"
        >
         <!-- data-setup= '{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }' -->
        </video>
        <p>{{video.duration}}</p>
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
        }
    },
    methods: {
        async getVideo(videoId){
                const vm = this;
                await axios.get(`${process.env.VUE_APP_YOUTUBE_URL}?part=snippet&part=contentDetails&key=${process.env.VUE_APP_YOUTUBE_API_KEY}&id=${videoId}`)
                .then(res=>{
                    vm.video = { 
                        ...res.data.items[0].snippet,
                        duration: helpers.timeFormat(res.data.items[0].contentDetails.duration), 
                    }
            })
        }
    },
    mounted(){
        videojs.options.techOrder = ["youtube"];
        videojs("myVideo", {
            controls: true,
            width:"640", 
            height:"400",
            sources:[{ 
                src: `https://www.youtube.com/watch?v=${this.videoId}`,
                type: "video/youtube",
            }]
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

<style lang="">
    
</style>