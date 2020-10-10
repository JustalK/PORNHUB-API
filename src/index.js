'use strict';

const utils = require('./utils');
const consts_global = require('./constants/consts_global');
const page = require('./page');
const page_search = require('./search');
const page_model = require('./model');

const error_message = error => {
	return {error: consts_global.errors.DEFAULT};
};

module.exports = {
	page: async (url, key) => {
		const keys = utils.options_to_keys(key);
		if (keys.length === 0) {
			return {};
		}

		try {
			const source = await utils.url_to_source(url);
			const datas = page.scraping_page(source, keys);
			return utils.sanitizer(datas);
		} catch (error) {
			return error_message(error);
		}
	},
	model: async (name, key) => {
		const keys = utils.options_to_keys(key);

		try {
			const url = utils.name_to_url(name);
			const source = await utils.url_to_source(url);
			const datas = page_model.scrap(source, keys);
			return utils.sanitizer(datas);
		} catch (error) {
			return error_message(error);
		}
	},
	search: async (search, key, options) => {
		const keys = utils.options_to_keys(key);
		if (!options || !options.page) {
			options = options ? options : {};
			options.page = 1;
		}

		try {
			const source = await utils.multi_url_to_source(search, options);
			const datas = page_search.scraping_search(source, keys, options);
			return utils.sanitizer(datas);
		} catch (error) {
			return error_message(error);
		}
	}
};
