import List from './views/list.vue';
import Product from './views/product.vue';
import Cart from './views/cart.vue';

export default[
	{
		path:'/list',
		meta:{
			title: '商品列表'
		},
		component: List
	},
	{
		path:'/product/:id',
		meta:{
			title: '商品详情'
		},
		component: Product
	},
	{
		path:'/cart',
		meta:{
			title:'购物车',
		},
		component: Cart
	},
	{
		path: '*',
		redirect:'/list'
	}
];
