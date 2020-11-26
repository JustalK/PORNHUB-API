const test = require('ava');
const nock = require('nock');
const m = require('../../src');

test('[VIDEO] Try to trigger an error', async t => {
	nock('https://www.pornhub.com')
		.get('/video?o=ht&page=1')
		.reply(404);
	const video = await m.video(null, {filter: 'HOTTEST'});

	t.is(video.error, 'An error occured');
	nock.cleanAll();
});
