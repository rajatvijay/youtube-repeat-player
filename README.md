# Youtube Repeat Player Component
A react component to play youtube videos with a **feature to play them on repeat**

## Install
`npm install --save youtube-repeat-player`


## Usage

```javascript
import YRPlayer from 'youtube-repeat-player';

// JSX
<YRPlayer
  className="my-player-class"
  source="https://www.youtube.com/embed/YuXLN23ZGQo"
  youtubeApiLoaded={youtubeApiLoaded}
  autoPlayVideo={true}
/>

```
## Props

| Prop Name | Required (Default Value) | Data Type | Description |
| --------- | -------- | --------- | ----------- |
| `source`  | Yes      | String    | Embed URL of the youtube video of this format: `https://www.youtube.com/embed/YuXLN23ZGQo` |
| `repeat` | No(true)       | Boolean   | Signifies if the video should be played on repeat |
| `onVideoPlayed` | No | Function | Callback fired when the video is being played by the user | 
| `styles` | No | Object | All the inline styles, directly passed to the iframe element |
| `className` | No | String | Name of the class passed direclty to the iframe element | 
| `autoPlayVideo` | No(false) | Boolean | Signifies whether the video should be auto played |


## Note: Using this component will require loading the youtube iframe API manually. 
Currently this version does not load youtube iframe API. This can be done using the following code in the **constructor of the parent component of the YRPlayer component**

```javascript

// Keeping track whether the API has been loaded in the state of the parent
this.state = {'youtubeApiLoaded': false};

// Making the script tag
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
tag.async = 1;
document.head.appendChild(tag);

// To signal the YRPlayer component that the API has been loaded
window['onYouTubeIframeAPIReady'] = e => {
  this.setState({
    youtubeApiLoaded: true,
  });
};

// This setState will cause the YRPlayer component to re-render
```

## Contributing
In case of bug or feature request, feel free to file an issue.
