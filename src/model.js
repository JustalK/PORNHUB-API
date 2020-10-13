const utils = require('./utils');
const consts_global = require('./constants/consts_global');
const consts_model = require('./constants/consts_model');

module.exports = {
	scrap: (source, keys) => {
		const doc = utils.source_to_dom(source);

		let datas = {};
		datas = {...datas, ...utils.scraper_content_informations(doc, keys, consts_model.model_selectors, consts_model.model_element_attributs)};

		return datas;
	},
	filter_value: (datas, keys) => {
		if (datas.VIDEO_NUMBER) {
			const match = datas.VIDEO_NUMBER.match(/(?<=of )\d+/gi, '');
			datas.VIDEO_NUMBER = match[0];
		}

		return datas;
	}
};
