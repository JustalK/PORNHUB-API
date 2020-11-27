module.exports = {
	remove_duplicate: array => {
		return array.filter((item, index) => array.indexOf(item) === index);
	}
};
