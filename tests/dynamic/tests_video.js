const test = require('ava');
const m = require('../../src');

test('[PAGE] Test video', async t => {
	const video = await m.video(['title']);

	console.log(video);

	t.not(video.results[0].title, undefined);
});
