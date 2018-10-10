<template>
	<div v-show="list.length">
		<div class="list-control">
			<div class="list-control-filter">
				<span>品牌: </span>
				
				<span class="list-control-filter-item" v-bind:class="{on: item === filterBrand}"
								       v-for="item in brands"
								       v-on:click="handleFilterBrand(item)">{{ item }}</span>
			</div>
			<div class="list-control-filter">
				<span>颜色: </span>
				<span class="list-control-filter-item" v-bind:class="{on: item === filterColor}"
								       v-for="item in colors" 
								       v-on:click="handleFilterColor(item)">{{ item }}</span>
			</div>
				
			<div class="list-control-order">	
				<span>排序: </span>
				<span class="list-control-order-item" v-bind:class="{on: order ===''}" 
								      v-on:click="handleOrderDefault">默认</span>
				<span class="list-control-order-item" v-bind:class="{on: order ==='sales'}"
								      v-on:click="handleOrderSales">
				销量
				<template v-if="order === 'sales'">↓</template>
				</span>
				<span class="list-control-order-item" v-bind:class="{on: order.indexOf('cost') > -1}" 
								      v-on:click="handleOrderCost">
					<template v-if="order === 'cost-asc'">↑</template>
					<template v-if="order === 'cost-desc'">↓</template>
				价格
				</span>
			</div>
			
		</div>
		<Product v-for="item in list" v-bind:info="item" v-bind:key="item.id"></Product>
		<div class="product-not-found" v-show="!filterAndOrderedList.length">暂无相关商品</div>
	</div>
</template>

<script>
	import Product from '../components/product.vue';
	import $ from '../libs/util';
	import {Bus, SS} from '../libs/bus';	

	function getFilterArray(array){
		const res = [];
		const json= {};
		for(let i = 0; i < array.length; i++){
			const _self = array[i];
			if(!json[_self]){
				res.push(_self);
				json[_self] = 1;
			}
		}
		return res;
	}
		
	export default{
		components:{ Product },
		data(){
			return{
				order:'',
				filterBrand:'',
				filterColor:'',
				tlist:[]
			}
		},
	
		computed:{
			
			list(){
				//return this.plist;
				//console.log("aaaaa");
				//console.log(SS.plist);
				//const list = SS.plist;
				
				return this.tlist;
			},
			brands(){
				const brands = this.list.map(item => item.brand);
				//const brands = SS.plist.map(item => item.brand);
				return getFilterArray(brands);
			},
			colors(){
				const colors = this.list.map(item => item.color);
				//const colors = SS.plist.map(item => item.color);
				return getFilterArray(colors);
			},
			
			filterAndOrderedList(){
				let list = [...list];
				var rlist = list;
				
				if(this.order !== ''){
					if(this.order === 'sales'){
						rlist = list.sort((a, b) => b.sales - a.sales);
					}
						else if(this.order === 'cost-desc'){
						rlist = list.sort((a, b) => b.cost - a.cost);
					}else if(this.order === 'cost-asc'){
						rlist = list.sort((a, b) => a.cost - b.cost);
					}
				}

				return rlist;
			}
		},
		methods:{
			handleFilterBrand(brand){
				if(this.filterBrand === brand){
					this.filterBrand = '';
				}else{
					this.filterBrand = brand;
				}
			},
			handleFilterColor(color){
				if(this.filterColor === color){
					this.filterColor = '';
				}else{
					this.filterColor = color;
				}
			},
			handleOrderDefault(){
				this.order = '';
			},
			handleOrderSales(){
				this.order = 'sales';
			},
			handleOrderCost(){
				if(this.order === 'cost-desc'){
					this.order = 'cost-asc';
				}else{
					this.order = 'cost-desc';
				}
			}
		},
		created(){
			$.ajax.get('getproductlist').then(res => {
                         //       this.list = res.list;
                                console.log(res.list);
                                SS.SetPlist(res.list);
				
				this.tlist = res.list;

                        });
		},
		mounted(){
			/*
			$.ajax.get('getproductlist').then(res => {
				this.list = res.list;
				console.log("ajax");
				SS.SetPlist(res.list);
				
			});*/
			
		/*	
			Bus.$on('addCart', function(msg){
				SS.setData(msg);
				SS.logData();
			});*/
		}
	}
</script>
<style scoped>
    .list-control{
        background: #fff;
        border-radius: 6px;
        margin: 16px;
        padding: 16px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    .list-control-filter{
        margin-bottom: 16px;
    }
    .list-control-filter-item,
    .list-control-order-item {
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e9eaec;
        border-radius: 4px;
        margin-right: 6px;
        padding: 2px 6px;
    }
    .list-control-filter-item.on,
    .list-control-order-item.on{
        background: #f2352e;
        border: 1px solid #f2352e;
        color: #fff;
    }
    .product-not-found{
        text-align: center;
        padding: 32px;
    }
</style>
