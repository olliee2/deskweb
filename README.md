# Deskweb
<img width="1867" height="1010" alt="grafik" src="https://github.com/user-attachments/assets/89831687-4207-48d6-9a11-455559c427e0" />

## About

An online computer with a variety of different applications! Accessible at https://deskweb.pages.dev/

## Usage & Hosting

### Local Hosting

1. Clone the repository:
   ```sh
   git clone https://github.com/olliee2/deskweb.git
   cd deskweb
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build and run the project:
   ```sh
   npm run start
   ```
   This will start a local server on which you can play in your browser.

### Local Development

Follow the same instructions as above to have the project running locally. Then, in a new terminal window run
`npm run watch` for live compilation of any TypeScript changes.

### Deploying to Cloudflare Pages

1. Push your repository to GitHub (or another git provider).
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) and create a new project from your repository.
3. Set the build command to `npm run build`.
4. Deploy!

The desktop will be available at your Cloudflare Pages URL.
