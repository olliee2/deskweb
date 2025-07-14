class Video {
  constructor(
    public name: string,
    public id: string,
  ) {}
}

const playlists = [[new Video('Resurrections', '1rwAvUvvQzQ')]];

const ytPlayer = document.getElementById('ytplayer') as HTMLIFrameElement;
if (!ytPlayer) throw new Error('Missing ytplayer');
const playlistList = document.getElementById('playlist-list');
if (!playlistList) throw new Error('Missing playlist-list');

for (const playlist of playlists) {
  const li = document.createElement('li');
  li.append(renderPlaylist(playlist));
  playlistList.append(li);
}

function renderPlaylist(playlist: Video[]) {
  const frag = document.createDocumentFragment();
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');
  for (const video of playlist) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'song';
    button.addEventListener('click', () => {});
  }
  return frag;
}
