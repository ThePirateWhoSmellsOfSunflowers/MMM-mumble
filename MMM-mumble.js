// ThePirateWhoSmellsOfSunflowers - https://github.com/ThePirateWhoSmellsOfSunflowers

'use strict';

Module.register("MMM-mumble", 

    {
        users: {},
        error: {'error' : 'loading...'},
        defaults: 
        {
            address: 'http://my.murmur.rest.endpoint:5000/users',
            textSize: 'small',
            iconSize: 'xsmall',
            icon: 'fa-user-circle-o',
            iconColor: '#C40000',
            updateInterval: 60000
        },

        getStyles: function() 
        {
            "use strict";
            return ["font-awesome.css"];
        },

        start: function() 
        {
            this.getUsers();
            this.scheduleUpdate();
        },

        getDom: function() 
        {
            "use strict";
            var wrapper = document.createElement("div");

            if(this.error['error'])
            {
                wrapper.className = 'dimmed light small';
                wrapper.innerHTML = this.error['error'];
                return wrapper;
            }
            else if(this.users['users'].length == 0)
            {
                wrapper.className = 'dimmed light small';
                wrapper.innerHTML = 'No user connected';
                return wrapper;
            } 

            var table = document.createElement("table");
            wrapper.appendChild(table);

            for(var i = 0; i < this.users['users'].length; i++)
            {
                var user = this.users['users'][i];

                var row = document.createElement('tr');
                table.appendChild(row);
                var clientCell = document.createElement("td");
                clientCell.className = "bright " + this.config.textSize
                clientCell.innerHTML = user['name'];
                var iconCell = document.createElement("td");
                iconCell.className = this.config.iconSize;
                var icon = document.createElement("span");
                icon.className = "fa " + this.config.icon;

                if(user['selfMute'] == true)
                {
                    icon.style = "color:" + this.config.iconColor;
                }

                row.appendChild(iconCell);
                iconCell.appendChild(icon);
                row.appendChild(clientCell)
            }
            return wrapper;
        },

        scheduleUpdate: function(delay) 
        {
            var nextLoad = this.config.updateInterval;
            if (typeof delay !== "undefined" && delay >= 0) 
            {
                nextLoad = delay;
            }
            var self = this;
            setInterval(function() 
            {
                self.getUsers();
            }, nextLoad);
        },

        getUsers: function () 
        {
            var url = this.config.address;
            this.sendSocketNotification('GET_USERS', url);
        },

        socketNotificationReceived: function(notification, payload) 
        {
            var self = this;
            if (notification === 'USERS_RESULT') 
            {
                if(payload['error'])
                {
                    this.error = payload;
                    this.users = {};
                    this.updateDom();
                }
                else
                {
                    this.users = payload;
                    this.error = {};
                    this.updateDom();
                }
            }
        },

});

