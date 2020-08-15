'use strict';

const utils = require('./utils');
const constants = require('./consts');
const page = require('./page');
const search = require('./search');
const got = require('got');

const options_to_keys = (key) => {
	if(!key) return [];
	const array_keys = Array.isArray(key) ? key : [key];
	return array_keys.map(x => x.toUpperCase());
}

module.exports = {
	page: async (url, key) => {
		const keys = options_to_keys(key);

		try {
			const response = await got(url);
			const source = response.body;
			const datas = page.scraping_page(source, keys);
			return utils.sanitizer(datas);
		} catch (error) {
			console.log(error);
			if (error) {
				error.message = constants.errors.DEFAULT;
			}

			return {data: error.message};
		}
	},
	search: async (search, key) => {
		const keys = options_to_keys(key);

		try {
			// Search by country
			const response = await got(constants.links.SEARCH+search);
			const source = response.body;
			const datas = search.scraping_search(source, keys);
			return datas;
		} catch (error) {
			console.log(error);
			if (error) {
				error.message = constants.errors.DEFAULT;
			}

			return {data: error.message};
		}
	}
};
