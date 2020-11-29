<template>
	<view>
		<view class="cu-timeline" v-for="(item,index) in diary" :key="index">
			<view class="cu-time">{{item.date}}</view>
			<view class="cu-item" :class="'text-' + item.color">
				<view class="content" :class="'bg-' + item.color">
					<view class="k_flex">
						<text>{{item.time}}</text>
					</view>
					<view class="margin-top">{{item.diary}}</view>
					<image v-if="item.photo" class="margin-top"  :src="item.photo" @click="viewImage(item.photo)"></image>
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
				diary:[],
				skip: 0
			}
		},
		onLoad() {
			this.getRecord()
		},
		onReachBottom(){
			this.getRecord()
		},
		onPullDownRefresh() {
			this.skip = 0
			this.getRecord(res => {
			 uni.stopPullDownRefresh();
			})
		},
		methods: {
			viewImage(e){
				uni.previewImage({
					urls: [e],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏']
					}
				});
			},
			//获取记录列表
			getRecord(callback){
				uni.showLoading({
				    title: '加载中'
				})
				if (!callback) {
				  callback = res => {}
				}
				var that = this;
				uni.request({
					url: this.apiUrl+'/diary',
					data: {
						limit:10,
						skip:this.skip,
						sort:{
						  _updateTime:-1
						}
					},
					success: res => {
						let skip = that.skip;
						let diary = that.diary;
						let data = res.data.data;
						for (let i = 0; i < data.length; i++) {
						  data[i].date = util.getDay(new Date(data[i]._updateTime))
						  data[i].time = util.getTime(new Date(data[i]._updateTime))
						}
						this.diary = skip == 0 ? data : diary.concat(data)
						this.skip = skip+10
					},
					fail: () => {},
					complete: () => {
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
