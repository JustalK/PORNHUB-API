'use strict';

const utils = require('./utils');
const got = require('got');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const options = {
	title: '.title-container .title .inlineFree',
	views: '.count',
	up_votes: '.votesUp',
	down_votes: '.votesDown',
	percent: '.percent',
	author: '.video-detailed-info .usernameBadgesWrapper a',
	author_subscriber: '.video-detailed-info .subscribers-count',
	pornstars: '.pornstarsWrapper .pstar-list-btn',
	categories: '.categoriesWrapper a:not(.add-btn-small)',
	tags: '.tagsWrapper a:not(.add-btn-small)',
	production: '.productionWrapper',
	duration: 'meta[property="video:duration"]',
	number_of_comment: '#cmtWrapper h2 span'
};

const scraper_content_informations = function (doc, keys) {
	return Object.fromEntries(Object.keys(options).filter(option => keys.includes(option)).map(x => {
		let elm = [...doc.querySelectorAll(options[x])];
		if (!elm || elm.length === 0) {
			return [x, 'No data'];
		}

		elm = elm.length === 1 ? elm[0].textContent : elm.map(node => node.textContent);

		return [x, elm];
	}));
};

const scraper_javascript_informations = function (doc, keys) {
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

const scraper_video_informations = function (source, keys) {
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

const scraper_comments_informations = function (doc, keys) {
	const rsl = {};

	if (keys.includes('comments')) {
		const comments = doc.querySelectorAll('.topCommentBlock');
		let obj_comment = [];
		comments.forEach((comment,index) => {
			if(index==comments.length-1) return;
			obj_comment.push({
				"avatar": comment.querySelector(".avatarTrigger").getAttribute("data-src"),
				"username": comment.querySelector(".usernameLink").innerHTML,
				"date": sanitizer_string(comment.querySelector(".date").innerHTML),
				"message": comment.querySelector(".commentMessage span").innerHTML,
				"total_vote": utils.sanitizer_number(comment.querySelector(".voteTotal").innerHTML)
			})
		})
		rsl["comments"] = obj_comment;
	}

	return rsl;
};


const scraper_search_content_informations = function (doc, keys) {
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
			"author": video.querySelector(".videoUploaderBlock .usernameWrap a") ? video.querySelector(".videoUploaderBlock .usernameWrap a").innerHTML : 'No Data',
			"ratings": utils.sanitizer_number(video.querySelector(".rating-container .value").innerHTML)
		})
	})
	rsl["results"] = obj_videos;

	return rsl;
};

const scraping_page = function (source, keys) {
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

const scraping_search = function (source, keys) {
	const dom = new JSDOM(source);
	const doc = dom.window.document;

	let datas = {};
	datas = {...datas, ...scraper_search_content_informations(doc, keys)};

	return datas;
}

const type = {
	title: 'String',
	views: 'Number',
	up_votes: 'Number',
	down_votes: 'Number',
	percent: 'Number',
	author: 'String',
	author_subscriber: 'Number',
	categories: 'Array',
	tags: 'Array',
	production: 'String',
	description: 'String',
	duration: 'Number',
	upload_date: 'Date',
	pornstars: 'Array',
	download_urls: 'URL',
	thumbnail: 'URL',
	number_of_comment: 'Number',
	comments: 'Object'
};

const sanitizer = function (datas) {
	const rsl = Object.keys(type).map(x => {
		if (!datas[x]) {
			return;
		}

		switch (type[x]) {
			case 'String':
				return [x, sanitizer_string(datas[x])];
			case 'Array':
				return [x, sanitizer_array(datas[x])];
			case 'Number':
				return [x, utils.sanitizer_number(datas[x])];
			case 'Date':
				return [x, sanitizer_date(datas[x])];
			default:
				return [x, datas[x]];
		}
	}).filter(x => x);

	return Object.fromEntries(rsl);
};

const sanitizer_string = function (value) {
	value = value.replace(/[\t\n]/g, '');
	value = entities.decode(value);
	return value;
};

const sanitizer_array = function (array) {
	return array.map(x => sanitizer_string(x));
};

const sanitizer_date = function (value) {
	return new Date(value);
};

module.exports = {
	page: async (url, key) => {
		const keys = Array.isArray(key) ? key : [key];

		try {
			const response = await got(url);
			const source = response.body;
			const datas = scraping_page(source, keys);
			return sanitizer(datas);
		} catch (error) {
			console.log(error);
			if (error) {
				error.message = 'the requested data is not available';
			}

			return {data: error.message};
		}
	},
	search: async (search, key) => {
		const keys = Array.isArray(key) ? key : [key];

		try {
			// Search by country
			const response = await got("https://www.pornhub.com/video/search?search="+search);
			const source = response.body;
			const datas = scraping_search(source, keys);
			return datas;
		} catch (error) {
			console.log(error);
			if (error) {
				error.message = 'the requested data is not available';
			}

			return {data: error.message};
		}
	}
};
