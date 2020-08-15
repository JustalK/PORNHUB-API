const utils = require('./utils');
const constants = require('./consts');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const scraper_search_content_informations = (doc, keys) => {
	const rsl = {};

	const videos = doc.querySelectorAll(constants.global_selectors.SEARCH_LIST);
	let obj_videos = [];
	videos.forEach((video,index) => {
        obj_videos.push(utils.scrap(video,constants.primary_search_selectors));
        /**
		obj_videos.push({
			"link": "https://www.pornhub.com"+video.querySelector("a").getAttribute("href"),
			"title": video.querySelector(".title a").getAttribute("title"),
			"hd": video.querySelector("a .marker-overlays .hd-thumbnail") ? true : false,
			"duration": utils.convert_to_second(video.querySelector("a .marker-overlays .duration").innerHTML),
			"views": utils.convert_KM_to_unit(video.querySelector(".videoDetailsBlock var").innerHTML),
			"premium": video.querySelector("a .marker-overlays .premiumIcon") ? true : false,
			"author": video.querySelector(".videoUploaderBlock .usernameWrap a") ? video.querySelector(".videoUploaderBlock .usernameWrap a").innerHTML : constants.NO_DATA,
			"ratings": utils.sanitizer_number(video.querySelector(".rating-container .value").innerHTML)
		})
        **/
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
