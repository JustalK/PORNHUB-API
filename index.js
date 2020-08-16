'use strict';

const utils = require('./utils');
const constants = require('./consts');
const page = require('./page');
const page_search = require('./search');
const promise = require('promise');
const got = require('got');

//TODO Search by country

const options_to_keys = (key) => {
	if(!key) return [];
	const array_keys = Array.isArray(key) ? key : [key];
	return array_keys.map(x => x.toUpperCase());
}

const get_queries_from_keys = (keys) => {
	return Object.fromEntries(Object.keys(constants.queries).map(query => {
		const key = keys.find(key => key.includes(query))
		if(key) {
			return [constants.queries[query], utils.sanitizer_number(key.replace(query,""))]
		}
		return [];
	}).filter(x => x));
}

const url_to_source = async (url) => {
	const safe_url = url.toLowerCase();
	const response = await got(safe_url);
	return response.body;
}

const multi_url_to_source = async (url, queries) => {
	return await promise.all([...Array(queries.PAGE)].map(async (page,index) => {
		return await url_to_source(constants.links.SEARCH+url+'&page='+(index+1));
	}))
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
		const queries = get_queries_from_keys(keys);
		if(!queries.PAGE) queries['PAGE'] = 1;

		try {
			const source = await multi_url_to_source(search, queries);
			const datas = page_search.scraping_search(source, keys);
			return datas;
		} catch (error) {
			return error_message(error);
		}
	}
};
