<template>
    <div>
        <h1>Playpage</h1>
        <iframe width="420" height="345" :src='videoUrl'></iframe>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "PlayVideo",
    data() {
        return {
            videoId: "",
            video: {},
            videoUrl: ""
        }
    },
    methods: {
        async getVideo(videoId){
            const vm = this;
            await axios.get(`${process.env.VUE_APP_YOUTUBE_URL}?part=snippet&part=contentDetails&key=${process.env.VUE_APP_YOUTUBE_API_KEY}&id=${videoId}`)
            .then(res=>{
                vm.video = res;
                vm.videoUrl = `https://www.youtube.com/embed/${videoId}`;
            })
        }
    },
    created() {
        this.videoId = this.$route.params.id;
        this.getVideo(this.videoId);
    },
}
</script>

<style lang="">
    
</style>