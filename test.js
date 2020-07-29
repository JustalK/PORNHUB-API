import test from 'ava';
import m from '.';

const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';

test('title', async t => {
	const video = await m.page(url, ['title','description','views','upvotes','downvotes','percent','author','pornstars','categories','tags','upload_date','download_urls']);
	console.log(video);
	t.is(video.title, 'Hot Kissing Scene');
});
