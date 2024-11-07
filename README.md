# Books (Dashboard)

Books (Dashboard) uses Open Library Search API to search books.
Built with React, Next.js, NextAuth and TypeScript.

For the sake of simplicity, the app only uses GitHub from built-in OAuth Providers.

## GitHub Developer Settings

To set up GitHub Provider go to [GitHub Developer Settings](https://github.com/settings/developers), and click on New OAuth app button. Add an application name, and for dev environment insert `http://localhost:3000` to Homepage URL and `http://localhost:3000/api/auth/callback/github` to Authorization callback URL then click on Register application to generate Client ID and Client Secret.

Go back to the app, and create a .env.local file in the client folder. Store your Client ID and Client Secret credentials under the name of `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.

## To run the application

Install the dependencies, then go to the client folder and run the dev environment

```bash
cd client
```

```bash
yarn dev
```
