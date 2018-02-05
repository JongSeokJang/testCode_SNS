var preg_replace = function(pattern, replace, subject, limit){
  if(limit === undefined) {
    limit = -1;
  }
  var _flag		= pattern.substr(pattern.lastIndexOf(pattern[0])+1),
    _pattern	= pattern.substr(1, pattern.lastIndexOf(pattern[0])-1),
    reg	= RegExp(_pattern, _flag),
    rs	= null,
    res	= [],
    x	= 0,
    y	= 0,
    rtn	= subject;

  var tmp = [];
  if(limit === -1){
    do {
      tmp = reg.exec(subject);
      if(tmp !== null) {
        res.push(tmp);
      }
    } while(tmp !== null && _flag.indexOf('g') !== -1);
  }
  else {
    res.push(reg.exec(subject));
  }
  for(x = res.length -1; x > -1; x--){
    tmp = replace;
    for(y = res[x].length; y > -1; y--){
      tmp = tmp.replace('${' + y + '}', res[x][y])
        .replace('$' + y, res[x][y])
        .replace('\\' + y, res[x][y]);
    }
    rtn = rtn.replace(res[x][0], tmp);
  }
  return rtn;
};



function autoLink($contents){

  $pattern = '/(http|https|ftp|mms):\/\/[0-9a-z-]+(\.[_0-9a-z-]+)+(:[0-9]{2,4})?\/?';
  $pattern += '([\.~_0-9a-z-]+\/?)*';
  $pattern += '(\S+\.[_0-9a-z]+)?';
  $pattern += '(\?[_0-9a-z#%&=\-\+]+)*/i';

  $replacement = '<a href="\\0" target="_blank">\\0</a>';

  return preg_replace($pattern, $replacement, $contents, -1);
}


let content = "slkhgsdlkjfeiwjgklahlskjfoihtowhoiwelkrjlhttp://www.naver.comsdlkfjsd obfdsjfslkj"


let temp = autoLink(content)
console.log(temp)



