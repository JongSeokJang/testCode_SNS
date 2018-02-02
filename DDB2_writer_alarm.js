
n');
exports.handler = (event, context, <Plug>(incsearch-nohl-n)callback) => {

  console.log("=================")

  event.Records.forEach((record) => {

    let contentType = record.dynamodb.Keys.contentType.N
    let contentID   = record.dynamodb.Keys.contentID.S
    let userID       = record.dynamodb.NewImage.userID.S

    if(contentType == 1){
      // search follow list
      let params
    }

  });
  console.log("=================")
  callback(null, `Successfully processed ${event.Records.length} records.`);
};

