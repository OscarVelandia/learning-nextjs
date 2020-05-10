---
title: 'Learning Next.js notes'
date: '2020-05-10'
---

# Important Data about next.js

This notes are the result of having done [this tutorial](https://nextjs.org/learn/basics/create-nextjs-app) with some modifications like add SASS and TypeScript. 

## General routing
In Next.js the routing is made taking the **pages** folder structure as the source of truth, their functioning is pretty simple, if we need a file in the route:

* *domainName.com/posts/first-post* the file needs to be called `first-posts.js` and will be placed in *pages/posts*
* *domainName.com* the file needs to be called `index.js` and will be placed in used needs to be in the *pages* folder
* *domainName.com/about* the file needs to be called `about.js` and will be placed in *pages/about* 


### `<Link />` component
Allows to do *client side navigation* this means that the page transition happens using JavaScript, instead of the browser -with the `<a>` tag, the navigation is with the browser- when the navigation is in the browser the page is recharged. Apart of this, the `<Link>` component function almost like an `<a>` tag but taking in account the next.js Routing, as example, if we need to go to the route:

* *domainName.com/posts/first-post*, the `href` property of our Link component will be `/posts/first-post`
* *domainName.com*, the `href` property of our Link component will be `/`
* *domainName.com/about*, the `href` property of our Link component will be `/about`

Something interesting about this component, is that in a production build of Next.js, whenever Link components appear in the browser’s viewport, Next.js automatically prefetches the code for the linked page in the background. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

**Note**: If you need to link to an external page outside the Next.js app, just use an <a> tag without Link.

If you need to add attributes like, className, add it to the *<a>* tag, not to the Link tag. [Here is an example](https://github.com/zeit/next-learn-starter/blob/master/snippets/link-classname-example.js).

More information about the routing [here is the documentation](https://nextjs.org/docs/api-reference/next/link) and [this is an introduction](https://nextjs.org/docs/routing/introduction)


### Static files
* Are in the *public* folder and can be referenced with the same logic as the `href` property reference the pages file, for example, a static file in:

```html
<!-- public/my-image.jpg` will be referenced as -->
<img src="/my-image.jpg" />

<!-- public/logo/my-logo.jpg` will be referenced as -->
<img src="/logo/my-logo.jpg" />
```

* Public directory can't be renamed
* The files inside the *public directory* can't be named as any file in the *pages folder*yarn dev

### Metadata
* Is added with the `<Head>` component the documentation of it is [here](https://nextjs.org/docs/api-reference/next/head)
* Something interesting to note is that `<Layout>` and `<Index>` have different data in their `<Head>` tag, and this two metadata sources are fused into one.
```HTML
<meta name="viewport" content="width=device-width">
<meta charset="utf-8">
<link rel="icon" href="/favicon.ico">
<meta name="description" content="Learn how to build a personal website using Next.js">
<meta name="og:title" content="Next.js Sample Website">
<meta name="twitter:card" content="summary_large_image">
<title>Next.js Sample Website</title> <!--  This comes from the <Index> -->
<meta name="next-head-count" content="8">
```

### Sass config
* We can find the tutorial to use SCSS files in our project [here](https://nextjs.org/blog/next-9-3#built-in-sass-support-for-global-stylesheets), this project is already using Sass
* Since Next.js 9.3 Sass is natively supported, for this reason the [next-sass plugin](https://github.com/zeit/next-plugins/tree/master/packages/next-sass) isn't required and instead of node-sass, the dependency is sass.

  #### About the styles configuration
    * To set global styles, first is necessary create a *_app.tsx* file (*.js* if the project doesn't use Typescript) with the same config used in this project, in this file will be imported all the stylesheet needed globally. 
    * Next.js only accepts [SASS modules](https://nextjs.org/blog/next-9-3#built-in-sass-css-module-support-for-component-level-styles) or global stylesheets.
    * The module stylesheet can't be imported with destructuring, to use the classes we need to do something like:

    ```javascript
    import styles from "./layout.module.scss";

    <div className={`${styles.container}`}></div>
    ```
  
## Pre-rendering and Hydration
* [Here](https://nextjs.org/learn/basics/data-fetching/pre-rendering) the information is pretty clear 
* The web page life cycle in:
  * **Pre-rendering** is: Server -> HTML -> JS
  * **Without** Pre-rendering is: Server -> JS
* The JS step is called Hydration and it gives interactivity to the pre-rendered page

## Two ways of pre-rendering: Static generation (SG) and server-side rendering (SSR) 
* [Here](https://nextjs.org/learn/basics/data-fetching/two-forms) the information is pretty clear.
* The rendering method can be selected per page.
* **Static Generation** 
  * Pre-render the page at build time. 
  * Is the recommended way and should be used, unless SSR is the only option.
  * Is the most performing way because the page isn't generated every time.
* **Server Side Rendering** 
  * Pre-render the page in every request.
  * Is the best option if the data is updated *after the build time*.
  * The pre-rendered can be completely by passed in favor of client-side javascript render in order to populate the data
* **Important**, In development mode (when you run npm run dev or yarn dev), every page is pre-rendered on each request — even for pages that use Static Generation.

### Static generation with external data with `getStaticProps()`
* The build process is, `next build -> fetch data -> generates the HTML`, this generated HTML include all the data fetched in the build, *for this reason `getStaticProps()` isn't recommended if the data will change in every user page request, in this case, is better try Server-side Rendering with `getServerSideProps()` or skipping pre-rendering and use javascript render to fetch the data on client side, but this last is used when the SEO isn't important.* 
* `getStaticProps` runs only on the server-side. It will never be run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.
* **Important**, In development mode, getStaticProps runs on each request instead.
  
#### About the fallback property
* it's value is `true` the paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
* About the [fallback pages](https://nextjs.org/docs/basic-features/data-fetching#fallback-pages)
* [Here](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required) the information is pretty clear.

### Server-side rendering with `getStaticProps()`
* You should use `getServerSideProps()` only if you need to pre-render a page whose data must be fetched at request time. Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.
* `getServerSideProps()` can only be exported from a page, not a component.
* More data about this method can be found [here](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)

### Client-side rendering
* This is better in pages where the SEO isn't important
* To do this is recommended use the custom hook `useSWR` [here we can find more info](https://swr.now.sh/)
* The process is: 
  1. **next build**
  2. **Static generation**: of parts that doesn't require the external data
  3. **Fetch data in client**: and populate the remaining parts.

## Dynamic routes 

### `getStaticPaths()`
* It works with dynamic pages (the ones with `[]` in it's name)
* [Here](https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data) the description with the graphics are very clear.
* There are some comments in the `parsePostData.tsx` and `[id].tsx` files.
* In **Development** runs in every request, in **Production** runs in build time

**Notes:**, the markdown file in the posts folder has a metadata section at the top containing title and date. This is called YAML Front Matter, which can be parsed using a library called [gray-matter](https://github.com/jonschlinkert/gray-matter).


### `<Link>` with `as` prop
* About [Link](https://nextjs.org/docs/api-reference/next/link) 
* `as` prop is the path that will be rendered in the browser URL bar. Used for dynamic routes

### Fallback prop and catch all routes.
* The documentation [here](https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details) is pretty clear 


## API routes
* In next is possible generate API resources, it can be done inside the files inside the api folder located in the `pages/api`
* The endpoints have the same shape as the node.js middleware.
* There are some built-in [req](https://nextjs.org/docs/api-routes/api-middlewares) middlewars and [res](https://nextjs.org/docs/api-routes/response-helpers) helper methods.
* The API routes precedence is [this](https://nextjs.org/docs/api-routes/dynamic-api-routes#caveats)

### Dynamic API resources (routes in the documentation)
* Have the same logic as the pages router
* [Here](https://nextjs.org/docs/api-routes/dynamic-api-routes) the information is clear
* Do Not Fetch an API Route from getStaticProps() or getStaticPaths()

## Preview mode for headles CMS
* See the info [here](https://nextjs.org/docs/advanced-features/preview-mode)

## Upload the project to Vercel
* [This](https://nextjs.org/learn/basics/deploying-nextjs-app/github) are the steps to deploy the project, is very straightforward

## Adding TypeScript
* About the difference between [JSX.Element, ReactNode and ReactElement](https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement)
* About the [Next.js types](https://nextjs.org/docs/basic-features/typescript) 


>### General links
>* [About data fetching](https://nextjs.org/docs/basic-features/data-fetching)
>* [About environment variables](https://nextjs.org/docs/api-reference/next.config.js/environment-variables)
>* [About AMP](https://nextjs.org/docs/advanced-features/amp-support/introduction)