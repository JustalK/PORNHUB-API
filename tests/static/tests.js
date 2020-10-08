const test = require('ava');
const nock = require('nock');
const m = require('../../src');

const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';

test('[PAGE] Test page model', async t => {
	nock('https://www.pornhub.com')
		.get('/model/teacher-of-magic')
		.replyWithFile(200, './tests/datas/page_model.html');
	const model = await m.model('Teacher of Magic', ['TITLE']);

	t.is(model.title, 'Teacher of Magic');
	nock.cleanAll();
});
test('[PAGE] Test with no keys', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0c')
		.replyWithFile(200, './tests/datas/page_pornhub.html');
	const video = await m.page(url);

	t.is(Object.keys(video).length, 0);
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
	const video = await m.page(url, ['title']);

	t.is(video.title, 'Hot Kissing Scene');
	nock.cleanAll();
});

test('[PAGE] Try call on a pornhub page with exception', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0d')
		.replyWithFile(200, './tests/datas/page_pornhub_exception.html');
	const video = await m.page('https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0d', ['author', 'pornstars', 'production']);

	console.log(video);

	t.is(video.author, undefined);
	t.is(video.pornstars, undefined);
	t.is(video.production, undefined);
	nock.cleanAll();
});

test('[PAGE] Try all selector on a pornhub page', async t => {
	nock('https://www.pornhub.com')
		.get('/video/search?search=aa&page=1')
		.replyWithFile(200, './tests/datas/search_pornhub_aa_page_1.html');
	const video = await m.page(url, ['title', 'description', 'views', 'up_votes', 'down_votes', 'percent', 'thumbnail_url', 'author', 'author_subscriber', 'number_of_comment', 'pornstars', 'categories', 'tags', 'upload_date', 'download_urls', 'comments', 'related_videos']);

	t.is(video.title, 'Hot Kissing Scene');
	t.is(video.pornstars[0], 'Rocco Reed');
	t.is(video.pornstars[1], 'Jessie Andrews');
	t.is(video.author, 'lovewetkissing');
	t.is(video.percent, 70);
	t.not(video.thumbnail_url, undefined);
	t.assert(video.number_of_comment > 0);
	t.is(video.tags[0], 'kissing');
	t.is(video.tags[4], 'curvy');
	t.is(video.categories[0], 'Babe');
	t.is(video.categories[4], 'Pornstar');
	t.is(video.comments[0].username, 'kingsignature');
	t.is(video.comments[0].message, 'full video');
	t.assert(video.upload_date.getTime() === new Date('2016-03-30T22:59:58.000Z').getTime());
	t.assert(video.related_videos.length === 8);
	nock.cleanAll();
});

test('[SEARCH] Aa', async t => {
	nock('https://www.pornhub.com')
		.get('/pornstars/search?search=aa&page=1&p=homemade')
		.replyWithFile(200, './tests/datas/search_pornhub_aa_actor_1.html')
		.get('/video/search?search=aa&page=2')
		.replyWithFile(200, './tests/datas/search_pornhub_aa_page_2.html');
	const search = await m.search('Aa', ['related_search', 'RELATED_PORNSTARS'], {page: 2});

	t.is(search.results[0].title, 'AA Big Fake Tits Shower');
	t.is(search.results[0].hd, true);
	t.is(search.results[0].author, 'branleur47');
	t.assert(search.results[0].views >= 15400);
	t.is(search.results[0].premium, false);
	nock.cleanAll();
});

test('[SEARCH] Aa pornstars with special options', async t => {
	nock('https://www.pornhub.com')
		.get('/pornstars/search?search=aa')
		.replyWithFile(200, './tests/datas/search_pornhub_aa_actor_1.html');
	const search = await m.search('Aa', ['ACTOR', 'RANK', 'VIDEO_NUMBER', 'VIEW_NUMBER'], {production: 'homemade', search: 'pornstars'});

	t.is(search.results[0].actor, 'Aaron Vick');
	t.assert(search.results[0].rank > 0);
	nock.cleanAll();
});

test('[SEARCH] Doggy gifs with special options', async t => {
	nock('https://www.pornhub.com')
		.get('/gifs/search?search=doggy&page=1')
		.replyWithFile(200, './tests/datas/search_pornhub_doggy_gifs.html');
	const search = await m.search('doggy', ['TITLE', 'THUMBNAIL_URL', 'LINK_MP4', 'LINK_WEBM'], {search: 'gifs'});

	t.is(search.results[0].title, 'morning doggy');
	t.is(search.results[0].thumbnail_url, 'https://dl.phncdn.com/pics/gifs/004/331/571/(m=bKW1KNV)(mh=vzX1GL0377Gigrxw)4331571a.jpg');
	t.is(search.results[0].link_mp4, 'https://dl.phncdn.com/pics/gifs/004/331/571/4331571a.mp4');
	t.is(search.results[0].link_webm, 'https://dl.phncdn.com/pics/gifs/004/331/571/4331571a.webm');
	t.is(search.results[1].title, 'Sophie Dee Doggy Anal');
	t.is(search.results[1].thumbnail_url, 'https://dl.phncdn.com/pics/gifs/005/296/662/(m=bKW1KNV)(mh=RRWPmEuWI13Ee-gQ)5296662a.jpg');
	t.is(search.results[1].link_mp4, 'https://dl.phncdn.com/pics/gifs/005/296/662/5296662a.mp4');
	t.is(search.results[1].link_webm, 'https://dl.phncdn.com/pics/gifs/005/296/662/5296662a.webm');

	t.is(search.results.length, 34);
	nock.cleanAll();
});

test('[PAGE] Try to trigger an error', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56')
		.reply(404);
	const video = await m.page('https://www.pornhub.com/view_video.php?viewkey=ph56', ['title']);

	t.is(video.error, 'An error occured');
	nock.cleanAll();
});

test('[SEARCH] Try to trigger an error', async t => {
	nock('https://www.pornhub.com')
		.get('/video/search?search=bb&page=1')
		.reply(404);
	const search = await m.search('Bb', ['title']);

	t.is(search.error, 'An error occured');
	nock.cleanAll();
});
