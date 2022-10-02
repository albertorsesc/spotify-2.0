### Spotify 2.0 (side project)

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
git clone ;
cd spotify-2.0;
```

Install NPM dependencies

```shell
npm install;
```

Run Project

```shell
npm run dev;
```

### Spotify Quirks

In order to use the Spotify API you must have an ACTIVE_DEVICE.

* Open Web/Desktop/Mobile player
* Hit play then pause to "wake" the Active state.

>Note: Previous Song and Skip Song are implemented although not usable due to some issues with the Spotify API (IMO)

