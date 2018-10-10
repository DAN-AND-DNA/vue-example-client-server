import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js';
import './style.css';
import App from './app.vue';

Vue.use(VueRouter);
const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	window.document.title = to.meta.title;
	next();
});

router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

const store1 = [1];

new Vue({
	el: '#app',
	router,
	store: store1,
	render: h => {
		return h(App)
	}
});
