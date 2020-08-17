# PORNHUB API

Scraper for PornHub. Unlike others scrapers, it's working in 2020 August with their new website. It allows you to get any informations out of any page and to get the download links.

`npm install module-name`

## Function available

###### Scraping a page pornhub

```js
async page(url, options)
```

| name | description | type |
| :--- | :---------- | :--- |
| url | url of the page | String |
| options | List of the options | Array or String if there is only one option|


| name of option | description | type |
| :--- | :---------- | :--- |
| title | Title | String |
| description | Description | String |
| views | Number total of views | Number |
| up_votes | Number of up vote | Number |
| down_votes | Number of down vote | Number |
| percent | Percent of up vote | Number |
| author | Name of the uploader | String |
| author_subscriber | Number of subscriber of the uploader | Number |
| pornstars | Names of the pornstars | Array |
| categories | List of the names of the categories | Array |
| tags | List of the names of the tags | Array |
| production | Type of production | String |
| duration | Duration in second | Number |
| number_of_comment | Total number of comments | Number |
| thumbnail | Url of the thumbnail | String |
| upload_date | Date of upload | Date |
| download_urls | List of download link by quality | Object |
| comments | List of comments with additionnals informations | Object |

######  Scraping a search page pornhub

```js
async search(value)
```

| name | description | type |
| :--- | :---------- | :--- |
| value | value search in pornhub | String |
| options | List of the options | Array or String if there is only one option|

| name of option | type | description |
| :--- | :---------- | :--- |
| page_X | String | X specify the number of page search to scrap |
| related_search | Array | The related search for the terms used |


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
