const consts_global = require('./constants/consts_global');
const consts_page = require('./constants/consts_page');
const consts_queries = require('./constants/consts_queries');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const got = require('got');
const promise = require('promise');

module.exports = {
	/**
	* Check if the parameter is defined and exist
	*
	* @params {string} parameter The parameter we want to test
	* @return {boolean} True if the parameter exist or else false
	**/
	is_parameter_missing: parameter => {
		return parameter === null || parameter === '' || parameter === undefined;
	},
	/**
	* Read the keys passed and sanitize them in uppercase.
	* If there is no key passed, we define a simple key `title`
	* If the key passed is a string instead of an array, we put that key inside an array
	*
	* @params {(string|array)} key The single or multiples key passed with the call
	* @return {array} The key in uppercase in an array
	* @throws {Error} If the array passed in the call is empty
	**/
	options_to_keys: key => {
		if (module.exports.is_parameter_missing(key)) {
			return ['TITLE'];
		}

		const array_keys = Array.isArray(key) ? key : [key];
		const array_keys_uppercase = array_keys.map(x => x.toUpperCase());

		if (array_keys_uppercase.length === 0) {
			throw new Error('A key need to be used with this call');
		}

		return array_keys_uppercase;
	},
	/**
	* Transform the value of a filter from the package to his equivalent for pornhub
	* By example is really not easy to remember that `mv` is the value for pornhub for `MOST_VIEWED`
	* So the user of the api can just enter MOST_VIEWED and I will search for the pornhub value
	*
	* @params {string} value The query parameter that he wan to translate
	* @return {string|null} The value translated if it exists or else null
	**/
	transform_filter: value => {
		return module.exports.is_parameter_missing(value) ? null : consts_queries.filter[value];
	},
	/**
	* Search in the array `values_allowed` if the `value` exist
	* This function is used for checking the value available for a query parameter
	*
	* @params {string} value The value of the parameter to check
	* @params {array} values_allowed The array that we will check into if the value is allowed
	* @return {boolean} True if the value is allowed or else false
	**/
	is_value_allowed: (value, values_allowed) => {
		return values_allowed.includes(value);
	},
	/**
	* Create the url query for the parameter and value passed in argument
	*
	* @params {string} parameter The parameter that we want to config
	* @params {string} value The value we want to give to the parameter
	* @params {array} [values_allowed=null] The allowed value for this parameter
	* @return {string} An url params with the form : & + parameter + = + value
	**/
	create_query: (parameter, value, values_allowed = null) => {
		if (module.exports.is_parameter_missing(value)) {
			return '';
		}

		if (values_allowed && !module.exports.is_value_allowed(value, values_allowed)) {
			return '';
		}

		return '&' + parameter + '=' + value;
	},
	/**
	* Create the url query of all the options
	*
	* @params {Object} options The object of the params and value
	* @params {number} page_index The page of the search
	* @params {string} [search=null] The term of the search
	* @return {string} The url with all the params ready to be append to the url
	**/
	create_queries: (options, page_index, search = null) => {
		let q = '';
		q += module.exports.create_query('search', search);
		q += module.exports.create_query('p', options.production, consts_queries.production);
		q += module.exports.create_query('max_duration', options.max_duration, consts_queries.max_duration);
		q += module.exports.create_query('min_duration', options.min_duration, consts_queries.min_duration);
		q += module.exports.create_query('promo', options.promo, consts_queries.promo);
		q += module.exports.create_query('o', module.exports.transform_filter(options.filter), Object.values(consts_queries.filter));

		q += '&page=' + (page_index + 1);
		q = q.replace('&', '?');
		return q;
	},
	create_section_type: options => {
		return options.search ? options.search : 'video';
	},
	create_link: (options, page_index, search = null) => {
		let link = consts_global.links.BASE_URL + '/';
		link += module.exports.create_section_type(options);
		link += module.exports.is_parameter_missing(search) ? '' : '/' + consts_global.links.SEARCH;
		link += module.exports.create_queries(options, page_index, search);
		return link;
	},
	url_to_source: async url => {
		url = module.exports.http_to_https(url);
		const safe_url = url.toLowerCase();
		const response = await got(safe_url);
		return response.body;
	},
	http_to_https: url => {
		return url.replace(/^http:/gi, 'https:');
	},
	multi_url_to_source: async (options, search = null) => {
		return promise.all([...new Array(options.page)].map(async (page, page_index) => {
			return module.exports.url_to_source(module.exports.create_link(options, page_index, search));
		}));
	},
	name_to_url: name => {
		if (module.exports.is_parameter_missing(name)) {
			return null;
		}

		const slug = name.replace(/\s/gi, '-').toLowerCase();
		return consts_global.links.BASE_URL + '/' + consts_global.links.MODEL + slug;
	},
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
		const selectors_restricted = module.exports.selectors_restriction(keys, selectors);
		return module.exports.scrap(doc, selectors_restricted, element_attributs);
	},
	convert_to_second: time => {
		if (module.exports.is_parameter_missing(time)) {
			return consts_global.NO_DATA;
		}

		const time_splitted = time.split(':');
		switch (time_splitted.length) {
			case 3:
				return ((+Number(time_splitted[0])) * 60 * 60) + ((+Number(time_splitted[1])) * 60) + (+Number(time_splitted[2]));
			case 2:
				return ((+Number(time_splitted[0])) * 60) + (+Number(time_splitted[1]));
			default:
				return Number(time);
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
						return [key, consts_global.NO_DATA];
					}

					return [key, object.querySelector(keys[key]).innerHTML];
				case 'dataContent':
					if (!object.querySelector(keys[key])) {
						return [key, consts_global.NO_DATA];
					}

					return [key, object.querySelector(keys[key]).getAttribute('content')];
				case 'textContent':
					if (!object.querySelector(keys[key])) {
						return [key, consts_global.NO_DATA];
					}

					return [key, object.querySelector(keys[key]).textContent];
				case 'multi_textContent': {
					const elm = [...object.querySelectorAll(keys[key])];
					if (!elm || elm.length === 0) {
						return [key, consts_global.NO_DATA];
					}

					return [key, elm.map(node => node.textContent)];
				}

				case 'javascript':
					return [key, JSON.parse(object.querySelector(keys[key]).textContent)[consts_page.javascript[key]]];
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
	sanitizer_key: value => {
		value = module.exports.sanitizer_string(value);
		value = value.replace(/\s/g, '_');
		value = value.replace(/:/g, '');
		value = value.toUpperCase();
		return value;
	},
	remove_duplicate: array => {
		return array.filter((item, index) => array.indexOf(item) === index);
	},
	sanitizer_array: array => {
		if (Array.isArray(array)) {
			array = array.map(x => module.exports.sanitizer_string(x));
			return module.exports.remove_duplicate(array);
		}

		return module.exports.sanitizer_string(array);
	},
	sanitizer_date: value => {
		return new Date(value);
	},
	sanitizer: datas => {
		const rsl = Object.keys(consts_global.type).map(x => {
			if (datas[x] === null || datas[x] === undefined) {
				return;
			}

			switch (consts_global.type[x]) {
				case consts_global.js_type.STRING:
					return [x.toLowerCase(), module.exports.sanitizer_string(datas[x])];
				case consts_global.js_type.ARRAY:
					return [x.toLowerCase(), module.exports.sanitizer_array(datas[x])];
				case consts_global.js_type.NUMBER:
					return [x.toLowerCase(), module.exports.sanitizer_number(datas[x])];
				case consts_global.js_type.BOOLEAN:
					return [x.toLowerCase(), Boolean(datas[x])];
				case consts_global.js_type.DATE:
					return [x.toLowerCase(), module.exports.sanitizer_date(datas[x])];
				case consts_global.js_type.NUMBER_KM:
					return [x.toLowerCase(), module.exports.convert_KM_to_unit(datas[x])];
				case consts_global.js_type.URL_PORNHUB:
					return [x.toLowerCase(), consts_global.links.BASE_URL + datas[x]];
				default:
					return [x.toLowerCase(), datas[x]];
			}
		}).filter(x => x);

		return Object.fromEntries(rsl);
	},
	performance_calculation: (request_start_time, usage_start) => {
		const request_duration = process.hrtime(request_start_time);
		const request_performance_time = request_duration[0] + '.' + request_duration[1] + ' seconds';
		const usage_end = process.memoryUsage();
		const request_rss = usage_end.rss - usage_start.rss;
		const request_heap_total = usage_end.heapTotal - usage_start.heapTotal;
		const request_heap_used = usage_end.heapUsed - usage_start.heapUsed;
		const performance = {
			request_duration: request_performance_time,
			request_diff_rss: request_rss,
			request_diff_heap_total: request_heap_total,
			request_diff_heap_used: request_heap_used
		};
		return {performance};
	},
	error_message: error => {
		return {error: consts_global.errors.DEFAULT};
	}
};
