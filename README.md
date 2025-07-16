# Deskweb

## About

An online computer with a variety of different applications! Accessible at https://olliee2.github.io/deskweb/

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
