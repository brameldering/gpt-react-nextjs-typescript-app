## Pet Name Generator

Based on the example code for the Packt Training: Building a ChatGPT AI with JavaScript - An OpenAI Code-Along Guide By Clarian North.

An app that generates pet names using the OpenAI GPT API. The app is written using React Nextjs Axios and Typescript. Furthermore it uses MUI and emotion packages for the loading spinner.

I coded the application first before watching the training, except for the index.module.css file that i took from the example training code. Furthermore I made the following enhancements:

- Coded in TypeScript instead of JavaScript
- Used Axios to post to the OpenAI API
- Parsed the result string from the OpenAI API to result in an array of names that exclude the digits and dots (1. name1, 2. name2, .. => name1, name2, ..) and allowing for names consisting of multiple words as well as for words that include dots such as Mr. I used ChatGPT to derive an efficient regexp based algorithm for this parser.
- Added a loading spinner based on MUI and emotion.
- Extended the name generator so that it generates 5 names consisting of one word and 5 names consisting of multiple words.
- Made the error message to bounce to be clearer.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Create your own OpenAI API Key on: https://platform.openai.com/account/api-keys

Create a file in the root of this project with name ".env.local" and contents:
NEXT_PUBLIC_OPENAI_API_KEY=your-api-key

Note that the key env variable needs to start with NEXT*PUBLIC* for it to work in your frontend.

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Screenshots

Start Page
![Start Page](./public/start-page.png?raw=true "Start Page")

Generated Names Page
![Generated Names](./public/generated-names-page.png?raw=true "Generated Names")
