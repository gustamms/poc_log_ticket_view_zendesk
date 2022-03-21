let client = ZAFClient.init();
let dateTime = moment().format();
let logData = {}
let accountName = "";

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const CONSUMER_ID_FIELD = {
  "suportepicpayaw": 4958096630548
};

async function getLogData() {
  
  await client.invoke('hide');

  let { currentAccount: {subdomain} } = await client.get('currentAccount');
  
  let { ticket } = await client.get('ticket');
  
  let { currentUser } =  await client.get('currentUser');

  let customFieldName = `ticket.customField:custom_field_${CONSUMER_ID_FIELD[subdomain]}`
  
  let consumerId = await client.get(customFieldName)

  logData = {
    ticket,
    currentUser,
    consumerId: consumerId[customFieldName],
    dateTime
  }


  try{
    let response = await fetch(, {
      method: 'POST',
      body: JSON.stringify(logData),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    
    console.log(await response.json());

  }catch(e){
    console.log(e);
  }
}

getLogData();
