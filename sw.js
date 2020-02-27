var staticCacheName = 'restaurant-cache';

let urlToCache = [
	'/',
	'/restaurant.html',
	'/css/styles.css',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/js/dbhelper.js',

];

//Install service worker
self.addEventListener('install', function (event){

//Add cache with urlToCache
		event.waitUntil(
			caches.open(staticCacheName).then(function (cache){
				console.log(cache);
				return cache.addAll(urlToCache);

			}).catch(error => {
				console.log(error);
			})
		);
});

//Activate service worker
self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					return cacheName.startsWith('restaurant-') &&
					cacheName != staticCacheName;
				}).map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

//Fetch the request
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
