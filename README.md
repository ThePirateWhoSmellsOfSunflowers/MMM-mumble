# MMM-mumble
A [MagicMirror²](https://github.com/MichMich/MagicMirror) Module to display users currently connected on the murmur server

![MumbleScreenshot](https://github.com/ThePirateWhoSmellsOfSunflowers/MMM-mumble/raw/master/screenshot.png)


## Dependencies
Because murmur's ICE API is such a pain to use and I'm really bad at Javascript, you need [this wrapper](https://github.com/ThePirateWhoSmellsOfSunflowers/murmur-ice/blob/master/rest_api_murmur.py).

## Usage
On the server side you need to configure the wrapper with the correct parameters and launch it (in a tmux, screen, deamon, whatever...).

Example of `config.js`
```
{
	module: 'MMM-muble',
	position: 'top_right',
	header: 'My Mumble Server',
	config: {
		address: 'http://10.0.0.1:1337/users'
	}
},

```


## Options

| Option                       | Description
| ---------------------------- | -----------
| `address`                    | Address of the API [wrapper](https://github.com/ThePirateWhoSmellsOfSunflowers/murmur-ice/blob/master/rest_api_murmur.py)
| `textSize`                   | Size of nicknames
| `iconSize`                   | Size of FontAwesome user icon
| `icon`                       | Fontawesome user icon 
| `iconColor`                  | Color of the icon whe the user is muted
| `updateInterval`             | The refresh interval of queries (in seconds).

## Thanks
This module is ~~mostly~~ entirely based on [MMM-teamspeak3](https://github.com/Thlb/MMM-teamspeak3) and [MMM-bitcoin](https://github.com/valmassoi/MMM-bitcoin)
