'use strict';

const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const options = {
	title: '.title-container .title .inlineFree',
	views: '.count',
	upvotes: '.votesUp',
	downvotes: '.votesDown',
	percent: '.percent',
	date: '',
	author: '.video-detailed-info .usernameBadgesWrapper a',
	pornstars: '.pornstarsWrapper .pstar-list-btn',
	categories: '.categoriesWrapper a:not(.add-btn-small)',
	tags: '.tagsWrapper a:not(.add-btn-small)',
	production: '.productionWrapper',
	description: 'meta[property="og:description"]',	
	image: 'meta[property="og:image"]',
	duration: 'meta[property="video:duration"]'
}

const parseDom = (doc,keys) => {
	if(!keys || keys.length === 0) return {}
	let datas = {};

	Object.keys(options).filter(option => keys.includes(option)).map(x => {
		let elm = Array.from(doc.querySelectorAll(options[x]));
		if(!elm || elm.length===0) return datas[x] = "No data";
		
		elm = elm.length===1 ? elm[0].textContent : elm.map(node => node.textContent);
		
		datas[x] = elm;
	})
	
	datas["uploaddate"] = JSON.parse(window.document.querySelectorAll('script[type="application/ld+json"')[0].textContent).uploadDate;
	
	return datas;
};

const getDownloadUrl = function(doc) {
    const matches = doc.match(/(?<=\*\/)\w+/g), urls = []; 
    for (let index = 0; index < matches.length; index++) { 
        
        let regex = new RegExp('(?<=' + matches[index] + '=")[^;]+(?=")', "g");
        let value = doc.match(regex)[0].replace(/[" + "]/g, "");
        
        if (value.startsWith("https")) {
            if (urls.length === 4) break;
            urls.push(value);
        } else urls[urls.length -1] += value;
    }
    
    return urls;
}

module.exports = {
	"page" : async (url, key) => {
		const keys = Array.isArray(key) ? key : [key];
	
		try {
			const response = await got(url);
			const source = response.body;
			const dom = new JSDOM(source);
			return parseDom(dom.window.document,keys);
		} catch (error) {
			console.log(error);
			if (error) {
				error.message = 'the requested data is not available';
			}
	
			return {data: error.message};
	}
}
};
