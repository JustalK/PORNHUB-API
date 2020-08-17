const constants = require('./consts');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

module.exports = {
    source_to_dom: (source) => {
        const dom = new JSDOM(source);
        return dom.window.document;
    },
    selectors_restriction: (keys, primary_selectors) => {
        return Object.fromEntries(Object.keys(primary_selectors).map(selector => {
            if(keys.includes(selector)) {
                return [selector, primary_selectors[selector]];
            }
            return;
        }).filter(x => x));
    },
    scraper_content_informations: (doc, keys, primary_selectors, element_attributs) => {
        const selectors = module.exports.selectors_restriction(keys, primary_selectors);
        return module.exports.scrap(doc, selectors, element_attributs);
    },
    convert_to_second: (time) => {
        const time_splitted = time.split(':');
        switch (time_splitted.length) {
            case 3:
                return (+time_splitted[0]) * 60 * 60 + (+time_splitted[1]) * 60 + (+time_splitted[2]);
            case 2:
                return (+time_splitted[0]) * 60 + (+time_splitted[1]);
            default:
                return time
        }
    },
    convert_KM_to_unit: (units) => {
        if(units.includes("K")) {
            return Number(units.replace("K",""))*1000;
        }
        if(units.includes("M")) {
            return Number(units.replace("M",""))*1000000;
        }
        return units;
    },
    scrap: (obj, keys, attributs) => {
        return Object.fromEntries(Object.keys(keys).map(key => {
            switch (attributs[key]) {
                case 'innerHTML':
                    if(!obj.querySelector(keys[key])) {
                        return [key,constants.NO_DATA];
                    }
                    return [key,obj.querySelector(keys[key]).innerHTML];
                case 'textContent':
                    if(!obj.querySelector(keys[key])) {
                        return [key,constants.NO_DATA];
                    }
                    return [key, obj.querySelector(keys[key]).textContent];
                case 'multi_textContent':
                    let elm = [...obj.querySelectorAll(keys[key])];
                    if (!elm || elm.length === 0) {
            			return [key, constants.NO_DATA];
            		}
                    return [key, elm.map(node => node.textContent)];
                case 'javascript':
                    return [key, JSON.parse(obj.querySelector(keys[key]).textContent)[constants.javascript[key]]];
                case null:
                    return obj.querySelector(keys[key]) ? [key, true] : [key, false];
                default:
                    return [key,obj.querySelector(keys[key]).getAttribute(attributs[key])];
            }
        }))
    },
    sanitizer_number: (value) => {
    	value = value.replace(/[()&A-Za-z,%]/g, '');
    	value = Number(value);
    	return value;
    },
    sanitizer_string: (value) => {
    	value = value.replace(/[\t\n]/g, '');
    	value = entities.decode(value);
    	return value;
    },
    sanitizer_array: (array) => {
    	return array.map(x => module.exports.sanitizer_string(x));
    },
    sanitizer_date: (value) => {
    	return new Date(value);
    },
    sanitizer: (datas) => {
    	const rsl = Object.keys(constants.type).map(x => {
    		if (!datas[x] && constants.type[x]!=constants.js_type.BOOLEAN) {
    			return;
    		}

    		switch (constants.type[x]) {
    			case constants.js_type.STRING:
    				return [x.toLowerCase(), module.exports.sanitizer_string(datas[x])];
    			case constants.js_type.ARRAY:
    				return [x.toLowerCase(), module.exports.sanitizer_array(datas[x])];
    			case constants.js_type.NUMBER:
    				return [x.toLowerCase(), module.exports.sanitizer_number(datas[x])];
                case constants.js_type.BOOLEAN:
                    return [x.toLowerCase(), !!datas[x]];
    			case constants.js_type.DATE:
    				return [x.toLowerCase(), module.exports.sanitizer_date(datas[x])];
    			case constants.js_type.NUMBER_KM:
    				return [x.toLowerCase(), module.exports.convert_KM_to_unit(datas[x])];
                case constants.js_type.URL_PORNHUB:
    				return [x.toLowerCase(), constants.links.BASE_URL+datas[x]];
    			default:
    				return [x.toLowerCase(), datas[x]];
    		}
    	}).filter(x => x);

    	return Object.fromEntries(rsl);
    }
}
