var WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI({
  url: 'http://loginworks.net/portal', // Your store URL
  consumerKey: 'ck_fae57cecca0579fe5b09974f96867692282513b1', // Your consumer key
  consumerSecret: 'cs_47db857213272add611727ab048aee19499abb60', // Your consumer secret
  version: 'v2' // WooCommerce API version
});

 
WooCommerce.get('', function(err, data, res) {
    console.log(res);
  });
