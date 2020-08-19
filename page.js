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

const scraper_related_videos_informations = (doc, keys) => {
	const rsl = {};

	if (keys.includes(constants.keys.RELATED_VIDEOS)) {
		const related_videos = doc.querySelectorAll(constants.global_selectors.RELATED_VIDEOS_LIST);
		let obj_related_video = [];
		related_videos.forEach((video,index) => {
            const related_video_datas = utils.scrap(video,constants.related_video_selectors,constants.secondary_search_selectors);
			obj_related_video.push(utils.sanitizer(related_video_datas))
		})

		rsl[constants.keys.RELATED_VIDEOS] = obj_related_video;
	}

	return rsl;
};


module.exports = {
    scraping_page: (source, keys) => {
    	const doc = utils.source_to_dom(source);

    	let datas = {};

    	datas = {...datas, ...utils.scraper_content_informations(doc, keys, constants.primary_selectors ,constants.page_element_attributs)};
    	datas = {...datas, download_urls: scraper_video_informations(source, keys)};
    	datas = {...datas, ...scraper_comments_informations(doc, keys)};
    	datas = {...datas, ...scraper_related_videos_informations(doc, keys)};


		console.log(datas);

    	return datas;
    }
}
