<template>
	<view class="body">
		<jyf-parser :html="html" selectable ref="article"></jyf-parser>
	</view>
</template>

<script>
	import marked from 'marked'
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
		   jyfParser
		 },
		data() {
			return {
				 html: ''
			}
		},
		onLoad(e){
			uni.showLoading({
			    title: '加载中'
			})
			uni.request({
			    url: this.apiUrl+'/blogs/'+e.id,
			    success: (res) => {
					this.html = marked(res.data.data.desc)
			    },
				complete: () => {
					uni.hideLoading()
				}
			});
		},
		onShareAppMessage(){
			
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: white;
	}
	.body{
		padding: 20rpx 3%;
		
		font-family: PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
		font-weight: 300;
		font-size: 32rpx;
		line-height: 1.8;
		word-wrap: break-word;
		word-break: normal;
		text-align: justify;
	}
</style>
