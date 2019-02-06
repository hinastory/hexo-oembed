# hexo-oembed

Embed [oEmbed](https://oembed.com/) item on your [Hexo](https://hexo.io/) article.

Features
--------

- Supports oEmded endpoint user defenition
- Automatic fallback oEmbed Discovery
- Automatic [Embed.ly](http://embed.ly/) fallback when an API key is provided


## Installation

`npm install hexo-oembed`

## Usage

`{% oembed permlink [maxwidth] [maxheight] %}`

## Options
### className
You can provide top-level base class name of this preview link HTML.
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
[sign up](https://app.embed.ly/pricing/free) with them and configure
your API key like:

```javascript
oembed.EMBEDLY_KEY = "...";
```

### Example

_config.yml:

```yaml
linkPreview:
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
```

## License
MIT
