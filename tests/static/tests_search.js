const test = require('ava');
const nock = require('nock');
const m = require('../../src');

test('[SEARCH] Aa', async t => {
	nock('https://www.pornhub.com')
		.get('/video/search?search=aa&page=1')
		.replyWithFile(200, './tests/datas/search_pornhub_aa_page_1.html')
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
		.get('/pornstars/search?search=ac&page=1&p=homemade')
		.replyWithFile(200, './tests/datas/search_pornhub_aa_actor_1.html');
	const search = await m.search('Ac', ['ACTOR', 'RANK', 'VIDEO_NUMBER', 'VIEW_NUMBER'], {production: 'homemade', search: 'pornstars'});

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

test('[SEARCH] Try to trigger an error', async t => {
	nock('https://www.pornhub.com')
		.get('/video/search?search=bb&page=1')
		.reply(404);
	const search = await m.search('Bb', ['title']);

	t.is(search.error, 'An error occured');
	nock.cleanAll();
});
