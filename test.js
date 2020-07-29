import test from 'ava';
import m from '.';

const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';

test('Scraper', async t => {
	const video = await m.scraper(url, ['title','description','views','up_votes','down_votes','percent','author','author_subscriber','number_of_comment','pornstars','categories','tags','upload_date','download_urls']);
	console.log(video);
	t.is(video.title, 'Hot Kissing Scene');
	t.is(video.pornstars[0], 'Rocco Reed');
	t.is(video.pornstars[1], 'Jessie Andrews');
});
