var slug = require('slug');


module.exports  = function (obj) {
    
    if(typeof(obj)==='string') return slug(obj);
    
    if(typeof(obj)==='object'){
        var nobj = {}
        nobj = obj;
        for (var i in obj) {
            //if(var)
        }
        return nobj;
    }
    
    console.log("slugify no match: ", typeof(obj), obj);
    return obj;
}