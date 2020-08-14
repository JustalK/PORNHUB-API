const js_type = {
    STRING: 'string',
    URL: 'url',
    NUMBER: 'number',
    ARRAY: 'array',
    DATE: 'date',
    OBJECT: 'object'
}

module.exports = {
    NO_DATA: 'No Data',
    js_type: js_type,
    type: {
    	TITLE: js_type.STRING,
    	VIEWS: js_type.NUMBER,
    	UP_VOTES: js_type.NUMBER,
    	DOWN_VOTES: js_type.NUMBER,
    	PERCENT: js_type.NUMBER,
    	AUTHOR: js_type.STRING,
    	AUTHOR_SUBSCRIBER: js_type.NUMBER,
    	CATEGORIES: js_type.ARRAY,
    	TAGS: js_type.ARRAY,
    	PRODUCTIONS: js_type.STRING,
    	DESCRIPTION: js_type.STRING,
    	DURATION: js_type.NUMBER,
    	UPLOAD_DATE: js_type.DATE,
    	PORNSTARS: js_type.ARRAY,
    	DOWNLOAD_URLS: js_type.URL,
    	THUMBNAIL: js_type.URL,
    	NUMBER_OF_COMMENT: js_type.NUMBER,
    	COMMENTS: js_type.OBJECT
    },
    options: {
    	TITLE: '.title-container .title .inlineFree',
    	VIEWS: '.count',
    	UP_VOTES: '.votesUp',
    	DOWN_VOTES: '.votesDown',
    	PERCENT: '.percent',
    	AUTHOR: '.video-detailed-info .usernameBadgesWrapper a',
    	AUTHOR_SUBSCRIBER: '.video-detailed-info .subscribers-count',
    	PORNSTARS: '.pornstarsWrapper .pstar-list-btn',
    	CATEGORIES: '.categoriesWrapper a:not(.add-btn-small)',
    	TAGS: '.tagsWrapper a:not(.add-btn-small)',
    	PRODUCTION: '.productionWrapper',
    	DURATION: 'meta[property="video:duration"]',
    	NUMBER_OF_COMMENT: '#cmtWrapper h2 span'
    },
    links: {
        SEARCH: 'https://www.pornhub.com/video/search?search='
    },
    errors: {
        DEFAULT: 'the requested data is not available'
    }
}
