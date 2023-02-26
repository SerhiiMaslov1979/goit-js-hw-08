import vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new vimeo(iframe);

try {
  const savedTime = JSON.parse(
    localStorage.getItem('videoplayer-current-time')
  );
  if (savedTime) {
    player.setCurrentTime(savedTime.seconds);
  }
  console.log(savedTime.seconds);
} catch {
  console.log('Sorry, you never watch this video');
}

player.on(
  'timeupdate',
  throttle(data => {
    try {
      localStorage.setItem(
        'videoplayer-current-time',
        `${JSON.stringify(data)}`
      );
    } catch (error) {
      console.log(error);
    }
  }, 1000)
);
