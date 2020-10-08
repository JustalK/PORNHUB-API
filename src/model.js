const utils = require('./utils');
const consts_global = require('./constants/consts_global');
const consts_model = require('./constants/consts_model');

module.exports = {
	scrap: (source, keys) => {
		const doc = utils.source_to_dom(source);

		let datas = {};
		datas = {...datas, ...utils.scraper_content_informations(doc, keys, consts_model.model_selectors, consts_model.model_element_attributs)};
		
		return datas;
	}
}
