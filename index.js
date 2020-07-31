'use strict';

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
	const rsl = {};
	Object.keys(options).filter(option => keys.includes(option)).map(x => {
		let elm = [...doc.querySelectorAll(options[x])];
		if (!elm || elm.length === 0) {
			rsl[x] = 'No data';
			return;
		}

		elm = elm.length === 1 ? elm[0].textContent : elm.map(node => node.textContent);

		rsl[x] = elm;
	});
	return rsl;
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
	const rsl = {};

	if (keys.includes('download_urls')) {
		const matches = source.match(/(?<=\*\/)\w+/g);
		const urls = [];

		for (let index = 0; index < matches.length; index++) {
			const regex = new RegExp('(?<=' + matches[index] + '=")[^;]+(?=")', 'g');
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

		urls.map(x => rsl[x.match(/(?<=_)\d*P(?=_)/g)[0]] = x);
	}

	return rsl;
};

const scraper_comments_informations = function (doc, keys) {
	const rsl = {};

	if (keys.includes('download_urls')) {
		return;
	}

	return rsl;
};

const scraping = function (source, keys) {
	const dom = new JSDOM(source);
	const doc = dom.window.document;

	if (!keys || keys.length === 0) {
		return {};
	}

	let datas = {};

	datas = {...datas, ...scraper_content_informations(doc, keys)};
	datas = {...datas, ...scraper_javascript_informations(doc, keys)};
	datas = {...datas, download_urls: scraper_video_informations(source, keys)};

	return datas;
};

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
	image: 'String',
	duration: 'Number',
	upload_date: 'Date',
	pornstars: 'Array',
	download_urls: 'URL',
	thumbnail: 'URL',
	number_of_comment: 'Number'
};

const sanitizer = function (datas) {
	const rsl = {};
	Object.keys(type).map(x => {
		if (!datas[x]) {
			return;
		}

		switch (type[x]) {
			case 'String':
				rsl[x] = sanitizer_string(datas[x]);
				break;
			case 'Array':
				rsl[x] = sanitizer_array(datas[x]);
				break;
			case 'Number':
				rsl[x] = sanitizer_number(datas[x]);
				break;
			case 'Date':
				rsl[x] = sanitizer_date(datas[x]);
				break;
			default:
				rsl[x] = datas[x];
		}
	});
	return rsl;
};

const sanitizer_string = function (value) {
	value = value.replace(/[\t\n]/g, '');
	value = entities.decode(value);
	return value;
};

const sanitizer_array = function (array) {
	return array.map(x => sanitizer_string(x));
};

const sanitizer_number = function (value) {
	value = value.replace(/[()&A-Za-z,%]/g, '');
	value = Number(value);
	return value;
};

const sanitizer_date = function (value) {
	return new Date(value);
};

module.exports = {
	scraper: async function (url, key) {
		const keys = Array.isArray(key) ? key : [key];

		try {
			const response = await got(url);
			const source = response.body;
			const datas = scraping(source, keys);
			return sanitizer(datas);
		} catch (error) {
			console.log(error);
			if (error) {
				error.message = 'the requested data is not available';
			}

			return {data: error.message};
		}
	}
};
