import test from 'ava';
import m from '.';

const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';

test('[PAGE] Title with string', async t => {
	const video = await m.page(url, 'title');

	t.is(video.title, 'Hot Kissing Scene');
});

test('[PAGE] Title & pornstars', async t => {
	const video = await m.page(url, ['title', 'pornstars']);

	t.is(video.title, 'Hot Kissing Scene');
	t.is(video.pornstars[0], 'Rocco Reed');
	t.is(video.pornstars[1], 'Jessie Andrews');
});

test('[PAGE] Javascript elements', async t => {
	const video = await m.page(url, ['upload_date']);

	t.assert(video.upload_date.getTime() === new Date('2016-03-30T22:59:58.000Z').getTime());
});

test('[PAGE] Related Video', async t => {
	const video = await m.page(url, ['related_videos']);

	t.assert(video.related_videos.length === 8);
});

test('[PAGE] Title', async t => {
	const video = await m.page(url, ['title', 'description', 'views', 'up_votes', 'down_votes', 'percent', 'author', 'author_subscriber', 'number_of_comment', 'pornstars', 'categories', 'tags', 'upload_date', 'download_urls', 'comments']);

	t.is(video.title, 'Hot Kissing Scene');
	t.is(video.pornstars[0], 'Rocco Reed');
	t.is(video.pornstars[1], 'Jessie Andrews');
	t.is(video.author, 'lovewetkissing');
	t.is(video.percent, 70);
	t.is(video.number_of_comment, 13);
	t.is(video.tags[0], 'kissing');
	t.is(video.tags[4], 'curvy');
	t.is(video.categories[0], 'Babe');
	t.is(video.categories[4], 'Pornstar');
	t.is(video.comments[0].username, 'kingsignature');
	t.is(video.comments[0].message, 'full video');
});

test('[SEARCH] Aa', async t => {
	const search = await m.search('Aa', ['page_2', 'related_search', 'RELATED_PORNSTARS']);

	t.is(search.results[0].title, 'AA Big Fake Tits Shower');
	t.is(search.results[0].hd, true);
	t.is(search.results[0].author, 'branleur47');
	t.assert(search.results[0].views >= 15400);
	t.is(search.results[0].premium, false);
});
