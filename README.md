# Important Data about next.js

## Routing
In Next.js the routing is made taking the **pages** folder structure as the source of truth, their functioning is pretty simple, if we need a file in the route:

* *domainName.com/posts/first-post* the file needs to be called `first-posts.js` and will be placed in *pages/posts*
* *domainName.com* the file needs to be called `index.js` and will be placed in used needs to be in the *pages* folder
* *domainName.com/about* the file needs to be called `about.js` and will be placed in *pages/about* 


### `<Link />` component
Allows to do *client side navigation* this means that the page transition happens using JavaScript, instead of the browser (with the <a> tag, the navigation is with the browser) when the navigation is in the browser the page is recharged. Apart of this, the *<Link>* component function almost like an *<a>* tag but taking in account the next.js Routing, as example, if we need to go to the route:

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

## Static generation (SG) and server-side rendering (SSR) 