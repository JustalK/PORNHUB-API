'use strict';

const utils = require('./utils');
const utils_sanitizer = require('./helpers/utils_sanitizer');
const consts_global = require('./constants/consts_global');
const page = require('./page');
const page_search = require('./search');
const page_model = require('./model');

module.exports = {
	/**
	* Scrap the content of a video page of pornhub
	*
	* @params {string} url The url of the page you wanna scrap
	* @params {array} key The array of key of value that you want to scrap
	* @return {Object} The result of the scrap in an object containing only the key choosen
	* @throws {Object} If an error happen
	**/
	page: async (url, key) => {
		try {
			const keys = utils.options_to_keys(key);
			const source = await utils.url_to_source(url);
			const datas = page.scraping_page(source, keys);
			return utils_sanitizer.sanitizer(datas);
		} catch (error) {
			return utils.error_message(error);
		}
	},
	/**
	* Scrap the content of a model page of pornhub
	*
	* @params {string} name The exact name of the model
	* @params {array} key The array of key of value that you want to scrap
	* @params {string} type The type of the result (pornstar or model)
	* @return {Object} The result of the scrap in an object containing only the key choosen
	* @throws {Object} If an error happen
	**/
	model: async (name, key, type = consts_global.types.MODEL) => {
		try {
			const keys = utils.options_to_keys(key);
			const url = utils.name_to_url(name, type);
			const source = await utils.url_to_source(url);
			const datas = page_model.scrap(source, keys);
			const datas_filtered = page_model.filter_value(datas, keys);
			return utils_sanitizer.sanitizer(datas_filtered);
		} catch (error) {
			return utils.error_message(error);
		}
	},
	/**
	* Scrap the content of the featured videos of pornhub
	*
	* @params {array} [key=null] The array of key of value that you want to scrap
	* @params {object} [options=null] The options for display the video of a selected page
	* @return {Object} The result of the scrap in an object containing only the key choosen
	* @throws {Object} If an error happen
	**/
	video: async (key = null, options = null) => {
		try {
			const request_start_time = process.hrtime();
			const usage_start = process.memoryUsage();

			const keys = utils.options_to_keys(key);
			if (!options || !options.page) {
				options = options ? options : {};
				options.page = 1;
			}

			const source = await utils.multi_url_to_source(options);
			const datas = page_search.scraping_search(source, keys, options);
			const datas_sanitize = utils_sanitizer.sanitizer(datas);
			return {...datas_sanitize, ...utils.performance_calculation(request_start_time, usage_start)};
		} catch (error) {
			return utils.error_message(error);
		}
	},
	/**
	* Scrap the content of a search page of pornhub
	*
	* @params {string} search The exact terms of the search
	* @params {array} key The array of key of value that you want to scrap
	* @params {object} options The options for display the video of a selected page
	* @return {object} The result of the scrap in an object containing only the key choosen
	* @throws {object} If an error happen
	**/
	search: async (search, key, options) => {
		try {
			const keys = utils.options_to_keys(key);
			if (!options || !options.page) {
				options = options ? options : {};
				options.page = 1;
			}

			const source = await utils.multi_url_to_source(options, search);
			const datas = page_search.scraping_search(source, keys, options);
			return utils_sanitizer.sanitizer(datas);
		} catch (error) {
			return utils.error_message(error);
		}
	}
};
