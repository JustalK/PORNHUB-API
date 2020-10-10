const test = require('ava');
const jsdom = require('jsdom');
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

test('[UTILS] Test convert_to_second with good parameter minutes and seconds', async t => {
	const timestamp = await m.convert_to_second('3:35');
	t.is(timestamp, 215);
});

test('[UTILS] Test convert_to_second with good parameter hours, minutes and seconds', async t => {
	const timestamp = await m.convert_to_second('2:03:35');
	t.is(timestamp, 7415);
});

test('[UTILS] Test convert_to_second with good parameter seconds timer', async t => {
	const timestamp = await m.convert_to_second('00:35');
	t.is(timestamp, 35);
});

test('[UTILS] Test convert_to_second with good parameter seconds', async t => {
	const timestamp = await m.convert_to_second('22');
	t.is(timestamp, 22);
});

test('[UTILS] Test convert_to_second with bad parameter empty', async t => {
	const timestamp = await m.convert_to_second('');
	t.is(timestamp, 'No Data');
});

test('[UTILS] Test convert_to_second with good parameter null', async t => {
	const timestamp = await m.convert_to_second(null);
	t.is(timestamp, 'No Data');
});

test('[UTILS] Test convert_to_second with good parameter none', async t => {
	const timestamp = await m.convert_to_second();
	t.is(timestamp, 'No Data');
});

test('[UTILS] Test scrap dataContent with good parameter', async t => {
	const dom = new jsdom.JSDOM('<html><meta content="inside">content</meta></html>');
	const doc = dom.window.document;
	const keys = {test: 'meta'};
	const attributs = {test: 'dataContent'};

	const scrap = await m.scrap(doc, keys, attributs);

	t.is(scrap.test, 'inside');
});

test('[UTILS] Test scrap  dataContent with bad parameter - empty', async t => {
	const dom = new jsdom.JSDOM('<html><div data-content="inside">content</div></html>');
	const doc = dom.window.document;
	const keys = {test: null};
	const attributs = {test: 'dataContent'};

	const scrap = await m.scrap(doc, keys, attributs);

	t.is(scrap.test, 'No Data');
});
