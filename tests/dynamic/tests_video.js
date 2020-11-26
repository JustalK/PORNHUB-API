const test = require('ava');
const m = require('../../src');

test('[VIDEO] Test video without options', async t => {
	const video = await m.video();

	t.not(video.results[0].title, undefined);
	t.assert(video.results.length <= 40);
});

test('[VIDEO] Test video with options page', async t => {
	const video = await m.video(['title'], {page: 2});

	t.not(video.results[0].title, undefined);
	t.assert(video.results.length >= 72);
});

test('[VIDEO] Test video with options', async t => {
	const video = await m.video(null, {production: 'homemade', min_duration: 20, filter: 'MOST_VIEWED'});

	t.not(video.results[0].title, undefined);
});
