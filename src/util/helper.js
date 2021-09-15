import { aqiConstants, aqiCategory, aqiCategoryColor } from './../constant'; 

const helper = {
    round : function(num) {
        const precised = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(precised) / 100 * Math.sign(num);
    },

    aqiRange: function(aqi) {
        if(0 <= aqi && aqi <51) {
            return aqiConstants.GOOD;
        }
        if(51 <= aqi && aqi <101) {
            return aqiConstants.SATISFACTORY;
        }
        if(101 <= aqi && aqi <201) {
            return aqiConstants.MODERATE;
        }
        if(201 <= aqi && aqi <301) {
            return aqiConstants.POOR;
        }
        if(301 <= aqi && aqi <401) {
            return aqiConstants.VERY_POOR;
        }
        if(401 <= aqi && aqi <501) {
            return aqiConstants.SEVERE;
        }
    },

    getAqiColor: function(aqi) {
        const range = this.aqiRange(aqi);
        return aqiCategoryColor[range];
    },

    getAqiCategory: function(aqi) {
        const range = this.aqiRange(aqi);
        return aqiCategory[range];
    }
}

export default helper;