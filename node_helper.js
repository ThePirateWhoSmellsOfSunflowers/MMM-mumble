// ThePirateWhoSmellsOfSunflowers - https://github.com/ThePirateWhoSmellsOfSunflowers

var NodeHelper = require('node_helper');        
var request = require('request');

module.exports = NodeHelper.create({
    start: function () 
    {
        console.log('mumble helper started...');
    },

    getUsers: function (url) 
    {
        var self = this;
        request({ url: url, method: 'GET' }, function (error, response, body) 
        {
            if (!error && response.statusCode == 200)
            {
                var result = JSON.parse(body);
                self.sendSocketNotification('USERS_RESULT', result);
            }
        });

    },

    socketNotificationReceived: function(notification, payload)
    {
        if (notification === 'GET_USERS')
        {
            this.getUsers(payload);
        }
    }
});

