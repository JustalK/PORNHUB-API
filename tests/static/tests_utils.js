const test = require('ava');
const jsdom = require('jsdom');
const m = require('../../src/utils');
const utils_scrap = require('../../src/helpers/utils_scrap');

test('[UTILS] Test name_to_url', async t => {
	const url = await m.name_to_url('teacher in macao', 'model');

	t.is(url, 'https://www.pornhub.com/model/teacher-in-macao');
});

test('[UTILS] Test name_to_url with pornstar', async t => {
	const url = await m.name_to_url('teacher in macao', 'pornstar');

	t.is(url, 'https://www.pornhub.com/pornstar/teacher-in-macao');
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

test('[UTILS] Test options_to_keys without a parameter', async t => {
	const error = await t.throws(() => {
		m.options_to_keys([]);
	});
	t.is(error.message, 'A key need to be used with this call');
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

	const scrap = await utils_scrap.scrap(doc, keys, attributs);

	t.is(scrap.test, 'inside');
});

test('[UTILS] Test scrap  dataContent with bad parameter - empty', async t => {
	const dom = new jsdom.JSDOM('<html><div data-content="inside">content</div></html>');
	const doc = dom.window.document;
	const keys = {test: null};
	const attributs = {test: 'dataContent'};

	const scrap = await utils_scrap.scrap(doc, keys, attributs);

	t.is(scrap.test, 'No Data');
});

test('[UTILS] Test http_to_https with good parameter', t => {
	const url = m.http_to_https('http://pornhub.com/view_video.php?viewkey=ph5cacd6fc1e731');

	t.is(url, 'https://pornhub.com/view_video.php?viewkey=ph5cacd6fc1e731');
});

test('[UTILS] Test create_query with good parameter', t => {
	const query = m.create_query('p', 'test', ['test', 'notest']);

	t.is(query, '&p=test');
});

test('[UTILS] Test create_query with empty parameter', t => {
	const query = m.create_query('p', undefined, ['test', 'notest']);

	t.is(query, '');
});

test('[UTILS] Test create_query with not allowed parameter', t => {
	const query = m.create_query('p', 'not_allowed', ['test', 'notest']);

	t.is(query, '');
});

test('[UTILS] Test create_queries with not allowed parameter', t => {
	const query = m.create_queries({max_duration: 20}, 0);

	t.is(query, '?max_duration=20&page=1');
});

test('[UTILS] Test create_link with not allowed parameter', t => {
	const query = m.create_link({max_duration: 20}, 0);

	t.is(query, 'https://www.pornhub.com/video?max_duration=20&page=1');
});
