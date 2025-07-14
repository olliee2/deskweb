type Video = {
  name: string;
  id: string;
};

const playlist: Video[] = [
  { name: 'Prologue', id: 'Ctuo3ws3EKs' },
  { name: 'First Steps', id: 'N8OHSXvneOE' },
  { name: 'Resurrections', id: '1rwAvUvvQzQ' },
  { name: 'Awake', id: 'BFVyvGmwlmk' },
  { name: 'Postcard from Celeste Mountain', id: 'V8qOjmWIPKs' },
  { name: 'Checking In', id: 'fOzvP1I5tLU' },
  { name: 'Spirit of Hospitality', id: 'NRpcwd9MSSE' },
  { name: 'Scattered and Lost', id: '0etenwnI1wo' },
  { name: 'Golden', id: 'mr-SWzqNpM0' },
  { name: 'Anxiety', id: 'FMuQ11tVJnk' },
  { name: 'Quiet and Falling', id: 'FjG0ivBT4lQ' },
  { name: 'In the Mirror', id: 'bXfHKEaDg4s' },
  { name: 'Madeline and Theo', id: '__oZ-LYZ8pU' },
  { name: 'Starjump', id: 'dTIeaqNXseY' },
  { name: 'Reflection', id: 'QfhUSYq7jEs' },
  { name: 'Confronting Myself', id: 'b_oEDGONSc4' },
  { name: 'Little Goth', id: 'oHdSK43cIf8' },
  { name: 'Reach for the Summit', id: 'iDVM9KED46Q' },
  { name: 'Exhale', id: 'q7QMTo-P6H0' },
  { name: 'Heart of the Mountain', id: 'DNOuancg5RY' },
  { name: 'My Dearest Friends', id: 'VHN63n9y1vg' },
];

const ytPlayer = document.getElementById('ytplayer') as HTMLIFrameElement;
if (!ytPlayer) throw new Error('Missing ytplayer');
const playlistList = document.getElementById('playlist-container');
if (!playlistList) throw new Error('Missing playlist-list');

const ul = document.createElement('ul');
for (const video of playlist) {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.className = 'song';
  button.textContent = video.name;
  button.addEventListener('click', () => {
    updateVideoFromID(video.id);
  });
  li.append(button);
  ul.append(li);
}
playlistList.replaceChildren(ul);

const searchBar = document.getElementById('search-bar') as HTMLInputElement;
if (!searchBar) throw new Error('Missing search-bar');
const submitSearch = document.getElementById('submit-search');
if (!submitSearch) throw new Error('Missing submit-search');

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    updateVideoFromSearchBar();
  }
});

submitSearch.addEventListener('click', () => {
  console.log('clicked!');
  updateVideoFromSearchBar();
});

function updateVideoFromSearchBar() {
  const term = searchBar.value.trim();
  if (URL.canParse(term)) {
    updateVideoFromURL(term);
  } else if (
    URL.canParse('https://' + term) &&
    term.includes('.') &&
    term.includes('/')
  ) {
    updateVideoFromURL('https://' + term);
  } else {
    updateVideoFromID(term);
  }
}

function updateVideoFromURL(url: string) {
  console.log(url);
}

function updateVideoFromID(id: string) {
  console.log(id);
  ytPlayer.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&color=white&disablekb=1`;
}
