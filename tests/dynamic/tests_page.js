const test = require('ava');
const m = require('../../src');

test('[PAGE] Test page model with only a title', async t => {
	const page = await m.page('https://pornhub.com/view_video.php?viewkey=ph5cacd6fc1e731', [
		'title'
	]);

	t.is(page.title, 'CUM4K MULTIPLE CUM FILLED Creampies Compilation');
});

test('[PAGE] Test page model miakhalifa', async t => {
	const model = await m.model('mia khalifa', [
		'TITLE',
		'DESCRIPTION',
		'RANK_MODEL'
	], 'pornstar');

	t.is(model.title, 'Mia Khalifa');
	t.is(model.description, 'No Data');
	t.is(model.rank_model, 8);
});

test('[PAGE] Test page model', async t => {
	const page = await m.page('https://www.pornhub.com/view_video.php?viewkey=2006034279', [
		'title',
		'description',
		'views',
		'up_votes',
		'down_votes',
		'percent',
		'author',
		'author_subscriber',
		'pornstars',
		'categories',
		'tags',
		'production',
		'duration',
		'number_of_comment',
		'thumbnail_url',
		'upload_date',
		'download_urls',
		'comments',
		'related_videos'
	]);

	t.is(page.title, 'Kim Kardashian Sex Tape with Ray J');
	t.not(page.description, undefined);
	t.not(page.views, undefined);
	t.not(page.up_votes, undefined);
	t.not(page.down_votes, undefined);
	t.not(page.percent, undefined);
	t.is(page.author, 'No Data');
	t.not(page.author_subscriber, undefined);
	t.not(page.author_subscriber, 0);
	t.not(page.pornstars, undefined);
	t.is(page.pornstars[0], 'Kim Kardashian');
	t.not(page.categories, undefined);
	t.is(page.categories[0], 'Amateur');
	t.not(page.tags, undefined);
	t.is(page.tags[0], 'big tits');
	t.not(page.number_of_comment, undefined);
	t.not(page.number_of_comment, 0);
	t.is(page.production, 'professional');
	t.is(page.duration, 300);
	t.not(page.thumbnail_url, undefined);
	t.not(page.upload_date, undefined);
	t.not(page.download_urls, undefined);
	t.not(page.download_urls['480P'], undefined);
	t.not(page.download_urls['240P'], undefined);
	t.not(page.comments, undefined);
	t.not(page.comments[0].avatar, undefined);
	t.not(page.comments[0].username, undefined);
	t.not(page.comments[0].date, undefined);
	t.not(page.comments[0].message, undefined);
	t.not(page.comments[0].total_vote, undefined);
	t.not(page.related_videos, undefined);
	t.not(page.related_videos[0].title, undefined);
	t.not(page.related_videos[0].views, undefined);
	t.not(page.related_videos[0].author, undefined);
	t.not(page.related_videos[0].duration, undefined);
	t.not(page.related_videos[0].link, undefined);
	t.not(page.related_videos[0].hd, undefined);
	t.not(page.related_videos[0].premium, undefined);
});

test('[SEARCH&PAGE] Chaining the search and page', async t => {
	const result = await m.search('japan', ['title', 'link', 'premium', 'hd']);
	const url = result.results[1].link;
	const page = await m.page(url, ['title', 'pornstars', 'download_urls']);

	t.not(page.title, undefined);
	t.not(page.pornstars, undefined);
	t.not(page.download_urls, undefined);
	t.is(page.upload_date, undefined);
});

test('[PAGE] Test a specific page', async t => {
	const page = await m.page('https://cn.pornhub.com/view_video.php?viewkey=ph5b1169ea3eda1', ['title', 'duration', 'download_urls']);

	t.not(page.title, undefined);
	t.not(page.duration, undefined);
	t.not(page.download_urls, undefined);
});
