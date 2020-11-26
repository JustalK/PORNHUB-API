const test = require('ava');
const nock = require('nock');
const m = require('../../src');

test('[PAGE] Test page model', async t => {
	nock('https://www.pornhub.com')
		.get('/model/teacher-of-magic')
		.replyWithFile(200, './tests/datas/page_model.html');
	const model = await m.model('Teacher of Magic', [
		'TITLE',
		'DESCRIPTION',
		'RANK_MODEL',
		'RANK_WEEK_MODEL',
		'RANK_MONTH_MODEL',
		'RANK_LAST_MONTH_MODEL',
		'RANK_YEAR_MODEL',
		'VIDEO_NUMBER',
		'RELATIONSHIP_STATUS',
		'RELATIONSHIP_STATUS',
		'INTERESTED_IN',
		'GENDER',
		'BIRTHDAY',
		'AGE',
		'HEIGHT',
		'WEIGHT',
		'ETHNICITY',
		'VIDEO_VIEWS',
		'PROFILE_VIEWS',
		'VIDEOS_WATCHED',
		'JOINED'
	]);

	t.is(model.title, 'Teacher of Magic');
	t.not(model.description, undefined);
	t.is(model.rank_model, 53);
	t.is(model.rank_week_model, 41);
	t.is(model.rank_month_model, 53);
	t.is(model.rank_last_month_model, 52);
	t.is(model.rank_year_model, 44);
	t.is(model.video_number, 242);
	t.is(model.relationship_status, 'Open');
	t.is(model.interested_in, 'Guys and Girls');
	t.is(model.gender, 'Female');
	t.not(model.birthday, undefined);
	t.is(model.age, 40);
	t.is(model.height, '5\' 7" (170cm)');
	t.is(model.weight, '156lbs. (71kg)');
	t.is(model.ethnicity, 'Other');
	t.is(model.video_views, 385264877);
	t.is(model.profile_views, 19136136);
	t.is(model.videos_watched, 3647);
	t.is(model.joined, '4 years ago');
	nock.cleanAll();
});

test('[PAGE] Test page model without video number', async t => {
	nock('https://www.pornhub.com')
		.get('/model/teacher-of-magic')
		.replyWithFile(200, './tests/datas/page_model.html');
	const model = await m.model('Teacher of Magic', [
		'TITLE'
	]);

	t.not(model.video_number, 242);
	nock.cleanAll();
});

test('[SEARCH] Try to trigger an error', async t => {
	nock('https://www.pornhub.com')
		.get('/model/teacher-of-magic')
		.reply(404);
	const model = await m.model('Teacher of Magic', ['TITLE']);

	t.is(model.error, 'An error occured');
	nock.cleanAll();
});
