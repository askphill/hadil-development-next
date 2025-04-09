# Next Simple

A Next.js starter to build a headless shopify store with JAMstack supported with all basic shopify functionality.

See live version [https://next-simple-navy.vercel.app/](https://next-simple-navy.vercel.app/)

## Features

- 🌎&nbsp;&nbsp;Multi-lingual website
- 🤏&nbsp;&nbsp;Drag & drop sections on Contentful
- ⚡&nbsp;&nbsp;Instant update with every published change on Contentful
- 👀&nbsp;&nbsp;Preview mode
- 📈&nbsp;&nbsp;Segment data-tracking (delayed) for optimal performance
- 💯&nbsp;&nbsp;Google performance of 100 out of the box
- 🎣&nbsp;&nbsp;Layout hooks
- 💅&nbsp;&nbsp;Eslint & Prettier
- ✨&nbsp;&nbsp;Easy styling with rem
- ⚙️&nbsp;&nbsp;SEO component
- 📸&nbsp;&nbsp;Image component with next/image
- 🔗&nbsp;&nbsp;Sitelink component with next/link
- 🔍&nbsp;&nbsp;SVG icon component
- 🗺️&nbsp;&nbsp;Sitemap
- 📐&nbsp;&nbsp;Development grid
- ✅&nbsp;&nbsp;CSS reset
- 📲&nbsp;&nbsp;UI context


## Doc

- [Setup](#setup)
  - [Contentful content model](#contentful-content-model)
  - [Phill-bot](#phill-bot)
- [Styling](#styling)
  - [Styling with rem](#styling-with-rem)
- [Page paths](#page-paths)
- [Page props](#page-props)
  - [Creating new pages and sections](#creating-new-pages-and-sections)
- [Serverless functions](#serverless-functions)
- [Preview mode](#preview-mode)
- [UI Context](#ui-context)

## Setup

First of all, install VSCode extensions ESLint (by Dirk Baeumer) and Prettier - Code Formatter (by Prettier)

1. `git clone` this repository and run `npm install`, `npm run dev`. You should be able to see a fully functioning webshop
2. Setup your contentful space and create API keys
   - Create an empty space
   - Content delivery API: Dashboard > Settings > API keys > Content delivery / preview tokens > Add API key
4. Update env variables in `.env.local`
5. Set your locales in `next.config.js` following your Contentful locale setup. The locales defined here and on Contentful _must_ match. Next will [automatically insert](https://nextjs.org/docs/advanced-features/i18n-routing) the locale (e.g. /en/) in front of your slug. When you add a locale on Contentful, we suggest making the fallback the default locale and allow fields to be empty
6. Update `robots.txt` in `/public`
7. Update favicon in `_document.jsx`

### Contentful content model

The code follows a strict Contentful content model, so we will export that from the demo space into your new project

1. Install Contentful CLI `npm install -g contentful-cli`
2. Export content model from our demo Contentful space
   - Open a terminal and `cd` into a directory where you will save the Contentful export config file
   - Run `contentful space export --space-id=eclke7ky6uic --environment-id=master --mt=CFPAT-Y5ZZdtOqvky7jYL43SHt2JJbifCH5M6-arfPeVbAPo0`
3. Import demo content model into your Contentful space
   - Make sure your Contentful space default locale is `en`: Dashboard > Settings > Locale
   - Create your Contentful management API key: Dashboard > Settings > API keys > Content management tokens > Generate personal token
   - Run `contentful space import --space-id=[space id] --mt=[management token] --content-file=[path to config file e.g. './config.json']`


## Styling

This setup uses the native CSS module and Sass [recommended by Next](https://nextjs.org/docs/basic-features/built-in-css-support).

Some important styling files:

- Global CSS in `_globals.scss`
- CSS variables in `_variables.scss`
- Mixins in `_mixins.scss`

Notice each component imports its own `component.module.scss`. Also, we use the npm package [classnames](https://www.npmjs.com/package/classnames) to dynamically update element styles based on changes in state or props, and also chain multiple CSS classes together

```
import classNames from "classnames"

import styles from "./component.module.scss"

const Component = () => {
    const [visible, setVisible] = useState(false)

    ...

    // Add class .visible to element when visible state is true
    return <button className={classNames(styles.checkout, [styles.visible]: visible)}>Checkout</button>
}
```

### Styling with rem

In `_globals.scss` you can specify your own desktop and mobile VW configuration. Since we constantly work with figma, the most common widths 375px and 1440px are set in this starter. After modifying the widths according to your project design configuration, each `rem` will equal to `10px` in your CSS.

Notice each component imports its own `component.module.scss`. Also, we use the npm package [classnames](https://www.npmjs.com/package/classnames) to dynamically update element styles based on changes in state or props, and also chain multiple CSS classes together


## Page paths

Next generates pages according to files found in the `/pages` folder. For example, the URL "domain/blog/" will be generated by the file `/pages/blog/index.jsx` and "domain/blog/1/" by `/pages/blog/1.jsx`. If you want to generate pages dynamically, there is a [special function](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) called `getStaticPaths`. In this case, the URL "domain/blog/99/" can be dynamically generated by `/pages/blog/[id].jsx`. See our examples in `/pages/index.jsx` and `/pages/[slug].jsx`.

## Page props

Next generate page props according to another [special function](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) called `getStaticProps` found in the `/pages` files. Again see our examples in `/pages/index.jsx` and `/pages/[slug].jsx`. Note that the awesome power to instantly update Contentful data on refresh is due to the `revalidate` option in `getStaticProps`.

### Creating new pages and sections

This starter contains 3 types of pages—`General`, `Collection`, and `Product`. In this setup the `General` page type contains our drag & drop sections. This is ideal for the generic pages like "home" and "about" where similar sections are shared. On Contentful please follow this structure for clarity: `Page - Name`, `Section - Name`, and `Component - Name`. Contentful will automatically ignore the "-" and make the query id camelCase, e.g. `Page - Name` would be `pageName` in your query.

Since we do not have apollo to see our Contentful graphiql, we recommend using this [graphiql app](https://www.electronjs.org/apps/graphiql) to test your queries when creating new pages or sections. Install it on your computer and boot it up. Your graphql endpoint should be `https://graphql.contentful.com/content/v1/spaces/[your Contentful space id]` (we are using the Contentful graphql API). Before writing your queries, edit the HTTP headers with the following two: `content-type=application/json` and `authorization=Bearer [your Contentful content delivery token]`. Start with this query:

```
{
  pageGeneralCollection(locale: "en", where: { slug: "/" }, limit: 1) {
    items {
      slug
    }
  }
}
```

You can open the Docs tab on the right, it can help you write your queries. Note that whenever you make a change on Contentful, you have to refresh the endpoint for the new data model to be available in the Docs tab. You can refresh the endpoint simply by deleting then adding back the last letter in your endpoint URL and hit the start button.

Regarding creating your own page templates, I suggest you follow our three starter examples. The starting point to read the code and queries would be the `getPage` function in `/lib/contentful/index.js`.

Regarding creating your own sections, I suggest you start reading in `parseSections.js`, also where this function is used. You will have to edit several files.

## Serverless functions

You can host your own website API endpoints in the `/pages/api` directory. Any file inside the directory is mapped to "domain/api/\*". For example the API endpoint "domain/api/hello/" will be generated by `/pages/api/hello.js`. See the [Next docs](https://nextjs.org/docs/api-routes/introduction) for the syntax. You can test locally.

## Preview mode

Since Next uses [incremental static generation](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration), every published change on Contentful will be instantly updated on the live website. Preview mode allows us (and the client) to preview changes on the website before putting new content live.

1. Modify the `CONTENTFUL_PREVIEW_SECRET` in `.env.local` to your liking. It will serve as a password for you and the client to enable preview mode
2. Visit the following api endpoint to enable preview mode: `/api/preview/?secret=[CONTENTFUL_PREVIEW_SECRET]`
3. You will be redirected to `/` and an indication at the bottom-left corner that says "Preview mode enabled" should appear

If you see the message at the bottom-left corner, you are in preview mode. Next has injected 2 cookies `__prerender_bypass` and `__next_preview_data` in your browser. They are checked in our `getStaticProps` functions to indicate a switch to fetch data from Contentful Preview API instead. As long as the cookies are present, all pages in the website will fetch data at _request time_ instead of build time. You can now change entries on Contentful; even when the entry status is _changed_ you can see it updating in the website in a few seconds after hitting refresh. Unless you publish the entry, the change will not reflect in the live website.

After you are done previewing, you may exit preview mode by visiting `/api/exit-preview/`. This api endpoint removes the cookies and redirects you to `/`.


### next-iron-session

Next recommends [next-iron-session](https://www.npmjs.com/package/next-iron-session) as a secure method to authenticate users while storing encrypted user data into the browser so there is no need to log in for every new session. `next-iron-session` works as a middleware wrapper to encrypt / decrypt user data into a cookie that persists throughout multiple browser sessions, and for our case _it can only be used either with getServerSideProps or within an api route_. See `/pages/account/index.jsx` for example, we have the `withSession` wrapper that enables the `req` object of `next-iron-session`, which you can use to `get` and `set` a cookie or `destroy` a session cookie. If you follow the logic within `getServerSideProps` in the account page, you can see how we store _some_ customer data into the cookie. The max size of a cookie is only around 4KB – so don't get too excited – we only store customer's login state, access token and its expiry date, first name, last name, and email; the rest should be fetched and passed as props at each request.

[Live example and github repo by Next](https://next-with-iron-session.vercel.app/)

### useSWR

The cookie business is done in combination with Next's [stale-while-revalidate (SWR)](https://swr.vercel.app/) technique. Essentially, SWR caches the result of your api call, and next time when you need the data, it will immediately present the cached (stale) data while revalidating in the background, then finally updating the data if necessary. The result is an illusion of an instant data fetch but in reality it is performing a client-side fetch request followed by an update.

Take a look at the `useCustomer` hook, it makes an SWR fetch request to our `customer` api endpoint, which does nothing but gets and returns the customer from the session cookie. With useSWR, the `useCustomer` hook caches this returned customer object, and along with it, also returns a `mutation` function. This mutation function is used in almost all of the other account hooks for one reason – whenever this mutation function is called, it forces a site-wide revalidation of the cached customer object that is _specifically returned by the `customer` endpoint_ and updates it when it is changed.

Take `useLoginCustomer` for example, this hook calls to the `login` endpoint which at the end sets the newly logged-in customer object into the cookie. _🚨super heavy loaded sentence incoming🚨_ Since `useLoginCustomer` calls to the `login` endpoint with the mutation function that is returned by the SWR of `useCustomer`, the (mutation function) call triggers a revalidation across the site on the _`customer`-returned customer object_, which is the returned result of getting the session cookie in `customer`. Since we are logging in a customer, a new customer object is set to session cookie; and since this call is wrapped around by the mutation function, a revalidation call will be made to `customer` to check if the returned customer object has changed; and since it has, an update is in order. The update of the customer object is what enables the auto-redirect feature within the `useCustomer` hook.

### Performance

If your project does not include account functionality, please remove the relevant code for a tiny boost in performance (by a few points in mobile). You should look at cleaning up `header.jsx` and `cart.jsx` of functions like `useCustomer` and `useMultipass`. These impact performance because they make calls to our customer-related endpoints and includes relevant packages on load.

## UI Context

We have a predefined way how to work with the UI context. To use the UI context just import:

```js
import { useUI } from 'contexts';
```

And from there you can import functions or states like:

```js
const { displayCart, closeCart } = useUI();
```

If you want to add a UI state and a function, go to `UIContext.jsx`.
.
