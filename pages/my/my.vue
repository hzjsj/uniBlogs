<template>
	<view>
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg">
				<view class="margin-top-lg">
				</view>
				<!-- #ifndef MP-WEIXIN || MP-QQ -->
				<image class="k_avatar" src="https://q1.qlogo.cn/g?b=qq&nk=70106377&s=100&t=" mode=""></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN || MP-QQ-->
					<open-data class="k_avatar" type="userAvatarUrl"></open-data>
				<!-- #endif -->
				<view class="text-xl margin-top-sm">
					<!-- #ifdef MP-WEIXIN || MP-QQ-->
					<open-data type="userNickName"></open-data>
					<!-- #endif -->
					
					<!-- #ifndef  MP-WEIXIN || MP-QQ -->
					 云记
					<!-- #endif -->
				</view>
				<image src="https://687a-hzpc-1258873690.tcb.qcloud.la/images/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>
			<view class="padding flex text-center text-grey bg-white shadow-warp">
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-orange">{{note}}</view>
					<view class="margin-top-sm">
						 文章</view>
				</view>
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-blue">{{diary}}</view>
					<view class="margin-top-sm">
						 记录</view>
				</view>
			</view>
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				<view class="cu-item arrow">
					<view class="content" @click="github">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">GitHub</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" @click="toRecord">
						<text class="cuIcon-edit text-blue"></text>
						<text class="text-grey">成长记录</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" @click="showQrcode">
						<text class="cuIcon-appreciatefill text-red"></text>
						<text class="text-grey">赞赏支持</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<button class="cu-btn content" open-type="feedback">
						<text class="cuIcon-writefill text-cyan"></text>
						<text class="text-grey">意见反馈</text>
					</button>
				</view>
						<view class="cu-item arrow">
					<button class="cu-btn content" open-type="share">
						<text class="cuIcon-share text-green"></text>
						<text class="text-grey">分享好友</text>
					</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				note:6,
				diary:8
			}
		},
		onLoad() {
			uni.request({
			    url: this.apiUrl+'/blogs',
			    success: (res) => {
			        this.note = res.data.total;
			    }
			});
			uni.request({
			    url: this.apiUrl+'/diary',
			    success: (res) => {
			        this.diary = res.data.total;
			    }
			});
		},
		onShareAppMessage(){
			
		},
		methods: {
			toRecord(){
				uni.navigateTo({
					url: '/pages/record/record',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			github(){
				uni.setClipboardData({
				    data: 'https://github.com/hzjsj',
				    success: function () {
				        console.log('success');
				    }
				});
			},
			showQrcode(){
				uni.previewImage({
					urls: ["https://687a-hzpc-1258873690.tcb.qcloud.la/images/zanshang.png"],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏']
					}
				});
			}
		}
	}
</script>

<style>
.UCenter-bg {
  background-image: url(https://687a-hzpc-1258873690.tcb.qcloud.la/images/background.jpeg?sign=5a0e819450847cade5ee508ea4dc121b&t=1585886582);
  background-size: cover;
  height: 550rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
  opacity: 0.8;
}

.UCenter-bg image {
  width: 200rpx;
  height: 200rpx;
}

.UCenter-bg .gif-wave{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  width: 750rpx;
  height: 300rpx;
}
.k_avatar{
  width:160rpx;
  height: 160rpx;
  border-radius: 50%;
  overflow: hidden;
}
</style>
