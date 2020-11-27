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
	}
};
