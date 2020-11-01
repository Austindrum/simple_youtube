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

}
