<template>
	<view class="index">
		<musichead title="Eureka-Music" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
				<!-- 骨架屏 -->
				<view v-if="isLoading">
					<view class="f-skeleton-box">
						<u-skeleton rows="3" avatar avatarSize="50" rowsWidth="80%" :animate="true" v-for="(item, key) in 4"
							:key="key" :loading="true" title>
						</u-skeleton>
					</view>
				</view>
				<view class="index-list" v-else>
					<view class="index-list-item" v-for="(item, index) in topList" :key="index" @tap="handToList"
						:data-id="item.id">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{ item.updateFrequency }}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(musicItem, index) in item.tracks" :key="index">
								{{ index + 1 }}.{{ musicItem.first }}.{{ musicItem.second }}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-tabbar :value="valueTaber" @change="change1" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home" @click="clickThing"></u-tabbar-item>
			<u-tabbar-item text="放映厅" icon="photo" @click="clickThing"></u-tabbar-item>
			<u-tabbar-item text="直播" icon="play-right" @click="clickThing"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="clickThing"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import musichead from "@/components/musichead/musichead.vue";
	// 导入组件
	// import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton"
	import {
		topList
	} from "@/common/api.js";
	export default {
		data() {
			return {
				isLoading: true,
				topList: [],
				valueTaber: 0
			};
		},
		// components:{mForSkeleton},
		onLoad() {
			// 延时2秒钟
			uni.$u.sleep(2000).then(() => {
				this.loading = false
			})

			topList().then((res) => {
				if (res.length) {
					setTimeout(() => {
						this.topList = res;
						this.isLoading = false;
					}, 1000);
				}
			});
		},
		methods: {
			change1(e) {
				console.log('change1', e)
			},

			// 底部点击事件
			clickThing(e) {
				this.valueTaber = e
			},

			handToList(event) {
				uni.navigateTo({
					url: "../list/list?listId=" + event.currentTarget.dataset.id,
				});
			},
			handleToSearch() {
				uni.navigateTo({
					url: "/pages/search/search",
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.index {}

	.index-search {
		display: flex;
		/* 上下居中 */
		align-items: center;
		height: 70rpx;
		margin: 30rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
	}

	.index-search text {
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}

	.index-search input {
		font-size: 28rpx;
		flex: 1;
	}

	.f-skeleton-box {
		margin-left: 40rpx;
	}

	.index-list {
		margin: 0 30rpx;
	}

	.index-list-item {
		display: flex;
		margin-bottom: 34rpx;
	}

	.index-list-img {
		width: 212rpx;
		height: 212rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
	}

	.index-list-img image {
		width: 100%;
		height: 100%;
	}

	.index-list-img text {
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		color: white;
		font-size: 20rpx;
	}

	.index-list-text {
		width: 60%;
		font-size: 24rpx;
		line-height: 66rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>