const test = require('ava');
const nock = require('nock');
const m = require('../../src');

const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';

test('[PAGE] Test with no keys, by default title', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0c')
		.replyWithFile(200, './tests/datas/page_pornhub.html');
	const page = await m.page(url);

	t.is(page.title, 'Hot Kissing Scene');
	nock.cleanAll();
});

test('[PAGE] Try only one selector on a pornhub page with a string', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0c')
		.replyWithFile(200, './tests/datas/page_pornhub.html');
	const video = await m.page(url, 'title');

	t.is(video.title, 'Hot Kissing Scene');
	nock.cleanAll();
});

test('[PAGE] Try only one selector on a pornhub page', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0c')
		.replyWithFile(200, './tests/datas/page_pornhub.html');
	const video = await m.page(url, [
		'title'
	]);

	t.is(video.title, 'Hot Kissing Scene');
	nock.cleanAll();
});

test('[PAGE] Try call on a pornhub page with exception', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0d')
		.replyWithFile(200, './tests/datas/page_pornhub_exception.html');
	const video = await m.page('https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0d', [
		'author',
		'pornstars',
		'production'
	]);

	t.is(video.author, 'No Data');
	t.is(video.pornstars, 'No Data');
	t.is(video.production, 'No Data');
	nock.cleanAll();
});

test('[PAGE] Try all selector on a pornhub page', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0cdsds')
		.replyWithFile(200, './tests/datas/page_pornhub.html');
	const video = await m.page('https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0cdsds', [
		'title',
		'description',
		'views',
		'up_votes',
		'down_votes',
		'percent',
		'thumbnail_url',
		'author',
		'author_subscriber',
		'number_of_comment',
		'pornstars',
		'categories',
		'tags',
		'upload_date',
		'download_urls',
		'comments',
		'related_videos'
	]);

	t.is(video.title, 'Hot Kissing Scene');
	t.is(video.pornstars[0], 'Rocco Reed');
	t.is(video.pornstars[1], 'Jessie Andrews');
	t.is(video.author, 'lovewetkissing');
	t.is(video.percent, 69);
	t.not(video.thumbnail_url, undefined);
	t.assert(video.number_of_comment > 0);
	t.is(video.tags[0], 'kissing');
	t.is(video.tags[4], 'curvy');
	t.is(video.categories[0], 'Babe');
	t.is(video.categories[4], 'Pornstar');
	t.is(video.comments[0].username, 'kingsignature');
	t.is(video.comments[0].message, 'full video');
	t.is(video.upload_date.getTime(), new Date('2016-03-30T22:59:58.000Z').getTime());
	t.is(video.related_videos.length, 32);
	nock.cleanAll();
});

test('[PAGE] Try to trigger an error', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56')
		.reply(404);
	const video = await m.page('https://www.pornhub.com/view_video.php?viewkey=ph56', [
		'title'
	]);

	t.is(video.error, 'An error occured');
	nock.cleanAll();
});
