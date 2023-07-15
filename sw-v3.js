const expectedCaches = ['static-v3'];

self.addEventListener('install', (event) => {
  console.log('V3 installing…');

  // 跳过等待
  skipWaiting();

  // 缓存摩托车图片到新的 static-v3 缓存
  event.waitUntil(
    caches.open('static-v3').then((cache) => cache.add('/imgs/motorcycle.svg'))
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
        console.log('V3 now ready to handle fetches!');
      })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 如果请求同源且路径为 /imgs/bike.svg，则从缓存中返回摩托车的图片
  if (url.origin == location.origin && url.pathname == '/imgs/bike.svg') {
    event.respondWith(caches.match('/imgs/motorcycle.svg'));
  }
});
