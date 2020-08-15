const js_type = {
    STRING: 'string',
    URL: 'url',
    NUMBER: 'number',
    NUMBER_KM: 'number with KM',
    ARRAY: 'array',
    DATE: 'date',
    OBJECT: 'object'
}

module.exports = {
    NO_DATA: 'No Data',
    js_type: js_type,
    keys: {
        COMMENTS: 'COMMENTS'
    },
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
    	COMMENTS: js_type.OBJECT,
    	AVATAR: js_type.STRING,
        USERNAME: js_type.STRING,
    	DATE: js_type.STRING,
    	MESSAGE: js_type.STRING,
    	TOTAL_VOTE: js_type.NUMBER
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
    	NUMBER_OF_COMMENT: '#cmtWrapper h2 span'
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
    element_attributs: {
        AVATAR: 'data-src',
        USERNAME: 'innerHTML',
        DATE: 'innerHTML',
        MESSAGE: 'innerHTML',
        TOTAL_VOTE: 'innerHTML',
        LINK: 'href',
        TITLE: 'title',
        HD: null,
        DURATION: 'innerHTML',
        VIEWS: 'innerHTML',
        PREMIUM: null,
        AUTHOR: 'innerHTML',
        RATINGS: 'innerHTML'
    },
    links: {
        SEARCH: 'https://www.pornhub.com/video/search?search='
    },
    errors: {
        DEFAULT: 'the requested data is not available'
    }
}
