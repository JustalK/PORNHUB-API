'use strict';

const utils = require('./utils');
const constants = require('./consts');
const page = require('./page');
const page_search = require('./search');
const got = require('got');

//TODO Search by country

const options_to_keys = (key) => {
	if(!key) return [];
	const array_keys = Array.isArray(key) ? key : [key];
	return array_keys.map(x => x.toUpperCase());
}

const url_to_source = async (url) => {
	const response = await got(url);
	return response.body;
}

const error_message = (error) => {
	console.log(error);
	if (error) {
		error.message = constants.errors.DEFAULT;
	}

	return {data: error.message};
}

module.exports = {
	page: async (url, key) => {
		const keys = options_to_keys(key);
		if(key.length === 0) return {};

		try {
			const source = await url_to_source(url);
			const datas = page.scraping_page(source, keys);
			return utils.sanitizer(datas);
		} catch (error) {
			return error_message(error);
		}
	},
	search: async (search, key) => {
		const keys = options_to_keys(key);

		try {
			const source = await url_to_source(constants.links.SEARCH+search);
			const datas = page_search.scraping_search(source, keys);
			return datas;
		} catch (error) {
			return error_message(error);
		}
	}
};
