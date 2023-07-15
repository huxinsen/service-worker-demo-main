const expectedCaches = ['static-v2'];

self.addEventListener('install', (event) => {
  console.log('V2 installing…');

  // 缓存公路车图片到新的 static-v2 缓存
  event.waitUntil(
    caches.open('static-v2').then((cache) => cache.add('/imgs/road-bike.svg'))
  );
});

self.addEventListener('activate', (event) => {
  // 清理旧缓存
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (!expectedCaches.includes(key)) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => {
        console.log('V2 now ready to handle fetches!');
      })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 如果请求同源且路径为 /imgs/bike.svg，则从缓存中返回公路车的图片
  if (url.origin == location.origin && url.pathname == '/imgs/bike.svg') {
    event.respondWith(caches.match('/imgs/road-bike.svg'));
  }
});
