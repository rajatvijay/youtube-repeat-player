import React from 'react';
import {css} from 'emotion';

const iframeAPILogger = {
  isLoggerOn: false,
  log: function(...items) {
    if (this.isLoggerOn) {
      console.log(...items);
    }
  },
};
iframeAPILogger.isLoggerOn = true;

const PlayerClass = css`
  display: block;
  width: 720px;
  height: 360px;
  margin: auto;
`;

class Player extends React.Component {
  shouldComponentUpdate(previousProps) {
    if (
      !this.player ||
      (this.props.source && previousProps.source !== this.props.source)
    ) {
      if (this.props.youtubeApiLoaded) {
        return true;
      } else {
        iframeAPILogger.log('youtube API not loaded'.toUpperCase());
        return false;
      }
    } else {
      iframeAPILogger.log(
        'not creating a new player instance'.toUpperCase(),
        this.player,
        this.props.source,
        previousProps.source
      );
    }
    return false;
  }

  tryAndPlayVideo(player) {
    try {
      // ! Point of failure
      player.playVideo();
    } catch (e) {
      iframeAPILogger.log(e);
    }
  }

  componentDidUpdate(previousProps) {
    iframeAPILogger.log('calling component did update'.toUpperCase());
    iframeAPILogger.log('creating player instance'.toUpperCase());

    this.player = new window['YT'].Player('player', {
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onReady: event => {
          iframeAPILogger.log('player ready for events'.toUpperCase());
          if (this.props.autoPlayVideo) {
            iframeAPILogger.log(
              'previous video was playing so playing this video also'.toUpperCase(),
              event.target
            );
            this.tryAndPlayVideo(event.target);
          }
        },
      },
    });
  }

  render() {
    return (
      <iframe
        className={PlayerClass}
        title="player"
        width="560"
        height="315"
        src={this.props.source + '?enablejsapi=1'}
        frameBorder="0"
        id="player"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    );
  }

  onPlayerStateChange(event) {
    if (event.data === window['YT'].PlayerState.ENDED) {
      iframeAPILogger.log('video ended re-playing'.toUpperCase(), event.target);
      this.tryAndPlayVideo(event.target);
    } else if (event.data === window['YT'].PlayerState.PLAYING) {
      iframeAPILogger.log('playing the current video'.toUpperCase());
      this.props.onVideoPlayed();
    }
  }
}

export default Player;
