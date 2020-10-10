const js_type = {
	STRING: 'string',
	URL: 'url',
	URL_PORNHUB: 'url pornhub',
	NUMBER: 'number',
	NUMBER_KM: 'number with KM',
	NUMBER_SECONDS: 'number in seconds',
	ARRAY: 'array',
	DATE: 'date',
	OBJECT: 'object',
	BOOLEAN: 'boolean'
};

module.exports = {
	NO_DATA: 'No Data',
	js_type,
	keys: {
		COMMENTS: 'COMMENTS',
		RELATED_VIDEOS: 'RELATED_VIDEOS',
		DOWNLOAD_URLS: 'DOWNLOAD_URLS',
		RESULTS: 'RESULTS'
	},
	type: {
		TITLE: js_type.STRING,
		VIEWS: js_type.NUMBER_KM,
		UP_VOTES: js_type.NUMBER,
		DOWN_VOTES: js_type.NUMBER,
		PERCENT: js_type.NUMBER,
		AUTHOR: js_type.STRING,
		AUTHOR_SUBSCRIBER: js_type.NUMBER,
		CATEGORIES: js_type.ARRAY,
		TAGS: js_type.ARRAY,
		PRODUCTION: js_type.STRING,
		DESCRIPTION: js_type.STRING,
		DURATION: js_type.NUMBER,
		UPLOAD_DATE: js_type.DATE,
		PORNSTARS: js_type.ARRAY,
		DOWNLOAD_URLS: js_type.OBJECT,
		LINK: js_type.URL_PORNHUB,
		THUMBNAIL_URL: js_type.URL,
		HD: js_type.BOOLEAN,
		NUMBER_OF_COMMENT: js_type.NUMBER,
		COMMENTS: js_type.OBJECT,
		AVATAR: js_type.STRING,
		USERNAME: js_type.STRING,
		DATE: js_type.STRING,
		MESSAGE: js_type.STRING,
		TOTAL_VOTE: js_type.NUMBER,
		PREMIUM: js_type.BOOLEAN,
		RATING: js_type.NUMBER,
		RELATED_SEARCH: js_type.ARRAY,
		RELATED_PORNSTARS: js_type.ARRAY,
		RELATED_VIDEOS: js_type.OBJECT,
		RESULTS: js_type.OBJECT,
		ACTOR: js_type.STRING,
		VIDEO_NUMBER: js_type.STRING,
		VIEW_NUMBER: js_type.STRING,
		RANK: js_type.NUMBER,
		LINK_MP4: js_type.URL,
		LINK_WEBM: js_type.URL
	},
	queries: {
		PAGE_: 'PAGE'
	},
	links: {
		BASE_URL: 'https://www.pornhub.com/',
		SEARCH: '/search?search=',
		MODEL: 'model/'
	},
	errors: {
		DEFAULT: 'An error occured'
	}
};
