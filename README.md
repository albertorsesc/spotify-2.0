### Spotify 2.0 (side project)

![](https://github.com/albertorsesc/spotify-2.0/blob/master/public/spotify-demo.png)

## Installation

### Requirements

Spotify API keys.

* Visit: `https://developer.spotify.com/dashboard/applications`
* Login
* Create an App
* Retrieve: `Client ID` and `Client Secret` and assign to `.env` file

### Install

Clone Repo

```shell
git clone https://github.com/albertorsesc/spotify-2.0.git;
cd spotify-2.0;
cp .env.example .env;
```

Install NPM dependencies

```shell
npm install;
```

Run Project

```shell
npm run dev;
```


#### Features

* Retrieve Playlists
* Retrieve List of Songs per Playlist
* Player:
  * Play Song
  * Pause Song
  * Adjust Volume

### Spotify Quirks

In order to use the Spotify API you must have an ACTIVE_DEVICE.

* Open Web/Desktop/Mobile player
* Hit play then pause to "wake" the Active state.

>Note: Previous Song and Skip Song are implemented although not usable due to some issues with the Spotify API (IMO)

