/**
 * @file Regroup all the general functions that can be usefull anywhere
 * @author Justal Kevin
 */

'use strict';

module.exports = {
	/**
	* Remove duplicated string inside an array
	*
	* @params {array} array The array with possible duplicate of same data
	* @return {array} The array with unique value
	**/
	remove_duplicate: array => {
		return array.filter((item, index) => array.indexOf(item) === index);
	},
	/**
	* Check if the parameter is defined and exist
	*
	* @params {string} parameter The parameter we want to test
	* @return {boolean} True if the parameter exist or else false
	**/
	is_parameter_missing: parameter => {
		return parameter === null || parameter === '' || parameter === undefined;
	},
	selectors_restriction: (keys, selectors) => {
		return Object.fromEntries(Object.keys(selectors).map(selector => {
			if (keys.includes(selector)) {
				return [selector, selectors[selector]];
			}

			return null;
		}).filter(x => x));
	}
};
