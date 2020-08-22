# PORNHUB API

![Node version](https://img.shields.io/node/v/@justalk/pornhub-api.svg?style=flat-square)
[![Travis](https://img.shields.io/travis/com/justalk/pornhub-api.svg?style=flat-square)](https://www.npmjs.org/package/@justalk/pornhub-api)

Scraper for PornHub. Unlike others scrapers, it's working in 2020 August with their new website. It allows you to get any informations out of any page and to get the download links.

`npm install module-name`

## Function available

###### Scraping a page pornhub

```js
async page(url, options)
```

| name | type | description |
| :--- | :---------- | :--- |
| url | String | url of the page |
| options | Array or String if there is only one option | List of the options |


| name of option | return type | description |
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

######  Scraping a search page pornhub

```js
async search(value)
```

| name | type | description |
| :--- | :---------- | :--- |
| value | String | value search in pornhub |
| options | Array or String if there is only one option | List of the options |

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

- The version of ava is limited to 2.4.0 because the ESM is not yet compatible on ava 3.
- If pornhub is blocked in your country, the API will not work. Keep that in mind.

## License

MIT - Copyright &copy; [JUSTAL Kevin](https://teamkd.online/)
