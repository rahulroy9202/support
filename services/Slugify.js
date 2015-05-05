var slug = require('slug');


//slugify the keys. keep the values intact.

module.exports  = function (obj) {
    
    if(typeof(obj)==='string') return slug(obj).toLowerCase();
    
    if(typeof(obj)==='object') {
        var nobj = {}
        
        for (var prop in obj) {
            if( obj.hasOwnProperty( prop ) ) {
                nobj[slug(prop).toLowerCase()] = obj[prop];
            } 
        }
        console.log(obj,nobj);
        return nobj;
    }
    
    console.log("slugify no match: ", typeof(obj), obj);
    return obj;
}