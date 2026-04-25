self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("treino-cache").then(cache => {
      return cache.addAll([
        "treino.html",
        "manifest.json",
        "icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Recebe mensagem do app e mostra notificação
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification("Quer ir ver o Dr Now?", {
      body: "VAI TREINAR!"