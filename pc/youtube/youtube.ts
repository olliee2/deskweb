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

const ytPlayerEl = document.getElementById('ytplayer');
if (!(ytPlayerEl instanceof HTMLIFrameElement))
  throw new Error('Missing or invalid ytplayer');
const ytPlayer = ytPlayerEl;
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

const searchBarEl = document.getElementById('search-bar');
if (!(searchBarEl instanceof HTMLInputElement))
  throw new Error('Missing or invalid search-bar');
const searchBar = searchBarEl;

searchBar.value = '';

const submitSearch = document.getElementById('submit-search');
if (!submitSearch) throw new Error('Missing submit-search');

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    updateVideoFromSearchBar();
    searchBar.value = '';
  }
});

submitSearch.addEventListener('click', () => {
  updateVideoFromSearchBar();
  searchBar.value = '';
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

function updateVideoFromURL(passedURL: string) {
  const url = new URL(passedURL);
  if (url.hostname === 'youtu.be') {
    updateVideoFromID(url.pathname);
  } else if (
    url.hostname === 'www.youtube.com' ||
    url.hostname === 'youtube.com'
  ) {
    const videoID = url.searchParams.get('v');
    if (videoID) {
      updateVideoFromID(videoID);
    } else {
      console.error('Invalid URL', passedURL);
    }
  } else {
    console.error('Invalid URL', passedURL);
  }
}

function updateVideoFromID(id: string) {
  ytPlayer.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&color=white&disablekb=1`;
}
