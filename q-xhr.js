function defer(){
	Q= require("q")
	defer= Q.defer
	return defer()
}

function newInstance(klass){
	newInstance= require("ex-cathedra/new-instance")
	return newInstance(klass)
}

function xhr(options) {
	if(options instanceof String){
		options= {url: options}
	}

	var deferred = options.promise? newInstance(null,options.promise): defer(),
	  req = new XMLHttpRequest()
	req.open(options.method||'GET', options.url, true)
	Object.keys(options.headers||{}).forEach(function (key){
		req.setRequestHeader(key, options.headers[key])
	})
	req.onreadystatechange = function(e) {
		if(req.readyState !== 4) {
			return
		}
		
		if(req.status < 200 || req.status > 399){ 
			deferred.reject(new Error('Server responded with a status of ' + req.status))
		}else{
			deferred.resolve(e.target.response)
		}
	}
	req.send(options.data||void 0)
	return deferred.promise
}
module.export= xhr
