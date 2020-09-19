'use strict';

const utils = require('./utils');
const consts_global = require('./constants/consts_global');
const page = require('./page');
const page_search = require('./search');
const promise = require('promise');
const got = require('got');

const options_to_keys = key => {
	if (!key) {
		return [];
	}

	const array_keys = Array.isArray(key) ? key : [key];
	return array_keys.map(x => x.toUpperCase());
};

const url_to_source = async url => {
	const safe_url = url.toLowerCase();
	const response = await got(safe_url);
	return response.body;
};

const createLink = (url, page, options) => {
	let q = '';
	if (options.production) {
		q += '&p=' + options.production;
	}

	const search = options.search ? options.search : 'video';
	return consts_global.links.BASE_URL + search + consts_global.links.SEARCH + url + '&page=' + (page + 1) + q;
};

const multi_url_to_source = async (url, options) => {
	return promise.all([...new Array(options.page)].map(async (page, index) => {
		return url_to_source(createLink(url, index, options));
	}));
};

const error_message = error => {
	if (error) {
		error.message = consts_global.errors.DEFAULT;
	}

	return {error: error.message};
};

module.exports = {
	page: async (url, key) => {
		const keys = options_to_keys(key);
		if (keys.length === 0) {
			return {};
		}

		try {
			const source = await url_to_source(url);
			const datas = page.scraping_page(source, keys);
			return utils.sanitizer(datas);
		} catch (error) {
			return error_message(error);
		}
	},
	search: async (search, key, options) => {
		const keys = options_to_keys(key);
		if (!options || !options.page) {
			options.page = 1;
		}

		try {
			const source = await multi_url_to_source(search, options);
			const datas = page_search.scraping_search(source, keys, options);
			return utils.sanitizer(datas);
		} catch (error) {
			return error_message(error);
		}
	}
};
