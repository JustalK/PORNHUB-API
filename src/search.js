const utils = require('./utils');
const constants = require('./consts');
const constants_search = require('./constants/consts_search');
const constants_search_gifs = require('./constants/consts_search_gifs');
const constants_search_pornstars = require('./constants/consts_search_pornstars');
const constants_search_videos = require('./constants/consts_search_videos');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

module.exports = {
	scraping_search: (source, keys, options) => {
		const doc = utils.source_to_dom(source);

		let datas = {};
		datas = {...datas, ...utils.scraper_content_informations(doc, keys, constants_search.primary_search_selectors, constants_search.page_search_element_attributs)};
		if (!options.search || options.search === 'video') {
			datas[constants.keys.RESULTS] = utils.scraper_array(doc, constants_search_videos.VIDEOS_LIST, constants_search_videos.videos_search_selectors, constants_search_videos.videos_element_attributs);
		}

		if (options.search === 'pornstars') {
			datas[constants.keys.RESULTS] = utils.scraper_array(doc, constants_search_pornstars.PORNSTARS_LIST, constants_search_pornstars.pornstars_search_selectors, constants_search_pornstars.pornstars_element_attributs);
		}

		if (options.search === 'gifs') {
			datas[constants.keys.RESULTS] = utils.scraper_array(doc, constants_search_gifs.GIFS_LIST, constants_search_gifs.gifs_search_selectors, constants_search_gifs.gifs_element_attributs);
		}

		return datas;
	}
};
