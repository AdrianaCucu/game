# Our Story

## Inspiration

Before even hearing about the challenges, we wanting to build a game that helped improve awareness of a major issue, like climate change.

We were inspired by the game Plague Inc, where you play as an infection trying to wipe out the planet. It's a dramatic and topical game that (inr our eyes) helps raise awareness on how infections spread. We figued Everything Burns would be a great way to do the same for climate awareness.

Also, none of us have built games before, so we figued this would be a great opportunity to learn how to do so.

## What it does

You start the game as an evil actor (Big Foil) trying to wipe out the world through climate change and profit mercilessly. The goal is to rise global temperature until it reaches and irreversible tipping point. 

Your opposition, climate activists and supporters, are trying to pass a Global Carbon Tax policy. If this policy passes, your empire will collapse and you lose the game.

## How we built it

We ultimately built the game using React, written in TypeScript. By switching to a browser-first technology, it became much easier to build a reactive user interface and work together (since we have some experience with the language).

Since the game is single-player, we've simply gor the front-end deployed onto Netlify.com

## Challenges we ran into

We originally tried to build the game using Rust and WebAssembly, but after 7 hours of pain and struggling, we had to move on to TypeScript. Additionally, we had trouble working with React hooks, as (despite our best efforts) we could not get them to work the way we expected them to and ended up just passing parameters.

## Accomplishments that we're proud of

We are proud of the procedurally-generated engine, the way that it supports a modular architecture allowing new "scenarios" (e.g: deforestation, bribing, etc...) to be added in without substantial changes to the main codebase.

## What we learned

During the first seven hours of the hackathon, we learned why developing a web-assembly game in Rust was a bad idea! In all seriousness, however, we have learned modern React tooling and how to design a modular architecture. Most importantly, we learned how to work together as a team!

## What's next for Everything Burns

We wanted to expand the scope of the scenarios faced by the players. This not only involved increasing the diversity of the scenarios available, but also increasing the complexity and statefulness of each of the scenarios. We had implemented but not finished a News/Twitter "alert" system to provide more feedback to the user on their destruction. We would hope to expand on this to further engage the user and make them understand the impact of their actions on the environment.

# Getting Started

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
