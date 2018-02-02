const crypto = require("crypto");

function encrypt(text,key){
 /* 알고리즘과 암호화 key 값으로 셋팅된 클래스를 뱉는다 */
    let cipher = crypto.createCipher('aes-256-cbc',key); 

 /* 컨텐츠를 뱉고 */
    let encipheredContent = cipher.update(text,'utf8','hex'); 

 /* 최종 아웃풋을 hex 형태로 뱉게 한다*/
    encipheredContent += cipher.final('hex');

    return encipheredContent;
}

/*암호화나 복호화나 자세히 보면 비슷함*/
function decrypt(text,key){

    let decipher = crypto.createDecipher('aes-256-cbc',key);

    let decipheredPlaintext = decipher.update(text,'hex','utf8');

    decipheredPlaintext += decipher.final('utf8');

    return decipheredPlaintext;
}

/*이제 테스트 해봐야지*/
let key = "whdtjr321@gmail.com"
let text = "deviceKeytest : 123109sjfkv89sdkl3t32nclkxuvo23.mfsdlkj"

let hw = encrypt(text, key);

console.log("################### 인코딩 ##################");
console.log(hw);

console.log("################### 디코딩 ##################");
console.log( decrypt(hw,key) );
