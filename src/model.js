const utils = require('./utils');
const consts_global = require('./constants/consts_global');

module.exports = {
	scrap: (source, keys) => {
		const doc = utils.source_to_dom(source);

		console.log(doc);
		return doc;
	}
}
