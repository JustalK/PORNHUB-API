const test = require('ava');
const m = require('../../src');

test('[PAGE] Test search', async t => {
	const search = await m.search('Aa', ['title']);

	t.not(search.results[0].title, undefined);
});

test('[PAGE] Test search max_duration', async t => {
	const search = await m.search('Aa', ['title'], {min_duration: 10, max_duration: 20});

	t.not(search.results[0].title, undefined);
});
