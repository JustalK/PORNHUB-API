const consts_global = require('./../constants/consts_global');
const consts_sanitizer = require('./../constants/consts_sanitizer');
const utils_global = require('./utils_global');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

module.exports = {
	sanitizer_number: value => {
		value = value.replace(/[()&A-Za-z,%]/g, '');
		value = Number(value);
		return value;
	},
	sanitizer_string: value => {
		value = value.replace(/[\t\n]/g, '');
		value = value.trim();
		value = entities.decode(value);
		return value;
	},
	sanitizer_boolean: value => {
		return Boolean(value);
	},
	sanitizer_key: value => {
		value = module.exports.sanitizer_string(value);
		value = value.replace(/\s/g, '_');
		value = value.replace(/:/g, '');
		value = value.toUpperCase();
		return value;
	},
	sanitizer_KM_to_unit: value => {
		if (value.includes('K')) {
			return Number(value.replace('K', '')) * 1000;
		}

		if (value.includes('M')) {
			return Number(value.replace('M', '')) * 1000000;
		}

		return value;
	},
	sanitizer_date: value => {
		return new Date(value);
	},
	sanitizer_url_pornhub: value => {
		return consts_global.links.BASE_URL + value;
	},
	sanitizer_normal: value => {
		return value;
	},
	sanitizer_array: array => {
		if (Array.isArray(array)) {
			array = array.map(x => module.exports.sanitizer_string(x));
			return utils_global.remove_duplicate(array);
		}

		return module.exports.sanitizer_string(array);
	},
	sanitizer: datas => {
		const rsl = Object.keys(consts_global.type).map(x => {
			if (datas[x] === null || datas[x] === undefined) {
				return;
			}

			// Choose the sanitizer to apply to the current value depending of the type
			const sanitizer = consts_sanitizer.sanitizer_by_type[consts_global.type[x].toUpperCase()];
			const sanitize_data = module.exports[sanitizer](datas[x]);

			return [x.toLowerCase(), sanitize_data];
		}).filter(x => x);

		return Object.fromEntries(rsl);
	}
};
