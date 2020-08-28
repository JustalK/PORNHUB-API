# PORNHUB API

![Last version npm](https://img.shields.io/npm/v/@justalk/pornhub-api.svg?style=flat-square)
![Last version](https://img.shields.io/github/v/tag/justalk/pornhub-api.svg?style=flat-square)
[![Node version](https://img.shields.io/node/v/@justalk/pornhub-api.svg?style=flat-square)](https://www.npmjs.com/package/@justalk/pornhub-api)
[![Travis](https://img.shields.io/travis/com/justalk/pornhub-api.svg?style=flat-square)](https://travis-ci.com/github/JustalK/PORNHUB-API)
[![Coverage Status](https://coveralls.io/repos/github/JustalK/PORNHUB-API/badge.svg?branch=master&style=flat-square)](https://coveralls.io/github/JustalK/PORNHUB-API?branch=master)
[![Dependency status](http://img.shields.io/david/justalk/pornhub-api.svg?style=flat-square)](https://david-dm.org/justalk/pornhub-api.svg)
![Last version](https://img.shields.io/github/license/justalk/pornhub-api.svg?style=flat-square)

![Star the project](https://img.shields.io/github/stars/justalk/pornhub-api?style=social)

Powerful scraper for PornHub. Unlike others scrapers, it's working in 2020 August with their new website. It allows you to get any informations out of any page.

`npm install @justalk/pornhub-api`

## Features

- **Scraper:** Parse any informations from a video page on PornHub : Related video. comments, view, vote up and so many others...

- **Download links:** Get the download links in all the quality without registering

- **Search pagination:** Possibility to scrap multiple page search

- **Search by different criteria:** Possibility to scrap search by actor or title

- **Flexible:** The results are always return in a very specific javascrypt type making it easy to integrate to your need.


## API

### Video page pornhub

###### Function available for a page

```js
async page(url, options)
```

| name | type | description |
| :--- | :---------- | :--- |
| url | String | url of the page |
| keys | Array | List of the keys |

###### Lists of keys available for a page

| name of key | return type | description |
| :--- | :---------- | :--- |
| title | String | Title |
| description | String | Description |
| views | Number | Number total of views |
| up_votes | Number | Number of up vote |
| down_votes | Number | Number of down vote |
| percent | Number | Percent of up vote |
| author | String | Name of the uploader |
| author_subscriber | Number | Number of subscriber of the uploader |
| pornstars | Array | Names of the pornstars |
| categories | Array | List of the names of the categories |
| tags | Array | List of the names of the tags |
| production | String | Type of production |
| duration | Number | Duration in second |
| number_of_comment | Number | Total number of comments |
| thumbnail | String | Url of the thumbnail |
| upload_date | Date | Date of upload |
| download_urls |  Object | List of download link by quality |
| comments |  Object | List of comments with additionnals informations |

### Search page pornhub

###### Function available for the search

```js
async search(value)
```

| name | type | description |
| :--- | :---------- | :--- |
| value | String | value search in pornhub |
| keys | Array or String if there is only one option | List of the keys |
| options | Array or String if there is only one option | List of the options |

###### Lists of keys available for a search by title

| name of option | return type | description |
| :--- | :---------- | :--- |
| page_X | String | X specify the number of page search to scrap |
| related_search | Array | The related search |
| related_pornstars | Array | The related pornstars |


### Examples

###### Scraping the title of a video

```js
const video = await module-name.page(url, ['title']);
```


```json
{
	"title": "Name of the video"
}
```

###### Scraping the title of a video and the description

```js
const video = await module-name.page(url, ['title','description']);
```

```json
{
	"title": "Name of the video",
	"description": "Description of the video"
}
```

###### Scraping the name of the pornstars and the downloads links

```js
const video = await module-name.page(url, ['title','pornstars','download_urls']);
```

```json
{
	"title": "Title of the video",
	"pornstars": ["Sophie A","Rocco B"],
	"download_urls": {
		"720" : "https://p.com/link1",
		"480" : "https://p.com/link2",
		"360" : "https://p.com/link3"
	}
}
```

###### Scraping a search pornhub without options

```js
const video = await module-name.page("Aa");
```

```json
[{
	"link": "https://p.com/link1",
	"title": "Title of the video",
	"hd": true,
	"author": "Robert",
	"duration": 13000,
	"views": 1200,
	"premium": true,
	"rating": 80
},{
	"link": "https://p.com/link2",
	"title": "Title of the video",
	"hd": false,
	"author": "Ggegwg",
	"duration": 5120,
	"views": 120,
	"premium": false,
	"rating": 60
}]
```

### How to test

For testing, install the node project and run the test command.

```shell
node install
npm test
```

Also, you can use the command under for running the test without the linter

```shell
npm run test-no
```

### Note

- The version of ava is limited to 2.4.0 because the ESM is not yet compatible on ava 3. I am waiting to upgrade.
- If pornhub is blocked in your country, the API will obviously not work. You will need a proxy.
- Pornhub block the srapper from time to time, I have not found a solution yet.

## License

MIT - Copyright &copy; [JUSTAL Kevin](https://teamkd.online/)
