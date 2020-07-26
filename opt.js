#!/usr/bin/env node

'use strict';

const porn = require('.');

const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';

const opt = process.argv[2];

const returnPornData = async (source, options) => {
	const response = await porn(source, options);
	return response;
};

// OPT : title, views, upvotes, downvotes, low, medium, high, provider, percent

returnPornData(url, opt);
