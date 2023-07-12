import axios from 'axios';
var qs = require('qs');




export const postWhatsappMessageToFamilyGroup = (message) => {
    var data = qs.stringify({
        "token": "tav6fkslwem2w9ib",
        "to": "120363143854239034@g.us",
        "body": message
    });
    
    var config = {
      method: 'post',
      url: 'https://api.ultramsg.com/instance54020/messages/chat',
      headers: {  
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}

export const sendNewMemberNotification = (member) => {
    const message = `*${member.title} ${member.firstName} ${member.surname}* was added to the family database.`
    postWhatsappMessageToFamilyGroup(message);
};

