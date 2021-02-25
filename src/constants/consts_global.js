const js_type = {
	STRING: 'STRING',
	URL: 'URL',
	URL_PORNHUB: 'URL_PORNHUB',
	NUMBER: 'NUMBER',
	NUMBER_KM: 'NUMBER_KM',
	NUMBER_SECONDS: 'NUMBER_SECONDS',
	ARRAY: 'ARRAY',
	DATE: 'DATE',
	OBJECT: 'OBJECT',
	BOOLEAN: 'BOOLEAN'
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
		RANK_MODEL: js_type.NUMBER,
		RANK_WEEK_MODEL: js_type.NUMBER,
		RANK_MONTH_MODEL: js_type.NUMBER,
		RANK_LAST_MONTH_MODEL: js_type.NUMBER,
		RANK_YEAR_MODEL: js_type.NUMBER,
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
		VIDEO_NUMBER: js_type.NUMBER,
		VIEW_NUMBER: js_type.STRING,
		RANK: js_type.NUMBER,
		LINK_MP4: js_type.URL,
		LINK_WEBM: js_type.URL,
		RELATIONSHIP_STATUS: js_type.STRING,
		INTERESTED_IN: js_type.STRING,
		GENDER: js_type.STRING,
		BIRTHDAY: js_type.DATE,
		AGE: js_type.NUMBER,
		HEIGHT: js_type.STRING,
		WEIGHT: js_type.STRING,
		ETHNICITY: js_type.STRING,
		VIDEO_VIEWS: js_type.NUMBER,
		PROFILE_VIEWS: js_type.NUMBER,
		VIDEOS_WATCHED: js_type.NUMBER,
		JOINED: js_type.STRING
	},
	queries: {
		PAGE_: 'PAGE'
	},
	links: {
		BASE_URL: 'https://www.pornhub.com',
		SEARCH: 'search',
		VIDEO: 'video',
		MODEL: 'model/'
	},
	types: {
		MODEL: 'model',
		PORNSTAR: 'pornstar'
	},
	errors: {
		DEFAULT: 'An error occured'
	}
};
