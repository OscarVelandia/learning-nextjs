---
title: 'Learning Next.js notes'
date: '2020-05-02'
---


# Important Data about next.js

This notes are the result of do [this tutorial](https://nextjs.org/learn/basics/create-nextjs-app) with some modifications like add SASS and TypeScript. 

## Routing
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
  * Is the best option if the data is updated frequently.
  * The pre-rendered can be completely by passed in favor of client-side javascript render in order to populate the data
* **Important**, In development mode (when you run npm run dev or yarn dev), every page is pre-rendered on each request — even for pages that use Static Generation.

### Static generation with external data (getStaticProps())
* The process is, next build -> fetch data -> generates the HTML
* **Important**, In development mode, getStaticProps runs on each request instead.

**Notes:**, the markdown file in the posts folder has a metadata section at the top containing title and date. This is called YAML Front Matter, which can be parsed using a library called [gray-matter](https://github.com/jonschlinkert/gray-matter).

