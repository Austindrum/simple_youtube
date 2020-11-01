import moment from 'moment';

export default {
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
    isFavorite(id){
        let favorites = JSON.parse(localStorage.getItem("allied_favorites_videos")) || [];
        return favorites.some(favorite => favorite === id);
    },
    editFavorite(id){
        let favorites = JSON.parse(localStorage.getItem("allied_favorites_videos")) || [];
        let itemNum = favorites.indexOf(id);
        if(itemNum > -1){
            favorites.splice(itemNum, 1);
        }else{
            favorites.push(id);
        }
        localStorage.removeItem("allied_favorites_videos");
        localStorage.setItem("allied_favorites_videos", JSON.stringify(favorites));
    }
}
