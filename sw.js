self.addEventListener('install', (event) => {
  console.log('V1 installing…');
  // 缓存山地车图片
  event.waitUntil(
    caches
      .open('static-v1')
      .then((cache) => cache.add('/imgs/mountain-bike.svg'))
  );
});

self.addEventListener('activate', (event) => {
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 如果请求同源且路径为 /imgs/bike.svg，则从缓存中返回山地车的图片
  if (url.origin == location.origin && url.pathname === '/imgs/bike.svg') {
    event.respondWith(caches.match('/imgs/mountain-bike.svg'));
  }
});
