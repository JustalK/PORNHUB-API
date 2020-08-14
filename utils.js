const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

module.exports = {
    convert_to_second: (time) => {
        const time_splitted = time.split(':');
        switch (time_splitted.length) {
            case 3:
                return (+time_splitted[0]) * 60 * 60 + (+time_splitted[1]) * 60 + (+time_splitted[2]);
            case 2:
                return (+time_splitted[0]) * 60 + (+time_splitted[1]);
            default:
                return time
        }
    },
    convert_KM_to_unit: (units) => {
        if(units.includes("K")) {
            return Number(units.replace("K",""))*1000;
        }
        if(units.includes("M")) {
            return Number(units.replace("M",""))*1000000;
        }
        return units;
    },
    sanitizer_number: (value) => {
    	value = value.replace(/[()&A-Za-z,%]/g, '');
    	value = Number(value);
    	return value;
    },
    sanitizer_string: (value) => {
    	value = value.replace(/[\t\n]/g, '');
    	value = entities.decode(value);
    	return value;
    },
    sanitizer_array: (array) => {
    	return array.map(x => module.exports.sanitizer_string(x));
    },
    sanitizer_date: (value) => {
    	return new Date(value);
    }
}
