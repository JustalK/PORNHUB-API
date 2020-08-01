<h1 align="center">
<br>
	<b>PORNHUB API</b>
	<br>
</h1>

<h3 align="center">PORNHUB API</h3>

### How to use

Install the module

```
npm install module-name
```

### Function available

1. Scraping a page pornhub

```
async page(url, options)
```

| name | description | type |
| :--- | :---------- | :--- |
| url | url of the page | String |
| options | List of the options | Array or String if there is only one option|

### Options available

| name | description | type |
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

### Examples

1. Scraping the title of a video

Call :

```
const video = await module-name.page(url, ['title']);
```

Output :

```
{
	"title": "Name of the video"
}
```

2. Scraping the title of a video and the description

Call :

```
const video = await module-name.page(url, ['title','description']);
```

Output :

```
{
	"title": "Name of the video",
	"description": "Description of the video"
}
```

3. Scraping the name of the pornstars and the downloads links

```
const video = await module-name.page(url, ['title','pornstars','download_urls']);
```

Output :

```
{
	"title": "Title of the video",
	"pornstars": ["Sophie A","Rocco B"],
	"download_urls": {
		"720" : "https://p.com/link1",
		"480" : "https://p.com/link2"
		"360" : "https://p.com/link3"
	}
}
```

### How to test

For testing, install the node project and run the test command.

```
node install
npm test
```

### Note

The version of ava is limited to 2.4.0 because the ESM is not yet compatible on ava 3.
If pornhub is blocked in your country, the API will not work. Keep that in mind.

## License

MIT - Copyright &copy; [JUSTAL Kevin](https://teamkd.online/)
