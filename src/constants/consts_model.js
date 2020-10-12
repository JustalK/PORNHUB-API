module.exports = {
	model_selectors: {
		TITLE: 'h1',
		RANK_MODEL: '.rankingInfo div:nth-child(1) .big',
		RANK_WEEK_MODEL: '.rankingInfo div:nth-child(2) .big',
		DESCRIPTION: '.model-details .aboutMeSection div:nth-child(2)'
	},
	model_element_attributs: {
		TITLE: 'innerHTML',
		DESCRIPTION: 'innerHTML',
		RANK_MODEL: 'textContent',
		RANK_WEEK_MODEL: 'textContent'
	}
};
