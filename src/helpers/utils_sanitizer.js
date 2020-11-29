/**
 * @file Regroup all the functions use for sanitize the informations coming and going in the api
 * @author Justal Kevin
 */

'use strict';

const consts_global = require('./../constants/consts_global');
const consts_sanitizer = require('./../constants/consts_sanitizer');
const utils_global = require('./utils_global');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

module.exports = {
	/**
	* Sanitize the number of pornhub to a javascript type Number
	* Most of the number in pornhub contains letters or commas, so it need to be filter
	*
	* @params {string} value The string that represents a number
	* @return {number} The string converted into a number javascript
	**/
	sanitizer_number: value => {
		value = value.replace(/[()&A-Za-z,%]/g, '');
		value = Number(value);
		return value;
	},
	/**
	* Sanitize the string from pornhub to a single ligne.
	* This function remove the tabs, break line and trim the string
	*
	* @params {string} value The string that we want to sanitize
	* @return {string} The string sanitized
	**/
	sanitizer_string: value => {
		value = value.replace(/[\t\n]/g, '');
		value = value.trim();
		value = entities.decode(value);
		return value;
	},
	/**
	* Convert a string or number into a boolean
	*
	* @params {(string|number)} value The string or number representing a boolean
	* @return {boolean} True or False depending of the value passed
	**/
	sanitizer_boolean: value => {
		return Boolean(value);
	},
	/**
	* Sanitize the key passed to the API
	* Replace space and : and put the key in uppercase
	*
	* @params {string} value The API key that we want to sanitize
	* @return {string} The key sanitized
	**/
	sanitizer_key: value => {
		value = module.exports.sanitizer_string(value);
		value = value.replace(/\s/g, '_');
		value = value.replace(/:/g, '');
		value = value.toUpperCase();
		return value;
	},
	/**
	* Convert the value with an unit to a number javascript
	*
	* @params {string} value The string with an unit representing a number
	* @return {number} The javascript number
	**/
	sanitizer_KM_to_unit: value => {
		if (value.includes('K')) {
			return Number(value.replace('K', '')) * 1000;
		}

		if (value.includes('M')) {
			return Number(value.replace('M', '')) * 1000000;
		}

		return value;
	},
	/**
	* Convert a string date to a javascript date
	*
	* @params {string} value A string representing a date
	* @return {Date} The javascript date representing the value passed in argument
	**/
	sanitizer_date: value => {
		return new Date(value);
	},
	/**
	* Create a complete url pornhub from a route passed in argument
	*
	* @params {string} value A pornhub route
	* @return {string} A complete url pornhub
	**/
	sanitizer_url_pornhub: value => {
		return consts_global.links.BASE_URL + value;
	},
	/**
	* Simply return the variable passed in argument
	* This function is used for getting the function sanitizer possible and givig every type a function
	*
	* @params {Object} A value
	* @return {Object} The same value without any change
	**/
	sanitizer_normal: value => {
		return value;
	},
	/**
	* Sanitize every string element of an array of string
	* and remove duplicate value
	*
	* @params {array} array An array containing string
	* @return {array} Return the array with unique value and sanitized string
	**/
	sanitizer_array: array => {
		if (Array.isArray(array)) {
			array = array.map(x => module.exports.sanitizer_string(x));
			return utils_global.remove_duplicate(array);
		}

		return module.exports.sanitizer_string(array);
	},
	/**
	* Sanitize all the data receive from pornhub to a more flexible format
	*
	* @params {Object} datas The datas that we want to sanitize
	* @return {Object} The datas sanitized
	**/
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
