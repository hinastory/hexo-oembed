# hexo-oembed

[![NPM](https://nodei.co/npm/hexo-oembed.png)](https://nodei.co/npm/hexo-oembed/)
[![licence](https://img.shields.io/npm/l/hexo-oembed.svg?style=flat)](LICENSE)
[![hexo](https://img.shields.io/badge/Hexo-%3E%3D3.0-blue.svg?style=flat-square)](https://hexo.io)
[![Maintainability](https://api.codeclimate.com/v1/badges/ddfce94fa04983a9c7c7/maintainability)](https://codeclimate.com/github/hinastory/hexo-oembed/maintainability)

Embed [oEmbed](https://oembed.com/) item on your [Hexo](https://hexo.io/) article.

Features
--------

- Supports oEmbed Discovery
  - You can embed an oEmbed Discovery compatible site
  - You can check a permalink with [oEmbed Tester](http://oembed.frdnspnzr.de/)
  - YouTube, Vimeo, SlideShare, Speaker Deck, CodePen, TED, pixiv and more!
- Supports oEmded endpoint configuration
  - You can embed an oEmbed compatible site(not support oEmbed Discovery) if you configure endpoint settings
  - You can find an oEmbed endpoint at [oEmbed site](https://oembed.com/#section7)
  - Twitter, Instagram, Gyazo, Flickr and more!
- Automatic [Embed.ly](http://embed.ly/) fallback when an API key is provided

## Installation

`npm install hexo-oembed --save`

## Usage

`{% oembed permlink [maxwidth] [maxheight] %}`

## Demo

See [Demo page](https://hinastory.github.io/cats-cats-cats/hexo-oembed-demo/).

## Configuration

### className

You can provide a base CSS class name of this embeded HTML.
(Default: `oembed`)

### endpoints

You can provide endpoints of oEmbed provider.
(Default: None)

You can get oEmbed provider endpoint from below link.

https://oembed.com/#section7

You can define `match` and `url` of a oEmbed endpoint and  `url` of that endpoint will be used if a hostname of `permlink` contains the `match` value.

Fallback by [oEmbed Discovery](https://oembed.com/#section4) if a `permlink` page provide a oEmbed discovery link when a suitable endpoint is not found in the `endpoints`.

For example youtube is compatible with oEmbed Discovery, so you do not need to define endpoint.

### embedlyKey

Fallback Embed.ly if `embedlyKey` is provided.

The Embed.ly service can deliver oEmbed information even for resources
that don't provide oEmbed links. Go
[sign up](https://app.embed.ly/pricing/free) with them and configure your API key.

### Example

_config.yml:

```yaml
oembed:
  className: oembed
  embedlyKey:
  endpoints:
    instagram:
      match: instagram
      url: http://api.instagram.com/oembed/
    gyazo:
      match: gyazo
      url: https://api.gyazo.com/api/oembed/
    flickr:
      match: flickr
      url: http://www.flickr.com/services/oembed/
    twitter:
      match: twitter
      url: https://publish.twitter.com/oembed      
```

## Thanks

This plugin refers to the following three OSS resources:

- https://github.com/astro/node-oembed
- https://github.com/monsier-oui/hexo-tag-oembed
- https://github.com/minamo173/hexo-tag-link-preview

Thanks to them.

## License

MIT
