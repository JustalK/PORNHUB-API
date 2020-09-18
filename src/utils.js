const constants = require('./consts');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

module.exports = {
	source_to_dom: source => {
		const dom = new JSDOM(source);
		return dom.window.document;
	},
	selectors_restriction: (keys, selectors) => {
		return Object.fromEntries(Object.keys(selectors).map(selector => {
			if (keys.includes(selector)) {
				return [selector, selectors[selector]];
			}

			return null;
		}).filter(x => x));
	},
	scraper_content_informations: (doc, keys, selectors, element_attributs) => {
		const selectors = module.exports.selectors_restriction(keys, selectors);
		return module.exports.scrap(doc, selectors, element_attributs);
	},
	convert_to_second: time => {
		const time_splitted = time.split(':');
		switch (time_splitted.length) {
			case 3:
				return ((+Number(time_splitted[0])) * 60 * 60) + ((+Number(time_splitted[1])) * 60) + (+Number(time_splitted[2]));
			case 2:
				return ((+Number(time_splitted[0])) * 60) + (+Number(time_splitted[1]));
			default:
				return time;
		}
	},
	convert_KM_to_unit: units => {
		if (units.includes('K')) {
			return Number(units.replace('K', '')) * 1000;
		}

		if (units.includes('M')) {
			return Number(units.replace('M', '')) * 1000000;
		}

		return units;
	},
	scrap: (object, keys, attributs) => {
		return Object.fromEntries(Object.keys(keys).map(key => {
			switch (attributs[key]) {
				case 'innerHTML':
					if (!object.querySelector(keys[key])) {
						return [key, constants.NO_DATA];
					}

					return [key, object.querySelector(keys[key]).innerHTML];
				case 'textContent':
					if (!object.querySelector(keys[key])) {
						return [key, constants.NO_DATA];
					}

					return [key, object.querySelector(keys[key]).textContent];
				case 'multi_textContent': {
					const elm = [...object.querySelectorAll(keys[key])];
					if (!elm || elm.length === 0) {
						return [key, constants.NO_DATA];
					}

					return [key, elm.map(node => node.textContent)];
				}

				case 'javascript':
					return [key, JSON.parse(object.querySelector(keys[key]).textContent)[constants.javascript[key]]];
				case null:
					return object.querySelector(keys[key]) ? [key, true] : [key, false];
				default:
					return [key, object.querySelector(keys[key]).getAttribute(attributs[key])];
			}
		}));
	},
	scraper_array: (doc, global, selectors, attributs) => {
		const elements = [...doc.querySelectorAll(global)];
		return elements.map((element, index) => {
			const temporary = module.exports.scrap(element, selectors, attributs);
			return module.exports.sanitizer(temporary);
		});
	},
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
	sanitizer_array: array => {
		return array.map(x => module.exports.sanitizer_string(x));
	},
	sanitizer_date: value => {
		return new Date(value);
	},
	sanitizer: datas => {
		const rsl = Object.keys(constants.type).map(x => {
			if (datas[x] === null || datas[x] === undefined) {
				return;
			}

			switch (constants.type[x]) {
				case constants.js_type.STRING:
					return [x.toLowerCase(), module.exports.sanitizer_string(datas[x])];
				case constants.js_type.ARRAY:
					return [x.toLowerCase(), module.exports.sanitizer_array(datas[x])];
				case constants.js_type.NUMBER:
					return [x.toLowerCase(), module.exports.sanitizer_number(datas[x])];
				case constants.js_type.BOOLEAN:
					return [x.toLowerCase(), Boolean(datas[x])];
				case constants.js_type.DATE:
					return [x.toLowerCase(), module.exports.sanitizer_date(datas[x])];
				case constants.js_type.NUMBER_KM:
					return [x.toLowerCase(), module.exports.convert_KM_to_unit(datas[x])];
				case constants.js_type.NUMBER_SECONDS:
					return [x.toLowerCase(), module.exports.convert_to_second(datas[x])];
				case constants.js_type.URL_PORNHUB:
					return [x.toLowerCase(), constants.links.BASE_URL + datas[x]];
				default:
					return [x.toLowerCase(), datas[x]];
			}
		}).filter(x => x);

		return Object.fromEntries(rsl);
	}
};
