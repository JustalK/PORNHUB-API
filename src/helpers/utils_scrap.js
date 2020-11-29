const consts_global = require('./../constants/consts_global');
const consts_page = require('./../constants/consts_page');
const consts_scrap = require('./../constants/consts_scrap');
const utils_global = require('./utils_global');
const utils_sanitizer = require('./utils_sanitizer');

module.exports = {
	scraper_content_informations: (doc, keys, selectors, element_attributs) => {
		const selectors_restricted = utils_global.selectors_restriction(keys, selectors);
		return module.exports.scrap(doc, selectors_restricted, element_attributs);
	},
	is_data_available: (object, key) => {
		return object.querySelector(key) !== null;
	},
	is_array_available: array => {
		return array !== null && array.length > 0;
	},
	scrap_object_selected: (object, keys, key, attribut) => {
		return module.exports.is_data_available(object, keys[key]) ? object.querySelector(keys[key])[attribut] : consts_global.NO_DATA;
	},
	scrap_inner_html: (object, keys, key) => {
		return module.exports.scrap_object_selected(object, keys, key, 'innerHTML');
	},
	scrap_data_content: (object, keys, key) => {
		return module.exports.is_data_available(object, keys[key]) ? object.querySelector(keys[key]).getAttribute('content') : consts_global.NO_DATA;
	},
	scrap_text_content: (object, keys, key) => {
		return module.exports.scrap_object_selected(object, keys, key, 'textContent');
	},
	scrap_multi_text_content: (object, keys, key) => {
		const elm = [...object.querySelectorAll(keys[key])];

		return module.exports.is_array_available(elm) ? elm.map(node => node.textContent) : consts_global.NO_DATA;
	},
	scrap_javascript: (object, keys, key) => {
		return JSON.parse(object.querySelector(keys[key]).textContent)[consts_page.javascript[key]];
	},
	scrap_null: (object, keys, key) => {
		return module.exports.is_data_available(object, keys[key]);
	},
	scrap_default: (object, keys, key, attributs) => {
		return object.querySelector(keys[key]).getAttribute(attributs[key]);
	},
	scrap: (object, keys, attributs) => {
		return Object.fromEntries(Object.keys(keys).map(key => {
			const scrap = consts_scrap.scrap_by_attribut_type[attributs[key]];

			let scrap_data = null;
			if (utils_global.is_parameter_missing(scrap)) {
				scrap_data = module.exports.scrap_default(object, keys, key, attributs);
			} else {
				scrap_data = module.exports[scrap](object, keys, key);
			}

			return [key, scrap_data];
		}));
	},
	scraper_array: (doc, global, selectors, attributs) => {
		const elements = [...doc.querySelectorAll(global)];
		return elements.map((element, index) => {
			const temporary = module.exports.scrap(element, selectors, attributs);
			return utils_sanitizer.sanitizer(temporary);
		});
	}
};
