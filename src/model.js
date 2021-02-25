const utils = require('./utils');
const utils_sanitizer = require('./helpers/utils_sanitizer');
const utils_scrap = require('./helpers/utils_scrap');
const utils_global = require('./helpers/utils_global');
const consts_global = require('./constants/consts_global');
const consts_model = require('./constants/consts_model');

module.exports = {
	extract_informations_model: (doc, selector_elements) => {
		const elements = [...doc.querySelectorAll(selector_elements)];

		return Object.fromEntries(elements.map(element => {
			const element_key = element.querySelector('span:nth-child(1)');
			const element_key_text = utils_sanitizer.sanitizer_key(element_key.innerHTML);

			const element_value = element.querySelector('span:nth-child(2)');
			const element_value_text = element_value === null ? consts_global.NO_DATA : utils_sanitizer.sanitizer_string(element_value.innerHTML);

			return [element_key_text, element_value_text];
		}));
	},
	scrap_unfixed_content_informations: (doc, keys, selectors, attributs) => {
		const informations = module.exports.extract_informations_model(doc, consts_model.PROFIL_INFOS_LIST);
		const informations_restricted = utils_global.selectors_restriction(keys, informations);
		return informations_restricted;
	},
	scrap: (source, keys) => {
		const doc = utils.source_to_dom(source);

		let datas = {};
		datas = {...datas, ...utils_scrap.scraper_content_informations(doc, keys, consts_model.model_selectors, consts_model.model_element_attributs)};
		datas = {...datas, ...module.exports.scrap_unfixed_content_informations(doc, keys, consts_model.model_selectors, consts_model.model_element_attributs)};

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
