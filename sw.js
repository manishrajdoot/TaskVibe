self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('taskvibe-v1').then((cache) => {
            return cache.addAll([
                '/index.html',
                '/style.css',
                '/script.js',
                '/faq.html',
                '/faq.css',
                'https://cdn-icons-png.flaticon.com/512/3094/3094139.png',
                'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
                'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});