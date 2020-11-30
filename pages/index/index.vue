<template>
	<view>
		<!-- 首页搜索 -->
		<view class="cu-bar bg-white search">
		  	<view class="search-form round">
		  		<text class="cuIcon-search"></text>
		  		<input type="text"  placeholder="输入搜索的关键词" confirm-type="search" @blur="search"></input>
		  	</view>
		  	<view class="action">
		  		<button class="cu-btn bg-blue round">搜索</button>
		  	</view>
		</view>
		
		<!-- 文章列表 -->
		<view class="cu-card dynamic no-card solid-top">
		 <view v-for="(item,index) in blogs" :key="index" @click="desc(item._id)" v-if="item.isShow" class="cu-item shadow solids-bottom">
		    <view class='text-content margin-top-sm'>{{item.title}}</view>
		    <view class="grid col-1 flex-sub padding-lr">
		      <view class="bg-img only-img" :style="[{ backgroundImage:'url(' + item.cover + ')' }]"></view>
		    </view>
		    <view class='text-gray text-sm text-right padding'>
		      <text class="cuIcon-timefill"></text>
		      {{item.createTime}}
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	import util from '@/utils/util.js';
	export default {
		data() {
			return {
				blogs:[],
				skip:0,
				title:""
			}
		},
		onLoad() {
			this.getBlogs()
		},
		onReachBottom(){
			this.getBlogs()
		},
		onPullDownRefresh() {
			this.skip = 0
			this.getBlogs(res => {
			 uni.stopPullDownRefresh();
			})
		},
		onShareAppMessage(){
			
		},
		methods: {
			search(e){
				let key = e.detail.value;
				let list = this.blogs;
				for (let i = 0; i < list.length; i++) {
					let b = list[i].title;
					
					if (b.indexOf(key) != -1) {
						list[i].isShow = true
					} else {
						list[i].isShow = false
					}
				}
				this.blogs = list
			},
			desc(e){
				uni.navigateTo({
				    url: '../desc/desc?id='+e
				});
			},
			// 获取文章列表
			getBlogs:function(callback){
				  uni.showLoading({
				      title: '加载中'
				  })
				  if (!callback) {
				    callback = res => {}
				  }
				  
				  var that = this;
				  uni.request({
				      url: this.apiUrl+'/blogs', //仅为示例，并非真实接口地址。
				      data: {
				         limit:10,
				         skip:this.skip,
				         fields:{
				           "desc":0
				         },
				         sort:{
				           _updateTime:-1
				         }
				      },
				      success: (res) => {
						  let skip = that.skip
						  let blogs = that.blogs;
						  let data = res.data.data
						  for (let i = 0; i < data.length; i++) {
							data[i].createTime = util.formatTime(new Date(data[i]._createTime))
							data[i].isShow  = true
						  }
						  
						  that.blogs= skip == 0 ? data : blogs.concat(data)
						  that.skip = skip+10
				      },
					  complete() {
					  	uni.hideLoading()
					  	callback();
					  }
				  });
			  
			}

		}
	}
</script>

<style>
</style>
