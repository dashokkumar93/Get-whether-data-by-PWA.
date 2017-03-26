var cacheName="whetherInfo";
var filesForCache=[
  "index.html",
  "scripts/script.js",
  "scripts/jquery.js",
  "styles/styles.css"
]
self.addEventListener("install",function(event)
{
event.waitUntil(caches.open(cacheName).then(function(cache)
{
  return cache.addAll(filesForCache)
}))
});
self.addEventListener("activate",function(event)
{
event.waitUntil(caches.keys().then(function(keylist)
{
  return Promise.all(keyList.map(function(key) {
      if (key !== cacheName && key !== dataCacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
}))
}))
});
self.addEventListener("fetch",function(event)
{
  event.respondWith(caches.match(event.request).then(function(result){
  return result|| fetch(event.request)}
));
})
