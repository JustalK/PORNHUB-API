const utils = require('./utils');
const constants = require('./consts');

const scraper_video_informations = (source, keys) => {
	let rsl = {};

	if (keys.includes('download_urls')) {
		const matches = source.match(/(?<=\*\/)\w+/g);
		const urls = [];

		for (const match of matches) {
			const regex = new RegExp('(?<=' + match + '=")[^;]+(?=")', 'g');
			const value = source.match(regex)[0].replace(/[" +]/g, '');

			if (value.startsWith('https')) {
				if (urls.length === 4) {
					break;
				}

				urls.push(value);
			} else {
				urls[urls.length - 1] += value;
			}
		}

		rsl = urls.map(x => [x.match(/(?<=_)\d*P(?=_)/g)[0], x]);
		rsl = Object.fromEntries(rsl);
	}

	return rsl;
};

const scraper_comments_informations = (doc, keys) => {
	if (keys.includes(constants.keys.COMMENTS)) {
		return { [constants.keys.COMMENTS]: utils.scraper_array(doc, constants.global_selectors.COMMENTS_LIST, constants.comment_selectors, constants.page_element_attributs) };
	}
	return {};
};

const scraper_related_videos_informations = (doc, keys) => {
	if (keys.includes(constants.keys.RELATED_VIDEOS)) {
		return { [constants.keys.RELATED_VIDEOS]: utils.scraper_array(doc, constants.global_selectors.RELATED_VIDEOS_LIST, constants.related_video_selectors, constants.page_search_element_attributs) };
	}
	return {};
};


module.exports = {
    scraping_page: (source, keys) => {
    	const doc = utils.source_to_dom(source);

    	let datas = {};

    	datas = {...datas, ...utils.scraper_content_informations(doc, keys, constants.primary_selectors ,constants.page_element_attributs)};
    	datas = {...datas, download_urls: scraper_video_informations(source, keys)};
    	datas = {...datas, ...scraper_comments_informations(doc, keys)};
    	datas = {...datas, ...scraper_related_videos_informations(doc, keys)};

    	return datas;
    }
}
