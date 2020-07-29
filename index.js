'use strict';

const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const options = {
	title: '.title-container .title .inlineFree',
	views: '.count',
	upvotes: '.votesUp',
	downvotes: '.votesDown',
	percent: '.percent',
	author: '.video-detailed-info .usernameBadgesWrapper a',
	pornstars: '.pornstarsWrapper .pstar-list-btn',
	categories: '.categoriesWrapper a:not(.add-btn-small)',
	tags: '.tagsWrapper a:not(.add-btn-small)',
	production: '.productionWrapper',
	duration: 'meta[property="video:duration"]'
}

const scraper_content_informations = function(doc,keys) {
	const rsl = {};
	Object.keys(options).filter(option => keys.includes(option)).map(x => {
		let elm = Array.from(doc.querySelectorAll(options[x]));
		if(!elm || elm.length===0) return datas[x] = "No data";

		elm = elm.length===1 ? elm[0].textContent : elm.map(node => node.textContent);

		rsl[x] = elm;
	})
	return rsl;
}

const scraper_javascript_informations = function(doc,keys) {
	const rsl = {};

	if(keys.includes("upload_date")) rsl["upload_date"] = JSON.parse(doc.querySelectorAll('script[type="application/ld+json"')[0].textContent).uploadDate;
	if(keys.includes("description")) rsl["description"] = JSON.parse(doc.querySelectorAll('script[type="application/ld+json"')[0].textContent).description;
	if(keys.includes("thumbnail")) rsl["description"] = JSON.parse(doc.querySelectorAll('script[type="application/ld+json"')[0].textContent).thumbnailUrl;

	//thumbnailUrl

	return rsl;
}

const scraper_video_informations = function(source,keys) {
		const rsl = {};

		if(keys.includes("download_urls")) {
	    const matches = source.match(/(?<=\*\/)\w+/g), urls = [];
	    for (let index = 0; index < matches.length; index++) {

	        let regex = new RegExp('(?<=' + matches[index] + '=")[^;]+(?=")', "g");
	        let value = source.match(regex)[0].replace(/[" + "]/g, "");

	        if (value.startsWith("https")) {
	            if (urls.length === 4) break;
	            urls.push(value);
	        } else urls[urls.length -1] += value;
	    }

			urls.map(x => rsl[x.match(/(?<=_)\d*P(?=_)/g)[0]] = x)
		}

    return rsl;
}

const scraping = function(source,keys) {
	const dom = new JSDOM(source);
	const doc = dom.window.document;

	if(!keys || keys.length === 0) return {}
	let datas = {};

	datas = {...datas,...scraper_content_informations(doc,keys)};
	datas = {...datas,...scraper_javascript_informations(doc,keys)};
	datas = {...datas,...scraper_video_informations(source,keys)};

	return datas;
};

const type = {
	'title': 'String',
	'views': 'Number',
	'upvotes': 'Number',
	'downvotes': 'Number',
	'percent': 'Number',
	'author': 'String',
	'categories': 'Array',
	'tags': 'Array',
	'production': 'String',
	'description': 'String',
	'image': 'String',
	'duration': 'Number',
	'upload_date': 'Date',
	'pornstars': 'Array'
}

const sanitizer = function(datas) {
	const rsl = {};
	Object.keys(type).map(x => {
		if(!datas[x]) return;
		switch (type[x]) {
			case 'String':
				rsl[x] = sanitizer_string(datas[x]);
				break;
			case 'Array':
				rsl[x] = sanitizer_array(datas[x]);
				break;
			default:
		}
	})
	return rsl;
}

const sanitizer_string = function(value) {
	value = value.replace(/[\t\n]/g,"")
	value = entities.decode(value);
	return value;
}

const sanitizer_array = function(array) {
	return array.map(x => sanitizer_string(x));
}

module.exports = {
	"scraper" : async function(url, key) {
		const keys = Array.isArray(key) ? key : [key];

		try {
			const response = await got(url);
			const source = response.body;
			let datas =  scraping(source,keys);
			datas = sanitizer(datas);
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
