import storageMethods from './local_storage.js';
import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const storageKeyCurrentTime = 'videoplayer-current-time';
let storageValueCurrentTime = storageMethods.load(storageKeyCurrentTime);

if (storageValueCurrentTime) {
  player
    .setCurrentTime(storageValueCurrentTime)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}

player.on(
  'timeupdate',
  throttle(function (currentTime) {
    storageMethods.save(storageKeyCurrentTime, currentTime.seconds);
  }, 1000)
);

player.on('ended', function () {
  storageMethods.remove(storageKeyCurrentTime);
});
