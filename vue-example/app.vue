<template>
	<div>
		<div class="header">
			<router-link to="/list" class="header-title">电商网站</router-link>
			<div class="header-menu">
				<router-link to="/cart" class="header-menu-cart">
					购物车
					<span v-if="cartList.length">{{ cartList.length }}</span>
				</router-link>
			</div>	
		</div>
		<router-view></router-view>
	</div>
	
</template>

<script>
	import {Bus, SS} from "./libs/bus";
	import $ from "./libs/util";
	export default{
		data(){
			return{
				clist: SS.clist
			}
		},
		computed:{
			cartList(){
				
				return this.clist;
			}
		},
		mounted(){
			Bus.$on('addCart', function(msg){
				console.log('receive add msg');
				SS.addCart(msg);
                        });
			Bus.$on('deleteCart', function(msg){
                                console.log('receive delete msg');
                                SS.deleteCart(msg);
                        });
		}
	}
</script>
