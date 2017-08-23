const db = require('../db');
const parseString = require('xml2js').parseString;
const CryptoJS = require('crypto-js');
const request = require('request');

const cred = require('../config.js') || undefined;

module.exports = (req, res) => {
  if (req.body.query.trim() === '') {
    return;
  }

  const access_key_id = process.env.access_key_id || cred.access_key_id;
  const secret_key = process.env.secret_key || cred.secret_key ;
  const endpoint = 'webservices.amazon.com';
  const uri = '/onca/xml';
  const associateTag = process.env.associate_tag || cred.associate_tag;
  const searchTerm = req.body.query;//req.query.product;
  const pairs = [];
  const product_list = [];
  const params = {
		'Service': 'AWSECommerceService',
		'Operation': 'ItemSearch',
		'AWSAccessKeyId': access_key_id,
		'AssociateTag': associateTag,
		'SearchIndex': 'All',
		'Keywords': searchTerm,
		'ResponseGroup': 'Images,ItemAttributes' //, OfferSummary
	};

  const defaultImage = 'https://s-media-cache-ak0.pinimg.com/736x/fb/f4/b1/fbf4b1c067171f09158d3b2c0ee40265--wolves-website-funny-wolf.jpg';

  let keys, canonical_query_string, string_to_sign, hash, signature, request_url,
  productListings;



  if (!params.hasOwnProperty('Timestamp')) {
    params['Timestamp'] = new Date().toISOString();
  }

  keys = Object.keys(params).sort();

  keys.forEach(key =>
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
  );

  canonical_query_string = pairs.join('&');

  string_to_sign = `GET\n${endpoint}\n${uri}\n${canonical_query_string}`;

  hash = CryptoJS.HmacSHA256(string_to_sign, secret_key);

  signature = hash.toString(CryptoJS.enc.Base64);

  request_url = `https://${endpoint}${uri}?${canonical_query_string}&Signature=` + encodeURIComponent(signature);

  request.get({url: request_url}, function(err, response, body) {
    if(err) { console.log('Error:', err); return; }

    parseString(body, function (err, result) {
        productListings = result.ItemSearchResponse.Items[0].Item;

        productListings.forEach((product) => {
          product_list.push({
            'id': product.ASIN[0], // ASIN
            'small_image': product.SmallImage ? product.SmallImage[0].URL[0] : defaultImage,
            'medium_image': product.MediumImage ? product.MediumImage[0].URL[0] : defaultImage,
            'large_image': product.LargeImage ? product.LargeImage[0].URL[0] : defaultImage,
            'url': product.DetailPageURL[0].substring(0, product.DetailPageURL[0].indexOf('?')),            'description': product.ItemAttributes[0].Title[0],
            'list_price': product.ItemAttributes[0].ListPrice ? product.ItemAttributes[0].ListPrice[0].FormattedPrice[0].slice(1) : 'N/A',
            'long_description': product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature.join('; ') : ''
          });
        });

        res.send(product_list)
    });

  });
};
