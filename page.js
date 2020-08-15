const utils = require('./utils');
const constants = require('./consts');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const selectors_restriction = (keys) => {
    return Object.fromEntries(Object.keys(constants.primary_selectors).map(selector => {
        if(keys.includes(selector)) {
            return [selector, constants.primary_selectors[selector]];
        }
        return;
    }).filter(x => x));
}

const scraper_content_informations = (doc, keys) => {
    const selectors = selectors_restriction(keys);
    return utils.scrap(doc, selectors, constants.page_element_attributs);
};

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
	const rsl = {};

	if (keys.includes(constants.keys.COMMENTS)) {
		const comments = doc.querySelectorAll(constants.global_selectors.COMMENTS_LIST);
		let obj_comment = [];
		comments.forEach((comment,index) => {
			if(index==comments.length-1) return;

            const comment_datas = utils.scrap(comment,constants.comment_selectors,constants.page_element_attributs);
			obj_comment.push(utils.sanitizer(comment_datas))
		})

		rsl[constants.keys.COMMENTS] = obj_comment;
	}

	return rsl;
};


module.exports = {
    scraping_page: (source, keys) => {
    	const dom = new JSDOM(source);
    	const doc = dom.window.document;

    	if (!keys || keys.length === 0) {
    		return {};
    	}

    	let datas = {};

    	datas = {...datas, ...scraper_content_informations(doc, keys)};
    	datas = {...datas, download_urls: scraper_video_informations(source, keys)};
    	datas = {...datas, ...scraper_comments_informations(doc, keys)};

    	return datas;
    }
}
