'use strict';

const utils = require('./utils');
const constants = require('./consts');
const got = require('got');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const scraper_content_informations = (doc, keys) => {
	return Object.fromEntries(Object.keys(constants.primary_selectors).filter(option => keys.includes(option)).map(x => {
		let elm = [...doc.querySelectorAll(constants.primary_selectors[x])];
		if (!elm || elm.length === 0) {
			return [x, constants.NO_DATA];
		}

		elm = elm.length === 1 ? elm[0].textContent : elm.map(node => node.textContent);

		return [x, elm];
	}));
};

const scraper_javascript_informations = (doc, keys) => {
	const rsl = {};

	if (keys.includes('upload_date')) {
		rsl.upload_date = JSON.parse(doc.querySelectorAll('script[type="application/ld+json"')[0].textContent).uploadDate;
	}

	if (keys.includes('description')) {
		rsl.description = JSON.parse(doc.querySelectorAll('script[type="application/ld+json"')[0].textContent).description;
	}

	if (keys.includes('thumbnail')) {
		rsl.thumbnail = JSON.parse(doc.querySelectorAll('script[type="application/ld+json"')[0].textContent).thumbnailUrl;
	}

	return rsl;
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

			const comment_datas = Object.fromEntries(Object.keys(constants.comment_selectors).map(x => {
				if(constants.element_attributs[x]) {
					return [x,comment.querySelector(constants.comment_selectors[x]).getAttribute(constants.element_attributs[x])];
				}
				return [x,comment.querySelector(constants.comment_selectors[x]).innerHTML];
			}))

			obj_comment.push(sanitizer(comment_datas))
		})

		rsl[constants.keys.COMMENTS] = obj_comment;
	}

	return rsl;
};


const scraper_search_content_informations = (doc, keys) => {
	const rsl = {};

	const videos = doc.querySelectorAll('#videoSearchResult .pcVideoListItem');
	let obj_videos = [];
	videos.forEach((video,index) => {
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
	})
	rsl["results"] = obj_videos;

	return rsl;
};

const scraping_page = (source, keys) => {
	const dom = new JSDOM(source);
	const doc = dom.window.document;

	if (!keys || keys.length === 0) {
		return {};
	}

	let datas = {};

	datas = {...datas, ...scraper_content_informations(doc, keys)};
	datas = {...datas, ...scraper_javascript_informations(doc, keys)};
	datas = {...datas, download_urls: scraper_video_informations(source, keys)};
	datas = {...datas, ...scraper_comments_informations(doc, keys)};

	return datas;
};

const scraping_search = (source, keys) => {
	const dom = new JSDOM(source);
	const doc = dom.window.document;

	let datas = {};
	datas = {...datas, ...scraper_search_content_informations(doc, keys)};

	return datas;
}

const sanitizer = (datas) => {
	const rsl = Object.keys(constants.type).map(x => {
		if (!datas[x]) {
			return;
		}

		switch (constants.type[x]) {
			case constants.js_type.STRING:
				return [x.toLowerCase(), sanitizer_string(datas[x])];
			case constants.js_type.ARRAY:
				return [x.toLowerCase(), sanitizer_array(datas[x])];
			case constants.js_type.NUMBER:
				return [x.toLowerCase(), utils.sanitizer_number(datas[x])];
			case constants.js_type.DATE:
				return [x.toLowerCase(), sanitizer_date(datas[x])];
			case constants.js_type.NUMBER_KM:
				return [x.toLowerCase(), convert_KM_to_unit(datas[x])];
			default:
				return [x.toLowerCase(), datas[x]];
		}
	}).filter(x => x);

	return Object.fromEntries(rsl);
};

const sanitizer_string = (value) => {
	value = value.replace(/[\t\n]/g, '');
	value = entities.decode(value);
	return value;
};

const sanitizer_array = (array) => {
	return array.map(x => sanitizer_string(x));
};

const sanitizer_date = (value) => {
	return new Date(value);
};

module.exports = {
	page: async (url, key) => {
		const array_keys = Array.isArray(key) ? key : [key];
		const keys = array_keys.map(x => x.toUpperCase());

		try {
			const response = await got(url);
			const source = response.body;
			const datas = scraping_page(source, keys);
			return sanitizer(datas);
		} catch (error) {
			console.log(error);
			if (error) {
				error.message = constants.errors.DEFAULT;
			}

			return {data: error.message};
		}
	},
	search: async (search, key) => {
		const array_keys = Array.isArray(key) ? key : [key];

		try {
			// Search by country
			const response = await got(constants.links.SEARCH+search);
			const source = response.body;
			const datas = scraping_search(source, keys);
			return datas;
		} catch (error) {
			console.log(error);
			if (error) {
				error.message = constants.errors.DEFAULT;
			}

			return {data: error.message};
		}
	}
};
