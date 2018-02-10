
function operation(arg){
  let temp = arg + "hihi"
  for( let ii = 0; ii < 1000000; ii++);
  console.log(temp)
  return temp;
}


function doOperation(arg){
  let result = operation(arg);
  return "1"+result;
}



console.log(doOperation("JongSeok"))
