# Sprite-Deets-App
A tool to assist editing sprite metadata for importing into any game engine.

## Installation

Make sure you've installed Deno 2: https://docs.deno.com/runtime/getting_started/installation/. 
If you have used node, you'll find deno very familiar. 
If you have not used node, it might be worth going through a tutorial or two of either node (JS/TS) or deno (just TS) to familiarize yourself.

Unlike node, deno will pull in all its dependencies at build time so there's no additional installation steps.

## Usage

The Sprite-Deet-App is a web app, which will live in the `src` with `app.ts` as the entry point.
To use it though, you need a server so there is a lightweight server with hot reloading enabled in `main.ts`. 
Though deno has a typescript-enabled runtime, browsers do not, so the typescript code needs to be transpiled to jvascript to work in the browser. 
So the code the browser uses actually lives in `public/js/bundle.js`. 
Realistically you shouldn't have to touch that file, but I add logging in there some times when debugging since it'll go away the next time its transpiled. 

**This also means that if you make a change to the typescript and do not transpile, your change will not be picked up.**

The main command is `deno run dev`. 
This will start the deno server, and set up the watcher for changes to the typescript and/or html. 
If you add a file that needs watching, you'll want to update the watcher line in `main.ts` accordingly.
You can check in `deno.json` for what `deno run dev` does if you're curious. 
