const fs = require('fs');

module.exports = { 

    addPlayerwp: (req, res) =>  {
        WooCommerce.get('', function(err, data, result) {
            console.log(res);
            return res.json({  message: JSON.parse(result), status :200  });
          });
    },


    custbyid: (req, res) =>  { 
        // var data = { 
        //     customer: {
        //       email: 'chetan.singh@loginworks.com'
        //     }
        //   };    
        //   WooCommerce.post('customers',data, function(err, data, result) {
        //     console.log(res); 
        //     if(err){
        //         return res.json({  message: err, status :0  });   
        //     }  
        //     return res.status(200).json({  message: JSON.parse(result), status :200  });
        //   });

        // WooCommerce.get('taxes', function(err, data, result) {
        //     return res.status(200).json({  message: JSON.parse(result), status :200  });
        //   });

        WooCommerce.get('products/categories', function(err, data, result) {    
            console.log("array == ",result);   
            console.log("len == ",result.length);
            return res.status(200).json({  message: JSON.parse(result), status :200  });
          });
    },

    
};
