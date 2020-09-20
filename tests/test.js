const test = require('ava');
const nock = require('nock');
const m = require('../src');

const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';

test('[PAGE] Test with no keys', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0c')
		.replyWithFile(200, './tests/page_pornhub.html');
	const video = await m.page(url);

	t.is(Object.keys(video).length, 0);
	nock.cleanAll();
});

test('[PAGE] Try only one selector on a pornhub page with a string', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0c')
		.replyWithFile(200, './tests/page_pornhub.html');
	const video = await m.page(url, 'title');

	t.is(video.title, 'Hot Kissing Scene');
	nock.cleanAll();
});

test('[PAGE] Try only one selector on a pornhub page', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0c')
		.replyWithFile(200, './tests/page_pornhub.html');
	const video = await m.page(url, ['title']);

	t.is(video.title, 'Hot Kissing Scene');
	nock.cleanAll();
});

test('[PAGE] Try call on a pornhub page with exception', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0d')
		.replyWithFile(200, './tests/page_pornhub_exception.html');
	const video = await m.page('https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0d', ['author', 'pornstars', 'production']);

	t.is(video.author, undefined);
	t.is(video.pornstars, undefined);
	t.is(video.production, undefined);
	nock.cleanAll();
});

test('[PAGE] Try all selector on a pornhub page', async t => {
	nock('https://www.pornhub.com')
		.get('/view_video.php?viewkey=ph56fc59c124c0e')
		.replyWithFile(200, './tests/page_pornhub.html');
	const video = await m.page('https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0e', ['title', 'description', 'views', 'up_votes', 'down_votes', 'percent', 'thumbnail_url', 'author', 'author_subscriber', 'number_of_comment', 'pornstars', 'categories', 'tags', 'upload_date', 'download_urls', 'comments', 'related_videos']);

	t.is(video.title, 'Hot Kissing Scene');
	t.is(video.views, '2,116,141');
	t.is(video.up_votes, 5576);
	t.is(video.down_votes, 2415);
	t.is(video.percent, 70);
	t.is(video.author, 'lovewetkissing');
	t.is(video.author_subscriber, 333);
	t.is(video.categories.length, 6);
	t.is(video.categories[0], 'Babe');
	t.is(video.categories[1], 'Brunette');
	t.is(video.categories[2], 'Fetish');
	t.is(video.categories[3], 'HD Porn');
	t.is(video.categories[4], 'Pornstar');
	t.is(video.categories[5], 'Small Tits');
	t.is(video.tags.length, 15);
	t.is(video.tags[0], 'kissing');
	t.is(video.tags[1], 'small tits');
	t.is(video.tags[2], 'makeout');
	t.is(video.tags[3], 'natural tits');
	t.is(video.tags[4], 'curvy');
	t.is(video.tags[5], 'making out');
	t.is(video.tags[6], 'sensual');
	t.is(video.tags[7], 'romantic');
	t.is(video.tags[8], 'frenching');
	t.is(video.tags[9], 'kiss');
	t.is(video.tags[10], 'couple');
	t.is(video.tags[11], 'foreplay');
	t.is(video.tags[12], 'ponytail');
	t.is(video.tags[13], 'stripping');
	t.is(video.tags[14], 'teenager');
	t.not(video.description, undefined);
	t.assert(video.upload_date.getTime() === new Date('2016-03-30T22:59:58.000Z').getTime());
	t.is(video.download_urls['720P'], 'https://ev.phncdn.com/videos/201603/30/72472822/191018_1048_720P_4000K_72472822.mp4?validfrom=1599314534&validto=1599321734&rate=500k&burst=1200k&hash=qECTTJNUu5gX5SLoDFZoZSBvRMs%3D');
	t.is(video.download_urls['480P'], 'https://ev.phncdn.com/videos/201603/30/72472822/191018_1048_480P_2000K_72472822.mp4?validfrom=1599314534&validto=1599321734&rate=500k&burst=1200k&hash=SiJvOeo3Fxh0CinlvdWvdWEquGE%3D');
	t.is(video.download_urls['240P'], 'https://ev.phncdn.com/videos/201603/30/72472822/191018_1048_240P_1000K_72472822.mp4?validfrom=1599314534&validto=1599321734&rate=500k&burst=1200k&hash=v9tAkY0hywpGOpdYXfxpms1f%2Bww%3D');
	t.is(video.pornstars[0], 'Rocco Reed');
	t.is(video.pornstars[1], 'Jessie Andrews');
	t.is(video.thumbnail_url, 'https://ci.phncdn.com/videos/201603/30/72472822/original/(m=eaAaGwObaaaa)(mh=9TJVuQEsiZeJVmtt)9.jpg');
	t.is(video.number_of_comment, 13);
	t.is(video.comments[0].username, 'kingsignature');
	t.is(video.comments[0].message, 'full video');
	t.is(video.comments[0].date, '1 year ago');
	t.is(video.comments[0].total_vote, 32);
	t.is(video.related_videos.length, 8);
	t.is(video.related_videos[0].title, 'Abby Cross tongue kissing');
	t.is(video.related_videos[0].views, 555000);
	t.is(video.related_videos[0].author, 'verymuchalive');
	t.is(video.related_videos[0].duration, 63);
	t.is(video.related_videos[0].link, 'https://www.pornhub.com/https://www.pornhub.com/view_video.php?viewkey=ph58fd24229519c');
	t.is(video.related_videos[0].hd, false);
	t.is(video.related_videos[0].premium, false);
	nock.cleanAll();
});

test('[SEARCH] Aa', async t => {
	nock('https://www.pornhub.com')
		.get('/video/search?search=aa&page=1')
		.replyWithFile(200, './tests/search_pornhub_aa_page_1.html')
		.get('/video/search?search=aa&page=2')
		.replyWithFile(200, './tests/search_pornhub_aa_page_2.html');
	const search = await m.search('Aa', ['related_search', 'related_pornstars', 'author'], {page: 2});

	t.is(search.related_search.length, 19);
	t.is(search.related_search[0], 'anime');
	t.is(search.related_search[1], 'anal');
	t.is(search.related_search[2], 'brazzers');
	t.is(search.related_search[3], 'amateurallure');
	t.is(search.related_search[4], 'small tits');
	t.is(search.related_search[5], 'ash kaashh');
	t.is(search.related_search[6], 'ass');
	t.is(search.related_search[7], 'ava addams');
	t.is(search.related_search[8], 'amber alena');
	t.is(search.related_search[9], 'amateur allure pov');
	t.is(search.related_search[10], 'asian');
	t.is(search.related_search[11], 'amateur');
	t.is(search.related_search[12], 'asian teen');
	t.is(search.related_search[13], 'asmr');
	t.is(search.related_search[14], 'ashley alban');
	t.is(search.related_search[15], 'asa akira');
	t.is(search.related_search[16], 'allure');
	t.is(search.related_search[17], 'perfect ass');
	t.is(search.related_search[18], 'amateur allure');
	t.is(search.related_pornstars.length, 3);
	t.is(search.related_pornstars[0], 'Ashley Alban');
	t.is(search.related_pornstars[1], 'Skylar Valentine');
	t.is(search.related_pornstars[2], 'Chanel Grey');

	t.is(search.results.length, 40);
	t.is(search.results[0].title, 'AA Big Fake Tits Shower');
	t.is(search.results[0].views, 23200);
	t.is(search.results[0].author, 'branleur47');
	t.is(search.results[0].duration, 179);
	t.is(search.results[0].link, 'https://www.pornhub.com/https://www.pornhub.com/view_video.php?viewkey=ph5ee4dc2780048');
	t.is(search.results[0].hd, true);
	t.is(search.results[0].premium, false);

	t.is(search.results[1].title, 'Skylar Valentine Chanel Grey AA');
	t.is(search.results[1].views, 14300);
	t.is(search.results[1].author, 'KingEdwards8');
	t.is(search.results[1].duration, 5080);
	t.is(search.results[1].link, 'https://www.pornhub.com/https://www.pornhub.com/view_video.php?viewkey=ph5e7aa39889710');
	t.is(search.results[1].hd, true);
	t.is(search.results[1].premium, false);

	t.is(search.results[38].title, 'Thick white girl pussy for teen bbc');
	t.is(search.results[38].views, 1000);
	t.is(search.results[38].author, 'Deepsouthbbc');
	t.is(search.results[38].duration, 49);
	t.is(search.results[38].link, 'https://www.pornhub.com/https://www.pornhub.com/view_video.php?viewkey=ph5f31fa8300005');
	t.is(search.results[38].hd, true);
	t.is(search.results[38].premium, false);
	nock.cleanAll();
});

test('[SEARCH] Aa pornstars with special options', async t => {
	nock('https://www.pornhub.com')
		.get('/pornstars/search?search=aa')
		.replyWithFile(200, './tests/search_pornhub_aa_actor_1.html');
	const search = await m.search('Aa', ['ACTOR', 'RANK', 'VIDEO_NUMBER', 'VIEW_NUMBER'], {production: 'homemade', search: 'pornstars'});

	t.is(search.results[0].actor, 'Aaron Vick');
	t.assert(search.results[0].rank > 0);
	nock.cleanAll();
});

test('[SEARCH] Doggy gifs with special options', async t => {
	nock('https://www.pornhub.com')
		.get('/gifs/search?search=doggy&page=1')
		.replyWithFile(200, './tests/search_pornhub_doggy_gifs.html');
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
