const test = require('ava');
const m = require('..');

const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';

test('[PAGE] Try all selector on a pornhub page', async t => {
	t.timeout(10000, 'make sure pornhub website has been called');
	const video = await m.page(url, ['title', 'description', 'views', 'up_votes', 'down_votes', 'percent', 'author', 'author_subscriber', 'number_of_comment', 'pornstars', 'categories', 'tags', 'upload_date', 'download_urls', 'comments', 'related_videos']);

	t.is(video.title, 'Hot Kissing Scene');
	t.is(video.pornstars[0], 'Rocco Reed');
	t.is(video.pornstars[1], 'Jessie Andrews');
	t.is(video.author, 'lovewetkissing');
	t.is(video.percent, 70);
	t.is(video.number_of_comment, 14);
	t.is(video.tags[0], 'kissing');
	t.is(video.tags[4], 'curvy');
	t.is(video.categories[0], 'Babe');
	t.is(video.categories[4], 'Pornstar');
	t.is(video.comments[0].username, 'kingsignature');
	t.is(video.comments[0].message, 'full video');
	t.assert(video.upload_date.getTime() === new Date('2016-03-30T22:59:58.000Z').getTime());
	t.assert(video.related_videos.length === 8);
});

test('[SEARCH] Aa', async t => {
	t.timeout(10000, 'make sure pornhub website has been called');
	const search = await m.search('Aa', ['related_search', 'RELATED_PORNSTARS'], {page: 2});

	t.is(search.results[0].title, 'AA Big Fake Tits Shower');
	t.is(search.results[0].hd, true);
	t.is(search.results[0].author, 'branleur47');
	t.assert(search.results[0].views >= 15400);
	t.is(search.results[0].premium, false);
});

test('[SEARCH] Aa pornstars with special options', async t => {
	t.timeout(10000, 'make sure pornhub website has been called');
	const search = await m.search('Aa', ['ACTOR', 'RANK', 'VIDEO_NUMBER', 'VIEW_NUMBER'], {production: 'homemade', search: 'pornstars'});

	console.log(search);
	t.is(search.results[0].actor, 'Aaron Vick');
	t.assert(search.results[0].rank > 0 );
});

test('[PAGE] Try to trigger an error', async t => {
	t.timeout(10000, 'make sure pornhub website has been called');
	const video = await m.page('https://www.pornhub.com/view_video.php?viewkey=ph56', ['title']);

	t.is(video.error, 'An error occured');
});
