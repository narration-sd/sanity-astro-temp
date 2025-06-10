# a quick Astro blog demo app that works...

This is made of portions quickly borrowed from available Sanity materials, so it's provisioned by pnpm, to keep compatibility there for the moment. 

- npm would be a better choice maybe we can attract them back to, since it avoids issues that can arise with pnpm particularly when new packages are released well before their peer dependencies are upgraded.
- if the issues show up, the app not functioning correctly, then simply remove ***all*** node_modules, including any in your app/s, and the pnpm-lock.yaml file, then run pnpm install. Don't forget afterwards to re-add pnpm-lock to your git so it'll always be included.

The blog itself is not the most elegant thing, just keeps the tutorial form it was borrowed from, for compatibility with that.

It's then a good illustration of things you can do, and can be easily tuned or replaced with what you'd prefer.

Most important, it lets you see that everything works, with all the latest packages to date, including Visual Editing in its original Astro-Sanity form.

# How to get it running

1. clone this repo, of course
1. run pnpm install from the top of the tree
1. then cd to apps/blog for the rest
1. create a fresh Sanity project for it, which should happen by running `sanity init` within this apps/blog folder
1. using the projectId, dataset, and Viewer Token you additionally create from the sanity.io project, add your own .env.development, based on the .env_example.
1. try it out with `pnpm run dev`, where it will come up on localhost:4321. 
1. Since your project will be empty, add at least a first Post, running the studio from localhost:4321/admin. Try it out on the website.
1. once you have a page, then you can bring it to Visual Editing in the Studio, from the 'used in' dropdown at the top of your Structure view of the Post. Choose the full page on the website.
2. Once it runs, try pnpm run build to assure you don't have any TypeScript etc. issues. Then you can deploy to Netlify, or change the adapter for someplace else. For this, good to fill in an .env.production as a reference for what you use there, even if it isn't autmatically read into the deployment.d

## Tips

- the only unusual thing should be the duplicated environmentals. As mentioned, those are needed so your Studio will be able to build if `sanity deploy` is used, as well as in the usual case of just including it with the app.

- again, the blog was taken from tutorial materials, and thus its libraries etc. use Sanity team patterns for all sorts of things. It would be good to keep those for your own apps, so that you'll easily be able to follow anticipated upgrades to the Astro picture as it gets moving again.

- More to come here, but the first is to use the .env_example to assure you satisfy the needs. This will update along with SSR-SSG switching as that gets added soon.