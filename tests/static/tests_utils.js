const test = require('ava');
const m = require('../../src/utils');

test('[UTILS] Test name_to_url', async t => {
	const url = await m.name_to_url('teacher in macao');

	t.is(url, 'https://www.pornhub.com/model/teacher-in-macao');
});

test('[UTILS] Test name_to_url without a name', async t => {
	const url = await m.name_to_url(null);

	t.is(url, null);
});

test('[UTILS] Test name_to_url with an empty name', async t => {
	const url = await m.name_to_url('');

	t.is(url, null);
});

test('[UTILS] Test name_to_url without a parameter', async t => {
	const url = await m.name_to_url();

	t.is(url, null);
});
