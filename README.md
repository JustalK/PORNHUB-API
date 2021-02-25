![Alt text](/imgs/pornhub-api.jpg?raw=true "pornhub api")

![Last version npm](https://img.shields.io/npm/v/@justalk/pornhub-api.svg?style=flat-square)
![Last version](https://img.shields.io/github/v/tag/justalk/pornhub-api.svg?style=flat-square)
[![Node version](https://img.shields.io/node/v/@justalk/pornhub-api.svg?style=flat-square)](https://www.npmjs.com/package/@justalk/pornhub-api)
[![Travis](https://img.shields.io/travis/com/justalk/pornhub-api.svg?style=flat-square)](https://travis-ci.com/github/JustalK/PORNHUB-API)
[![Coverage Status](https://coveralls.io/repos/github/JustalK/PORNHUB-API/badge.svg?branch=master&style=flat-square)](https://coveralls.io/github/JustalK/PORNHUB-API?branch=master)
![Last version](https://img.shields.io/github/license/justalk/pornhub-api.svg?style=flat-square)
[![Maintainability Status](https://api.codeclimate.com/v1/badges/549f47de01e1ca98d830/maintainability)](https://codeclimate.com/github/JustalK/PORNHUB-API/maintainability)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)

![Star the project](https://img.shields.io/github/stars/justalk/pornhub-api?style=social)

Powerful updated scraper for PornHub. Unlike others scrapers, it's working in 2020 October with their new website. It allows you to get any informations out of any page.

### Installation

`npm install @justalk/pornhub-api`

or if you use yarn

`yarn add @justalk/pornhub-api --ignore-engines`

### Short Examples

Scraping the title, pornstars and the download links of a page

```js
const pornhub = require('@justalk/pornhub-api');
const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';
const video = await pornhub.page(url, ['title','pornstars','download_urls']);
```

### Features

- **Scraper:** Parse any page of pornhub : search page, model, video page...

- **Download links:** Get the download links in all the quality without registering

- **Search pagination:** This api can scrap multiple page at the same time

- **Search by different criteria:** Possibility to scrap different part of the site and to take advantage of the filter

- **Flexible:** The results are always return in a very specific javascrypt type making it easy to integrate to your need.

### Scraping of a single video page pornhub

```js
async page(url, options)
```

| name | type        | description                 | default   |
| :--- | :---------- | :-------------------------- | :-------- |
| url  | String      | [Mandatory] url of the page | -         |
| keys | Array       | List of the keys            | ['title'] |

<details>
  <summary><b>Lists of options available for a search</b> (click to show)</summary>

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
| thumbnail_url | String | Url of the thumbnail |
| upload_date | Date | Date of upload |
| download_urls |  Object | List of download link by quality |
| comments |  Object | List of comments with additionnals informations |
| related_videos |  Object | List of related video with additionnals informations |

</details>

### Scraping of a search page pornhub

```js
async search(value, keys, options)
```

| name    | type                                             | description                              |
| :------ | :----------------------------------------------- | :--------------------------------------- |
| value   | String                                           | value search in pornhub                  |
| keys    | Array or String if there is only one option      | List of the keys                         |
| options | Array                                            | [OPTIONNAL] List of the optional options |

<details>
  <summary><b>Lists of options available for a search</b> (click to show)</summary>

| name of options | return type | description                                    | options                  | default   |
| :-------------- | :---------- | :--------------------------------------------- | :----------------------- | :-------- |
| page            | Number      | Number of page to scraper                      | -                        | 1         |
| production      | String      | Type of production targeted                    | homemade, professional   | -         |
| min_duration    | Number      | Minimum number of minute of the video searched | 10, 20, 30               | -         |
| max_duration    | Number      | Maximum number of minute of the video searched | 10, 20, 30               | -         |
| search          | String      | Type of search targeted                        | video, pornstars, gifs   | video     |
| promo           | String      | Category of video                              | premium, modelhub        | -         |

</details>


<details>
  <summary><b>Lists of keys available for a search by video</b> (click to show)</summary>

| name of keys      | return type | description                    |
| :---------------- | :---------- | :----------------------------- |
| related_search    | String      | List of the related researches |
| related_pornstars | String      | List of the related pornstars  |

</details>

<details>
  <summary><b>Lists of keys available for a porn actor search</b> (click to show)</summary>

| name of keys | return type | description |
| :--- | :---------- | :--- |
| actor | String | Name of the actor |
| video_number | Number | Number of video of the actor |
| view_number | Number | Number of view of the actor |
| rank | Number | Rank of the actor |

</details>

<details>
  <summary><b>Lists of keys available for a gifs search</b> (click to show)</summary>

| name of keys | return type | description |
| :--- | :---------- | :--- |
| title | String | Title of the gif |
| thumbnail_url | String | Url of the thumbnail |
| link_mp4 | String | Url of the mp4 version |
| link_webm | String | Url of the webm version |

</details>

### Scraping of a special search page by category

There are two kind of possible way to search on pornhub. The first one is to search by term and the second one is to search by filter. This call is for the search by category and subcategory.

```js
async video(keys, options)
```

| name    | type                                             | description                              | default   |
| :------ | :----------------------------------------------- | :--------------------------------------- | :-------- |
| keys    | Array or String if there is only one option      | [OPTIONNAL] List of the keys             | null      |
| options | Array                                            | [OPTIONNAL] List of the optional options | null      |

<details>
  <summary><b>Lists of keys available for a special search page by category</b> (click to show)</summary>

| name of keys      | return type | description                    |
| :---------------- | :---------- | :----------------------------- |
| related_search    | String      | List of the related videos |
| related_pornstars | String      | List of the related pornstars  |
</details>

<details>
  <summary><b>Lists of options available for a search</b> (click to show)</summary>

| name of options | return type | description                                    | options                         | default   |
| :-------------- | :---------- | :--------------------------------------------- | :------------------------------ | :-------- |
| page            | Number      | Number of page to scraper                      | -                               | 1         |
| production      | String      | Type of production targeted                    | homemade, professional          | -         |
| min_duration    | Number      | Minimum number of minute of the video searched | 10, 20, 30                      | -         |
| max_duration    | Number      | Maximum number of minute of the video searched | 10, 20, 30                      | -         |
| search          | String      | Type of search targeted                        | video, pornstars, gifs          | video     |
| promo           | String      | Category of video                              | premium, modelhub               | -         |
| filter          | String      | Filter of the page                             | MOST_VIEWED, HOTTEST, TOP_RATED | -         |

</details>

### Model page pornhub

```js
async model(name, keys)
```

| name | type | description |
| :--- | :---------- | :--- |
| name | String | name of the model in pornhub |
| keys | Array or String if there is only one option | List of the keys |
| type | String  | There is two kind of model : pornstar or model |

<details>
  <summary><b>Lists of keys available for a model page</b> (click to show)</summary>

| name of keys | return type | description |
| :--- | :---------- | :--- |
| title | String | The name of the model |
| description | String | The description of the model |
| rank_model | String | The actual rank of the model |
| rank_week_model | String | The rank of the model for the week |
| rank_month_model | String | The rank of the model for this month |
| rank_last_month_model | String | The rank of the model for last month |
| rank_year_model | String | The rank of the model for this year |
| relationship_status | String | The status of the model (Work only if the model has filled up this field) |
| interested_in | String | The interest of the model (Work only if the model has filled up this field) |
| gender | String | The gender of the model (Work only if the model has filled up this field) |
| birthday | Date | The birthday of the model (Work only if the model has filled up this field) |
| age | Number | The age of the model (Work only if the model has filled up this field) |
| height | String | The height of the model (Work only if the model has filled up this field) |
| weight | String | The weight of the model (Work only if the model has filled up this field) |
| ethnicity | String | The ethnicity of the model (Work only if the model has filled up this field) |
| video_views | Number | The number of video view of the model (Work only if the model has filled up this field) |
| profile_views | Number | The number of profil view of the model (Work only if the model has filled up this field) |
| videos_watched | Number | The number of video watched by the model (Work only if the model has filled up this field) |
| joined | String | The period passed after the model joined Pornhub  |

</details>

### Examples

<details>
  <summary><b>Scraping the title of a video</b> (click to show)</summary>

```js
const pornhub = require('@justalk/pornhub-api');
const video = await pornhub.page(url, ['title']);
```


```json
{
	"title": "Name of the video"
}
```

</details>

<details>
  <summary><b>Scraping the title of a video and the description</b> (click to show)</summary>

```js
const pornhub = require('@justalk/pornhub-api');
const video = await pornhub.page(url, ['title','description']);
```

```json
{
	"title": "Name of the video",
	"description": "Description of the video"
}
```

</details>

<details>
  <summary><b>Scraping the name of the pornstars and the downloads links</b> (click to show)</summary>

```js
const pornhub = require('@justalk/pornhub-api');
const video = await pornhub.page(url, ['title','pornstars','download_urls']);
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

</details>

<details>
  <summary><b>Scraping a search pornhub without options</b> (click to show)</summary>

```js
const pornhub = require('@justalk/pornhub-api');
const video = await pornhub.search("Aa",["title","link","premium","hd"]);
```

```json
[{
	"link": "https://p.com/link1",
	"title": "Title of the video",
	"hd": true,
	"premium": true
},{
	"link": "https://p.com/link2",
	"title": "Title of the video",
	"hd": false,
	"premium": false
}]
```

</details>

<details>
  <summary><b>Scraping a search pornhub with options</b> (click to show)</summary>

```js
const pornhub = require('@justalk/pornhub-api');
const video = await pornhub.search("Aa",["actor","rank"],{production: 'homemade', search: 'pornstars'});
```

```json
[{
	"actor": "Herica Alue",
	"rank": 8005,
},{
	"actor": "Robert Laach",
	"rank": 60
},{
	"actor": "Aalix Lolo",
	"rank": 6500
}]
```

</details>

### How to test/contribute

<details>
  <summary><b>How to test the API ?</b> (click to show)</summary>

For testing, install the node project and run the test command.

```shell
node install
npm test
```

Also, you can use the command under for running the test without the linter

```shell
npm run test-no
```

The tests are not execute on pornhub directly, the calls to pornhub are all mock with `nock` to save html page of pornhub.
It has been done for having page that wont evolve through time. By example, if a comment is added on the real link, the tests will still be ok.

</details>

<details>
  <summary><b>How to contribute ?</b> (click to show)</summary>

Any contribution is welcomed !

If you find an issue or just want to add your stone to the castle :

1. Open an issue
2. Fork the repository
3. Create a new branch
4. Pull Request your change
5. Wait until I check your code
6. Merge and add your name on this page forever !

</details>

### Note

<details>
  <summary><b>Why does it not work in my country ?</b> (click to show)</summary>
If pornhub is blocked in your country, the API will obviously not work. You will need a proxy.
</details>
<details>
  <summary><b>Why does it not work at all sometimes ?</b> (click to show)</summary>
Pornuhub has a scraper protection, if you scrap the website violently (let say hundreds pages in 10 seconds), your ip will be flag as a bot for few minute. Please be gentle with pornhub's server !
</details>

## License

MIT - Copyright &copy; [JUSTAL Kevin](https://teamkd.online/)
