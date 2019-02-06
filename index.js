/**
* hexo-oembed
* https://github.com/hinastory/hexo-oembed.git
* Copyright (c) 2019, hinastory
* Licensed under the MIT license.
* Syntax:
*   {% oembed permlink [maxwidth] [maxheight] %}
**/

'use strict';
const util = require('hexo-util');
const oembed = require('oembed');
const querystring = require('querystring');

hexo.extend.tag.register('oembed', function (args) {
  return getTag(args[0], args[1], args[2]);
}, { async: true });

function getTag(url, maxwidth, maxheight) {
  let options = {};
  if (hexo.config.oembed && hexo.config.embedlyKey) {
    oembed.EMBEDLY_KEY = hexo.config.embedlyKey;
  }

  if (maxwidth) options.maxwidth = maxwidth;
  if (maxheight) options.maxheight = maxheight;

  return fetchOembed(url, options)
    .then(result => makeEmbedTag(url, result))
    .catch(_ => fallbackOembed(url, options));
}

function errorOembedTag(url) {
  return util.htmlTag('div', {style: "color: red;"}, `failed getting oembed item.(url=${url})`);
}

function fallbackOembed(url, options) {
  return new Promise(function (resolve) {
    oembed.fetch(url, options, (error, result) => {
      if (error) {
        console.log(url, error);
        resolve(errorOembedTag(url));
      } else {
        resolve(makeEmbedTag(url, result));
      }
    });
  });
}

function fetchOembed(url, options) {
  const endpoints = hexo.config.oembed && hexo.config.oembed.endpoints;

  return new Promise(function (resolve, reject) {
    if (!endpoints) reject();

    let name, endpoint;
    let hostname = new URL(url).hostname;
    for (let [key, value] of Object.entries(endpoints)) {
      if (hostname.match(value.match)) {
        name = key;
        endpoint = new URL(value.url);
      }
    }

    if (name) {
      options.url = url;
      options.format = 'json';
      endpoint.search = '?' + querystring.stringify(options);

      oembed.fetchJSON(endpoint.toString(), (error, result) => {
        error ? reject() : resolve(result);
      });
    } else {
      reject();
    }
  });
}

function makeEmbedTag(url, result) {
  const mainClassName = (hexo.config.oembed && hexo.config.oembed.className) ? hexo.config.oembed.className : "oembed";
  const subClassName = result.provider_name ? result.provider_name.toLowerCase().replace(/[ .]/g, '-') : "default"

  switch (result.type) {
    case 'photo':
      const imgOpt = { src: result.url, alt: result.title ? result.title : null };
      const img = util.htmlTag('img', imgOpt, null);
      const link = util.htmlTag('a', { href: url, class: `${mainClassName}-inner` }, img);
      return util.htmlTag('div', { class: `${mainClassName}-outer ${mainClassName}-${subClassName}` }, link);
    case 'video':
    case 'rich':
      const inner = util.htmlTag('div', { class: `${mainClassName}-inner` }, result.html);
      return util.htmlTag('div', { class: `${mainClassName}-outer ${mainClassName}-${subClassName}` }, inner);
    default:
      return "unsupported oembed type";
  }
}