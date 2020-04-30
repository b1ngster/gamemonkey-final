
  class UnitTest {
    constructor(){
    _results =   {
      total: 0,
      bad: 0
    };
  }
get results() {
      return this._results;
    };

 test(_func, args, expected) {
		this._results.total++;
		var result = _func(args)
		if (result !== expected) {
			this._results.bad++;
			console.warn("Unit Test Fail " + _func.name + "Expected " + expected + ", but was " + result);
      return false;
    }else{
      console.log("Unit Test  " + _func.name + "Expected " + expected + ", but was " + result);
      return true;
    }
  }

	
  
}
  
function parameters(func){
  var stringRepresentation = func.toString();
  var parameterString = stringRepresentation.match(/^function .*\((.*)\)/)[1];
  var parameters = parameterString.split(",");
 // console.log(parameters);
  //var parameters = parameterString.split(",");
  var setterString = "";
  for(var i = 0; i < parameters.length; i++){
    if(parameters[i] >= 0){
      var parameterName = parameters[i].split('/')[parameters[i].split('/').length-1].trim();
      setterString += "this." +  parameterName + " = " + parameterName + ";\n";
    }
  }
  var functionParts = stringRepresentation.match(/(^.*{)([\s\S]*)/);
  return(functionParts[1] + setterString + functionParts[2]);
}

function convertToText(obj) {
  //create an array that will later be joined into a string.
  var string = [];

  //is object
  //    Both arrays and objects seem to return "object"
  //    when typeof(obj) is applied to them. So instead
  //    I am checking to see if they have the property
  //    join, which normal objects don't have but
  //    arrays do.
  if (obj == undefined) {
    return String(obj);
  } else if (typeof(obj) == "object" && (obj.join == undefined)) {
      for (prop in obj) {
        if (obj.hasOwnProperty(prop))
          string.push(prop + ": " + convertToText(obj[prop]));
      };
  return "{" + string.join(",") + "}";

  //is array
  } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
      for(prop in obj) {
          string.push(convertToText(obj[prop]));
      }
  return "[" + string.join(",") + "]";

  //is function
  } else if (typeof(obj) == "function") {
      string.push(obj.toString())

  //all other values can be done with JSON.stringify
  } else {
      string.push(JSON.stringify(obj))
  }

  return string.join(",");
}
alert(convertToText({a:3, b:4, c: {a: 9}, d: null, f: function(e){e++;}, ar: [1,3,5]}))