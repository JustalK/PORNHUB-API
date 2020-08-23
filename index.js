'use strict';

const utils = require('./utils');
const constants = require('./consts');
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

const get_queries_from_keys = keys => {
	return Object.fromEntries(Object.keys(constants.queries).map(query => {
		const key = keys.find(key => key.includes(query));
		if (key) {
			return [constants.queries[query], utils.sanitizer_number(key.replace(query, ''))];
		}

		return [];
	}).filter(x => x));
};

const url_to_source = async url => {
	const safe_url = url.toLowerCase();
	const response = await got(safe_url);
	return response.body;
};

const createLink = (url, page, options) => {
	let q = '';
	if(options && options.production) {
		q += '&p=' + options.production;
	}
	return constants.links.SEARCH + url + '&page=' + (page + 1) + q;
}

const multi_url_to_source = async (url, queries, options) => {
	return promise.all([...new Array(queries.PAGE)].map(async (page, index) => {
		console.log(createLink(url, index, options));
		return url_to_source(createLink(url, index, options));
	}));
};

const error_message = error => {
	if (error) {
		error.message = constants.errors.DEFAULT;
	}

	return {error: error.message};
};

module.exports = {
	page: async (url, key) => {
		const keys = options_to_keys(key);
		if (key.length === 0) {
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
		const queries = get_queries_from_keys(keys);
		if (!queries.PAGE) {
			queries.PAGE = 1;
		}

		try {
			const source = await multi_url_to_source(search, queries, options);
			const datas = page_search.scraping_search(source, keys);
			return utils.sanitizer(datas);
		} catch (error) {
			return error_message(error);
		}
	}
};
