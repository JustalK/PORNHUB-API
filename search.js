const utils = require('./utils');
const constants = require('./consts');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

module.exports = {
	scraping_search: (source, keys) => {
		const doc = utils.source_to_dom(source);

		let datas = {};
		datas = {...datas, ...utils.scraper_content_informations(doc, keys, constants.primary_search_selectors, constants.page_search_element_attributs)};
		datas[constants.keys.RESULTS] = utils.scraper_array(doc, constants.global_selectors.SEARCH_LIST, constants.secondary_search_selectors, constants.page_search_element_attributs);
		datas[constants.keys.RESULTS] = utils.scraper_array(doc, constants.global_selectors.PORNSTARS_LIST, constants.actors_search_selectors, constants.page_search_element_attributs);

		return datas;
	}
};
