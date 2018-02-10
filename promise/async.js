

var allUserData = []

const clientData = {
  id : 094545,
  fullName : "Not Set",
  setUserName : function(firstName, lastName){
    this.fullName = firstName + " " + lastName;
  }
}

function getUserInput(firstName,lastName, callback, callbackObj) {
  callback.apply(callbackObj, [firstName, lastName]);
}


function logStuff (userData){
  if( typeof(userData) === "string"){
    console.log(userData)
  }
  else if( typeof(userData) === "object" ){
    for (let item in userData){
      console.log(item + ": " +userData[item]);
    }
  }
}


function getInput (options, callback){
  allUserData.push(options);

  if( typeof(callback) === "function"){
    callback(options)
  }

}


getInput({name:"Rich", speciality:"JavaScript"}, logStuff)
getUserInput("Jang", "Jongseok", clientData.setUserName, clientData);

console.log(clientData.fullName);

