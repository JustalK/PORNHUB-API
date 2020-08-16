const js_type = {
    STRING: 'string',
    URL: 'url',
    URL_PORNHUB: 'url pornhub',
    NUMBER: 'number',
    NUMBER_KM: 'number with KM',
    ARRAY: 'array',
    DATE: 'date',
    OBJECT: 'object',
    BOOLEAN: 'boolean'
}

module.exports = {
    NO_DATA: 'No Data',
    js_type: js_type,
    keys: {
        COMMENTS: 'COMMENTS'
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
    	PRODUCTIONS: js_type.STRING,
    	DESCRIPTION: js_type.STRING,
    	DURATION: js_type.NUMBER,
    	UPLOAD_DATE: js_type.DATE,
    	PORNSTARS: js_type.ARRAY,
    	DOWNLOAD_URLS: js_type.URL,
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
    	RATING: js_type.NUMBER
    },
    global_selectors: {
        COMMENTS_LIST: '.topCommentBlock',
        SEARCH_LIST: '#videoSearchResult .pcVideoListItem'
    },
    primary_selectors: {
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
    	NUMBER_OF_COMMENT: '#cmtWrapper h2 span',
        UPLOAD_DATE: 'script[type="application/ld+json"',
        DESCRIPTION: 'script[type="application/ld+json"',
        THUMBNAIL_URL: 'script[type="application/ld+json"'
    },
    comment_selectors: {
        AVATAR: '.avatarTrigger',
        USERNAME: '.usernameLink',
        DATE: '.date',
        MESSAGE: '.commentMessage span',
        TOTAL_VOTE: '.voteTotal'
    },
    primary_search_selectors: {
        LINK: 'a',
        TITLE: '.title a',
        HD: 'a .marker-overlays .hd-thumbnail',
        DURATION: 'a .marker-overlays .duration',
        VIEWS: '.videoDetailsBlock var',
        PREMIUM: 'a .marker-overlays .premiumIcon',
        AUTHOR: '.videoUploaderBlock .usernameWrap a',
        RATINGS: '.rating-container .value'
    },
    page_search_element_attributs: {
        LINK: 'href',
        TITLE: 'title',
        HD: null,
        DURATION: 'innerHTML',
        VIEWS: 'innerHTML',
        PREMIUM: null,
        AUTHOR: 'innerHTML',
        RATINGS: 'innerHTML'
    },
    page_element_attributs: {
        TITLE: 'textContent',
        VIEWS: 'textContent',
        UP_VOTES: 'textContent',
        DOWN_VOTES: 'textContent',
        PERCENT: 'textContent',
        AUTHOR: 'textContent',
        AUTHOR_SUBSCRIBER: 'textContent',
        PORNSTARS: 'multi_textContent',
        CATEGORIES: 'multi_textContent',
        TAGS: 'multi_textContent',
        PRODUCTION: 'textContent',
        DURATION: 'textContent',
        NUMBER_OF_COMMENT: 'textContent',
        AVATAR: 'data-src',
        USERNAME: 'innerHTML',
        DATE: 'innerHTML',
        MESSAGE: 'innerHTML',
        TOTAL_VOTE: 'innerHTML',
        UPLOAD_DATE: 'javascript',
        DESCRIPTION: 'javascript',
        THUMBNAIL_URL: 'javascript'
    },
    javascript: {
        UPLOAD_DATE: 'uploadDate',
        DESCRIPTION: 'description',
        THUMBNAIL_URL: 'thumbnailUrl'
    },
    queries: {
        PAGE_: 'PAGE'
    },
    links: {
        BASE_URL: 'https://www.pornhub.com',
        SEARCH: 'https://www.pornhub.com/video/search?search='
    },
    errors: {
        DEFAULT: 'the requested data is not available'
    }
}
