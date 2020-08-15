const utils = require('./utils');
const constants = require('./consts');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const scraper_search_content_informations = (doc, keys) => {
	const rsl = {};

	const videos = [...doc.querySelectorAll(constants.global_selectors.SEARCH_LIST)];
	let obj_videos = videos.map((video,index) => {
        const tmp = utils.scrap(video,constants.primary_search_selectors,constants.page_search_element_attributs);
        return utils.sanitizer(tmp);
	})
	rsl["results"] = obj_videos;

	return rsl;
}


module.exports = {
    scraping_search: (source, keys) => {
        const dom = new JSDOM(source);
        const doc = dom.window.document;

        let datas = {};
        datas = {...datas, ...scraper_search_content_informations(doc, keys)};

        return datas;
    }
}
