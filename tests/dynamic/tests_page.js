const test = require('ava');
const m = require('../../src');

test('[PAGE] Test page model', async t => {
	const page = await m.page('https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c', [
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

	t.is(page.title, 'Hot Kissing Scene');
	t.not(page.description, undefined);
	t.not(page.views, undefined);
	t.not(page.up_votes, undefined);
	t.not(page.down_votes, undefined);
	t.not(page.percent, undefined);
	t.is(page.author, 'lovewetkissing');
	t.not(page.author_subscriber, undefined);
	t.not(page.author_subscriber, 0);
	t.not(page.pornstars, undefined);
	t.is(page.pornstars[0], 'Rocco Reed');
	t.not(page.categories, undefined);
	t.is(page.categories[0], 'Babe');
	t.not(page.tags, undefined);
	t.is(page.tags[0], 'kissing');
	t.not(page.number_of_comment, undefined);
	t.not(page.number_of_comment, 0);
	t.is(page.production, 'professional');
	t.is(page.duration, 266);
	t.not(page.thumbnail_url, undefined);
	t.not(page.upload_date, undefined);
	t.not(page.download_urls, undefined);
	t.not(page.download_urls['720P'], undefined);
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

test('[PAGE] Test search', async t => {
	const search = await m.search('Aa', ['title']);

	t.not(search.results[0].title, undefined);
});
