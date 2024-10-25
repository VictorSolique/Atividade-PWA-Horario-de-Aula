let cacheName = "my-horario";
let filesToCache = ["/", "/index.html", "/horario", "/permanencia", "/css/style.css", "/js/main.js"]

/* inicializando a service worker e fazendo o download do contepudo da aplicação */
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* disponibilizando o conteúdo quando estiver offline */
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});