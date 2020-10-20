const utils = require('./utils');
const consts_global = require('./constants/consts_global');
const consts_model = require('./constants/consts_model');

module.exports = {
	scrap_unfixed_content_informations: (doc, keys, selectors, attributs) => {
		const elements = [...doc.querySelectorAll('.infoPiece')];

		const keys_values = elements.map(element => {
			const element_key = element.querySelector('span:nth-child(1)');
			const element_key_text = utils.sanitizer_key(element_key.innerHTML);

			const element_value = element.querySelector('span:nth-child(2)');
			const element_value_text = utils.sanitizer_string(element_value.innerHTML);

			return [element_key_text, element_value_text];
		})

		console.log(keys_values);
	},
	scrap: (source, keys) => {
		const doc = utils.source_to_dom(source);

		let datas = {};
		datas = {...datas, ...utils.scraper_content_informations(doc, keys, consts_model.model_selectors, consts_model.model_element_attributs)};
		datas = {...datas, ...module.exports.scrap_unfixed_content_informations(doc, keys, consts_model.model_selectors, consts_model.model_element_attributs)};

		return datas;
	},
	filter_value: (datas, keys) => {
		const match = datas.VIDEO_NUMBER?.match(/(?<=of )\d+/gi, '');
		datas.VIDEO_NUMBER = match[0];

		return datas;
	}
};
