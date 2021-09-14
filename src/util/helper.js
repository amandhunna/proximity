const aqiConstants = {
    GOOD :'GOOD',
    SATISFACTORY :'SATISFACTORY',
    MODERATE :'MODERATE',
    POOR :'POOR',
    VERY_POOR :'VERY_POOR',
    SEVERE :'SEVERE',
}

const aqiCategory = {
    GOOD: 'Good',
    SATISFACTORY: 'Satisfactory',
    MODERATE: 'Moderate',
    POOR: 'Poor',
    VERY_POOR: 'Very poor',
    SEVERE: 'Severe',
}

const aqiCategoryColor = {
    GOOD: '#55a84f',
    SATISFACTORY: '#a3c853',
    MODERATE: '#fff833',
    POOR: '#f29c33',
    VERY_POOR: '#e93f33',
    SEVERE: '#af2d24',
}

const helper = {
    round : function(num) {
        const precised = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(precised) / 100 * Math.sign(num);
    },

    aqiRange: function(aqi) {
        if(0 <= aqi && aqi <=50) {
            return aqiConstants.GOOD;
        }
        if(51 <= aqi && aqi <=100) {
            return aqiConstants.SATISFACTORY;
        }
        if(101 <= aqi && aqi <=200) {
            return aqiConstants.MODERATE;
        }
        if(201 <= aqi && aqi <=300) {
            return aqiConstants.POOR;
        }
        if(301 <= aqi && aqi <=400) {
            return aqiConstants.VERY_POOR;
        }
        if(401 < aqi && aqi <=500) {
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