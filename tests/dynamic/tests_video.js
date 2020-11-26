const test = require('ava');
const m = require('../../src');

test('[PAGE] Test video without options', async t => {
	const video = await m.video(['asdasdasd']);

	console.log(video);

	t.not(video.results[0].title, undefined);
});

test('[PAGE] Test video with options', async t => {
	const video = await m.video(null, {production: 'homemade', min_duration: 20, filter: 'MOST_VIEWED'});

	t.not(video.results[0].title, undefined);
});
