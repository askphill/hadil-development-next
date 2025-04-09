const delayLoad = true;
const delayLoadTime = 4000;
const writeKey =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY_PROD
    : process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY_DEV;
const host = 'https://cdn.segment.io';

// Segment's minified snippet (version 4.1.0)
const snippet = `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="${host}/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  ${delayLoad ? `` : `analytics.load('${writeKey}');`}
  }}();`;

const delayedLoader = `
      window.segmentSnippetLoaded = false;
      window.segmentSnippetLoading = false;
      window.segmentSnippetLoader = function (callback) {
        if (!window.segmentSnippetLoaded && !window.segmentSnippetLoading) {
          window.segmentSnippetLoading = true;
          function loader() {
            window.analytics.load('${writeKey}');
            window.segmentSnippetLoading = false;
            window.segmentSnippetLoaded = true;
            if(callback) {callback()}
          };
          setTimeout(
            function () {
              "requestIdleCallback" in window
                ? requestIdleCallback(function () {loader()})
                : loader();
            },
            ${delayLoadTime} || 1000
          );
        }
      }
      window.addEventListener('scroll',function () {if(!window.segmentSnippetLoaded && !window.segmentSnippetLoading)window.segmentSnippetLoader()}, { once: true });
      document.querySelector('body').addEventListener('click',function () {if(!window.segmentSnippetLoaded && !window.segmentSnippetLoading)window.segmentSnippetLoader()}, { once: true });
    `;

// if `delayLoad` option is true, use the delayed loader
const segmentSnippet = `
      ${delayLoad ? delayedLoader : ''}
      ${snippet}
    `;

export default segmentSnippet;
