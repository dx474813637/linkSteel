<template>
	<view class="w " :style="{
		backgroundColor: themeConfig.pan.pageBg,
		color: themeConfig.pan.pageText
	}">
		
		<u-sticky>
			<navBar
				:title="`${onlineControl.title? onlineControl.title :(pan == 's'? '卖盘详情' : '买盘详情')}`" 
				:backBtn="backBtn"
				@backEvent="handleBackEvent"
			></navBar>
		</u-sticky>
		<u-notice-bar bgColor="#ff2a2a" color="#fff" text="已下架" v-if="list.state != '1'"></u-notice-bar>
		<u-notice-bar bgColor="#ff6a00" color="#fff" text="已过期" v-else-if="list.hasOwnProperty('expressed') && list.expressed <= 0 && list.trade_mode != '1' && list.trade_mode != '3'"></u-notice-bar>
		<view class="pan-header u-p-10" :style="{
			backgroundColor: themeConfig.pan.headerBg,
		}">
			<view class="u-p-10 u-p-l-30 u-p-r-30 u-flex u-flex-items-start u-flex-between">
				<view class="u-flex u-flex-items-center u-flex-wrap u-flex-1">
					<text class="u-font-36 u-p-r-20" :style="{
						color: themeConfig.pan.headerText
					}">{{list.name}}</text>
					<text class="tag u-font-24 u-m-r-10" :style="{
						borderColor: themeConfig.pan.tagcolor,
						color: themeConfig.pan.lightcolor,
					}">{{pan == 's'?'供 应': '求购'}}</text>
					<text class="tag u-font-24 " :style="{
						borderColor: themeConfig.pan.tagcolor,
						color: themeConfig.pan.lightcolor,
					}"  >
						<template v-if="list.trade_mode == '2'">
							一口价
						</template>
						<template v-else-if="list.trade_mode == '1'">
							竞价
						</template>
						<template v-else-if="list.trade_mode == '3'">
							基差
						</template>
						<template v-else-if="list.trade_mode == '5'">
							询价
						</template>
						<template v-else>
							议价
						</template>
					</text>
					<view >
						<u-icon
							name="photo" 
							v-if="list.list_pics && list.list_pics.length > 0" 
							@click="imgWrapShow = true"
							:color="themeConfig.pan.imgBtn"
							size="20"
						></u-icon>
					</view>	
					
				</view>
				<!-- <view class="u-p-l-20 u-flex u-flex-items-center u-font-28 u-p-t-6" :style="{
						color: themeConfig.warn
					}"
					@click="handleTimesBtn('broker43', `投诉${pan=='s'? '卖盘': '买盘'}：${list.name}，https://www.rawmex.cn/${pan=='s'? 'sell': 'buy'}-${id}.html`)"
				>
					<u-icon 
						:name="typeActive == 'dark'? 'bell' : 'bell-fill' "
						:color="themeConfig.warn"
						></u-icon>
					<text class="u-p-l-5">举报</text>
				</view> -->
			</view>
			
			<view class="u-p-10 u-p-l-30 u-p-r-30 u-flex u-flex-items-center u-flex-between u-flex-wrap">
				<view class="price u-flex u-flex-items-center">
					<template v-if="list.trade_mode == '3'">
						<text class="u-font-40"
							:style="{
								color: themeConfig.pan.lightcolor,
								fontSize: '26px'
							}" 
						>
							{{list.base_contract}}合约
							<template v-if="list.price >= 0">+</template>
							{{list.price}} 元/{{list.unit}}
						</text> 
					</template>
					<template v-else-if="list.trade_mode == '5'">
						<text class="u-font-40"
							:style="{
								color: themeConfig.pan.lightcolor,
								fontSize: '26px'
							}" 
						>询价</text>
					</template>
					<template v-else>
						<text class="u-font-40"
							:style="{
								color: themeConfig.pan.lightcolor,
								fontSize: '26px'
							}"
							v-if="list.curr_unit_price>0"
						>{{list.curr_unit_price}}</text> 
						<text class="u-font-40"
							:style="{
								color: themeConfig.pan.lightcolor,
								fontSize: '26px'
							}"
							v-else
						>{{list.price | price2str(list.dprice)}}</text>
						<text class="u-p-l-10 "
						 v-if="list.price>0"
						 :style="{
							color: themeConfig.pan.headerSubText
						}">元/{{list.unit}}</text>
					</template>
					
				</view>
				<view class="u-flex">
					<text class="tag u-font-30 u-p-5 u-p-l-20 u-p-r-20" :style="{
						borderColor: themeConfig.pan.tagcolor,
						color: themeConfig.pan.headerSubText
					}">{{list.amount}}{{list.unit}}</text>
					<text class="tag u-font-30 u-m-l-20 u-p-5 u-p-l-20 u-p-r-20" :style="{
						borderColor: themeConfig.pan.tagcolor,
						color: themeConfig.pan.headerSubText
					}">{{list.trade_type | tradeType}}</text>
				</view>
			</view>
			<view class="u-p-15 u-p-l-30 u-p-r-30">
				<u-line :color="themeConfig.pan.headerSubText" length="100%" dashed></u-line>
				<view class="u-p-t-30 u-p-b-80 u-font-28" :style="{
					color: themeConfig.pan.headerSubText
				}">
					{{pan == 's'? list.spec1: list.spec}}
				</view>
			</view>
			
		</view>
		
		<view class="pan-main">
			<view class="main-box u-font-30 u-m-b-30"
				:style="{
					backgroundColor: themeConfig.pan.boxBgTop
				}"
				v-if="list.trade_mode == '1' &&  list.Bid_role"
			>
				<view class="main-box-title u-flex u-flex-items-center u-flex-between u-p-20 u-p-l-30 u-p-r-30"
					
				>
					<view class="u-flex u-flex-items-center">
						<i class="custom-icon-paimai custom-icon u-m-r-10" :style="{color: themeConfig.pan.lightcolor}"></i>
						<text :style="{color: themeConfig.pan.baseText}">竞拍信息</text>
						<view class="u-m-l-16">
							<u-icon name="reload" @click="$u.throttle(refreshData, 500)" size="20px" :color="themeConfig.pan.lightcolor"></u-icon>
						</view>
						
					</view>
					<view class="u-flex u-flex-items-center" @click="jpListShow = true" >
						<text :style="{color: themeConfig.pan.baseText}">竞拍记录</text>
						<view style="position: relative;">
							<i class="custom-icon-fenlei custom-icon u-m-l-10" :style="{color: themeConfig.pan.lightcolor}"></i>
							<u-badge  
								bgColor="#fb4242" 
								:value="list2.total"
								absolute
								:offset="[-5, -8]"
							></u-badge>
						</view>
						
					</view>
				</view>
				<view class="u-p-10 u-p-l-20 u-p-r-20">
					<view class="jp-bar u-p-20 u-flex u-flex-items-center u-flex-between"
						:style="{
							backgroundColor: themeConfig.pan.headerBg,
							color: themeConfig.pan.headerText
						}" 
					>
						<view class="item u-flex u-flex-column ">
							<view style="opacity: .8;" @click="jpSubmitShow = true">{{countDownStr}}</view>
							<view class="u-m-t-10" v-if="list.Bid_role && list.Bid_role.is_bid_end != 1">
								<u-count-down
									ref="countDown"
									:time="timeLeft"
									format="DD:HH:mm:ss" 
									autoStart
									millisecond
									@change="onJpTimeChange"
									@finish="onJpTimeFinish"
								>
									<view class="time" :style="{
										color: list.Bid_role && list.Bid_role.is_bid_begin == 1? themeConfig.pan.countDownWarn : themeConfig.pan.countDownError 
									}">
										<text class="time__item u-m-r-10" v-if="timeData.days>0">{{ timeData.days }}天</text>
										<text class="time__item u-m-r-10">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}时</text>
										<text class="time__item u-m-r-10">{{ timeData.minutes }}分</text>
										<text class="time__item u-m-r-10">{{ timeData.seconds }}秒</text>
									</view>
								</u-count-down>
							</view>
							
						</view>
						<view class="item u-flex u-flex-items-center"> 
							<view class="u-m-l-10" v-if="list.Bid_role.is_bid_end != 1"> 
								<u-button type="error" :customStyle="{
									backgroundColor: typeActive == 'white'? '#00adff' : '#fb4242', 
									borderColor: typeActive == 'white'? '#00adff' : '#fb4242'
									}" throttleTime="800" :disabled="jpBtnDisabled" @click="jpBtnEvent">{{jpBtnName}}</u-button>
							</view>
						</view>
					</view>
				</view>
				<view  :class="{
					'u-p-15': typeActive == 'white'
				}" >
					<view class="main-box-content "
						:class="{
							'u-p-15': typeActive == 'white',
							'u-p-30': typeActive == 'dark'
						}"
						:style="{
							backgroundColor: themeConfig.pan.boxBg,
							borderRadius: typeActive == 'white'?'20rpx': '0',
						}"
					>
						<view class="item u-flex u-flex-items-baseline u-m-b-20">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">起拍价</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">
								{{list.price}}
								<text class="u-p-l-10" :style="{ color: themeConfig.pan.pageTextSub }">
									元/{{list.unit}}
								</text>
							</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">当前叫价</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">
								{{list.curr_unit_price}} 
								<text class="u-p-l-10" :style="{ color: themeConfig.pan.pageTextSub }">
									元/{{list.unit}}
								</text>
							</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">加价幅度</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">
								{{list.Bid_role.step1}} 
								<text class="u-p-l-10" :style="{ color: themeConfig.pan.pageTextSub }">
									元/{{list.unit}}
								</text>
							</view>
						</view>
						<template v-if="list.Bid_role && list.Bid_role.is_part == '1'">
							<view class="item u-flex u-flex-items-baseline u-m-b-20">
								<view class="item-label" :style="{
									color: themeConfig.pan.pageTextSub
								}">每手尺寸</view>
								<view class="item-content" :style="{
									color: themeConfig.pan.baseText
								}">
									{{list.Bid_role.step_amount}} 
									<text class="u-p-l-10" :style="{ color: themeConfig.pan.pageTextSub }">
										{{list.unit}}
									</text>
								</view>
							</view>
							<view class="item u-flex u-flex-items-baseline u-m-b-20">
								<view class="item-label" :style="{
									color: themeConfig.pan.pageTextSub
								}">至少下单</view>
								<view class="item-content" :style="{
									color: themeConfig.pan.baseText
								}">
									{{list.Bid_role.min_amount}}
									<text class="u-p-l-10" :style="{ color: themeConfig.pan.pageTextSub }">
										手
									</text>
								</view>
							</view>
						</template>
						
					</view>
				</view>
				
				
			</view>
			
			<view class="main-box u-p-30 u-font-30 u-m-b-30"
					:style="{
						backgroundColor: themeConfig.pan.boxBg,
					}"
				>
				<view class="item u-flex u-flex-items-baseline u-m-b-20">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">交货地</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">{{list.delivery_place}}</view>
				</view>
				<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="list.settle_mode">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">交货方式</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">{{list.settle_mode | settleMode}}</view>
				</view>
				<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="list.settle_month">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">交收期</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">{{list.settle_month}}月{{list.settle_date | date2szx}}</view>
				</view>
				<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="list.dprice">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">公式价规则</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">{{list.dprice}}</view>
				</view>
				<view class="item u-flex u-flex-items-baseline u-m-b-20">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">发布时间</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">
						{{list.post_time | date2timestamp | timeFrom}} 
						<text :style="{color: themeConfig.pan.pageTextSub}">({{list.post_time}})</text>	
					</view>
				</view> 
				<!-- <view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="list.base_afterday">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">最迟交收</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">
						点价后最迟 {{list.base_afterday}} 天
					</view>
				</view> -->
				<view class="item u-flex u-flex-items-baseline">
					<view class="item-label" :style="{
						color: themeConfig.pan.pageTextSub
					}">
						<template v-if="list.trade_mode == '3'">最迟点价</template>
						<template v-else>有效时间</template>
					</view>
					<view class="item-content" :style="{
						color: themeConfig.pan.baseText
					}">
						<template v-if="list.trade_mode == '3'">{{list.express_time}} {{list.express_unit}}:00</template>
						<template v-else>{{list.express_time}} {{list.express_unit | expressUnit}} </template>
						
					</view>
				</view>
			</view>
			
			
			<view class="main-box u-font-30 u-m-b-30"
				:style="{
					backgroundColor: themeConfig.pan.boxBgTop
				}"
				v-if="cpy.id"
			>
				<view class="main-box-title u-flex u-flex-items-center u-flex-between u-p-20 u-p-l-30 u-p-r-30"
					
				>
					<view class="u-flex u-flex-items-center">
						<i class="custom-icon-friend custom-icon u-m-r-10" :style="{color: themeConfig.pan.lightcolor}"></i>
						<text :style="{color: themeConfig.pan.baseText}">{{cpy.name}}</text>
					</view>
					<view class="u-flex u-flex-items-center" @click="handleGoto({url: '/pages/my/home/home', params: {login:cpy.id}})">
						<i class="custom-icon-card_fill custom-icon" :style="{color: themeConfig.pan.lightcolor}"></i>
					</view>
				</view>
				<view  :class="{
					'u-p-15': typeActive == 'white'
				}" >
					<view class="main-box-content "
						:class="{
							'u-p-15': typeActive == 'white',
							'u-p-30': typeActive == 'dark'
						}"
						:style="{
							backgroundColor: themeConfig.pan.boxBg,
							borderRadius: typeActive == 'white'?'20rpx': '0',
						}"
					>
						<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="cpy.contact">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">联系人</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">{{cpy.contact}}</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="cpy.address">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">地址</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">{{cpy.address}}</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="cpy.mobile">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">手机</view>
							<view class="item-content u-flex u-flex-items-center" 
								@click="makePhone(cpy.mobile)"
								:style="{
									color: themeConfig.pan.baseText
								}">
								{{cpy.mobile_show ? cpy.mobile : cpy.mobile1}}
								<i class="custom-icon-dianhua custom-icon u-m-l-10"></i>
							</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="cpy.tel">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">电话</view>
							<view class="item-content u-flex u-flex-items-center" 
								@click="makePhone(cpy.tel)"
								:style="{
									color: themeConfig.pan.baseText
								}">
								{{cpy.tel}}
								<i class="custom-icon-dianhua custom-icon u-m-l-10"></i>
							</view>
						</view>
						<view class="item u-flex u-flex-items-baseline u-m-b-20" v-if="cpy.email">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">邮箱</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">{{cpy.email}}</view>
						</view>
						<view class="item u-flex u-flex-items-baseline">
							<view class="item-label" :style="{
								color: themeConfig.pan.pageTextSub
							}">发布人</view>
							<view class="item-content" :style="{
								color: themeConfig.pan.baseText
							}">
								{{list.post_type | postType2fbr}}
							</view>
						</view>
					</view>
				</view>
				
				
			</view>
		
			<view class="main-box u-font-30 u-m-b-30"
					:style="{
						backgroundColor: themeConfig.pan.boxBg,
					}"
				>
				<view class="main-box-title u-flex u-flex-items-center u-flex-betweenu-font-32"
					:style="{
						backgroundColor: themeConfig.pan.boxBgTop
					}"
				>
					<view class="item  u-flex u-flex-items-center u-flex-center" :style="{
							backgroundColor: tabs_current == index? themeConfig.pan.tabBgActive : themeConfig.pan.tabBgInactive,
							color: tabs_current == index? themeConfig.pan.tabTextActive : themeConfig.pan.tabTextInactive
						}"
						v-for="(item,index) in tabs_desc"
						:key="index"
						@click="tabs_current = index"
					>{{item.label}}</view>
					
				</view>
				<view class="main-box-content u-p-20">
					<view class=" u-p-20" :style="{
						color: themeConfig.pan.pageTextSub,
						lineHeight: '22px'
					}"
					>
						<template
							v-if="tabs_desc[tabs_current].content"
						>
							<!-- {{tabs_desc[tabs_current].content}} -->
							<rich-text :nodes="tabs_desc[tabs_current].content"></rich-text>
						</template>
						<template v-else>
							<u-empty
								mode="data"
								:icon="themeConfig.empty"
								text="无内容"
							>
							</u-empty>
						</template>
					</view>
				</view>
				
			</view>
			
			<template v-if="!fxid">
				<view class="u-flex u-flex-items-center u-flex-center u-p-20 u-m-b-30"
					:style="{
						color: themeConfig.pan.lightcolor
					}"
				>{{`该${pan == 's'? '卖家的其他供应' : '买家的其他求购'}`}}</view>
				
				<view class="other-list">
					<view class="item u-m-b-20"
						v-for="(item, index) in indexList"
						:key="item.id"
					>
						<cardA
							:name="item.name"
							:pid="item.id"
							:amount="item.amount"
							:color="item.color"
							:price="item.price"
							:unit="item.unit"
							:spec="pan == 'b' ? item.spec : item.spec1"
							:delivery_place="item.delivery_place"
							:express_time="item.express_time"
							:express_unit="item.express_unit"
							:trade_type="item.trade_type"
							:pubDate="item.post_time"
							:origin="item"
							@tims="handleClickTims"
							@detail="handleRouteTo"
						></cardA>
					</view>
				</view>
			</template>
			
			
					
		</view>
		
		
		
		<u-safe-bottom></u-safe-bottom>
		
		<u-popup 
			:show="imgWrapShow" 
			@close="imgWrapShow = false" 
			mode="center"
			closeable
			bgColor="transparent"
		>
			<view class="imgw">
				<u-swiper
					:list="list.list_pics"
					keyName="pic"
					height="60vh"
					imgMode="aspectFit"
					bgColor="rgba(0,0,0,.7)"
					indicator
					previousMargin="10"
					nextMargin="10"
				></u-swiper>
			</view>
		</u-popup>
		<!-- 竞拍记录 -->
		<u-popup 
			:show="jpListShow" 
			@close="jpListShow = false" 
			mode="bottom" 
			bgColor="transparent"
		>
			<view class="u-p-20 jp-wrap" >
				<view style="border-radius: 10px;overflow: hidden;">
					<view
						class="u-text-center u-p-20 u-font-28"
						:style="{
							color: themeConfig.tabText, 
							backgroundColor: themeConfig.pan.pageBg,
						}"
						>竞拍记录</view>
					<scroll-view class="jp-content u-p-20"
						:style="{
							height: '400px',
							color: themeConfig.tabText,
							backgroundColor: themeConfig.pan.pageBg,
						}"
						scroll-y
					> 
						<view class="u-p-10" v-for="(item, index) in list2.list" :key="index">
							<jpCard :item="item" :panData="list2.Sell" :pw_curr_page="list2.pw_curr_page" :unit="list.unit"></jpCard>
						</view>
						<template v-if="list2.list && list2.list.length == 0">
							<u-empty
								mode="data"
								:icon="themeConfig.empty"
							>
							</u-empty>
						</template> 
					</scroll-view>
				</view>
				
			</view>
			
		</u-popup>
		
		<!-- 竞标表单 -->
		<u-popup
			:show="jpSubmitShow" 
			@close="jpSubmitShow = false" 
			mode="center" 
			round="20"
			:safeAreaInsetBottom="false"
			bgColor="transparent"
		>
			<view class="u-p-20 jp-wrap" style="width: 90vw; ">
				<view style="border-radius: 10px;overflow: hidden;" v-if="list.Bid_role">
					<view
						class="u-text-center u-p-20 u-font-28"
						:style="{
							color: themeConfig.tabText, 
							backgroundColor: themeConfig.pan.pageBg,
						}"
						>竞标表单 - {{ list.Bid_role.is_part == '1' ? '按手竞拍' : '总量竞拍'}}</view>
					<view class="jp-content u-p-20 u-p-l-40"
						:style="{
							color: themeConfig.tabText,
							backgroundColor: themeConfig.pan.pageBg,
						}" 
					> 
						<u--form
								labelPosition="left"
								:model="jpData" 
								ref="form1"
								labelWidth="80"
								:borderBottom="false"
								:labelStyle="{
									color: themeConfig.tabText,
								}"
							>
							<u-form-item
									label="竞标数量"
									prop="num" 
									v-if="list.Bid_role.is_part == '1'"
								>
									<view class="u-flex u-flex-items-center">
										<u-number-box 
											v-model="jpData.num" 
											:step="jpNumConfig.num.step" 
											:min="jpNumConfig.num.min" 
											:max="jpNumConfig.num.max" 
											:color="themeConfig.pan.numboxColor"
											:iconStyle="{color: themeConfig.pan.numboxColor}"
											:bgColor="themeConfig.pan.numboxBg"
											inputWidth="60"
										></u-number-box>
										<view class="u-m-l-12" :style="{
												color: themeConfig.tabText,
											}">{{list.unit}}</view>
									</view>
								</u-form-item>
							<u-form-item
									label="加价"
									prop="add" 
								>
									<view class="u-flex u-flex-items-center">
										<u-number-box
											v-model="jpData.add" 
											:step="jpNumConfig.add.step" 
											:min="jpNumConfig.add.min"  
											:color="themeConfig.pan.numboxColor"
											:iconStyle="{color: themeConfig.pan.numboxColor}"
											:bgColor="themeConfig.pan.numboxBg"
											inputWidth="60"
										></u-number-box>
										<view class="u-m-l-12" :style="{
												color: themeConfig.tabText,
											}">元/{{list.unit}}</view>
									</view>
									
								</u-form-item>
						</u--form> 
						<view class="u-p-t-20 u-p-b-20 u-m-t-60">
							<u-button type="primary" @click="bidPriceSubmit">提 交</u-button>
						</view>
					</view>
				</view>
				
			</view>
			
		</u-popup>
		<tabBar
			:theme="typeActive"
			:customStyle="{
				'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
			}">
			<view class="pan-tabbar u-flex u-flex-items-center u-flex-around "
				:style="{
					color: themeConfig.tabText,
					backgroundColor: themeConfig.tabBg,
				}"
			>
				<view @click="handleGoto({url: '/pages/index/index', type: 'reLaunch'})" class="item-btn  u-flex u-flex-items-center u-flex-center">
					<text>首页</text>
				</view>
				<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				<!-- <view @click="handleTimesBtn('', `咨询${pan=='s'? '卖盘': '买盘'}：${list.name}，https://www.rawmex.cn/${pan=='s'? 'sell': 'buy'}-${id}.html`)" class="item-btn  u-flex u-flex-items-center u-flex-center">
					<i class="custom-icon-tims custom-icon"></i>
					<text>在线联系</text>
				</view> -->
				<template v-if="cpy.weixin_pic"> 
					<view @click="wxImgShow = true" class="item-btn  u-flex u-flex-items-center u-flex-center">
						<u-icon name="weixin-fill" :color="themeConfig.tabText" size="20"></u-icon>
						<text>加我微信</text>
					</view>
					<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				</template>
				
				<template v-if="orderBtnShow == 1">
					<view class="item-btn u-flex u-flex-items-center u-flex-center"
						:style="{
							color: themeConfig.tabTextActive
						}"
						@click="handleOrderBtn"
					>
						<i class="custom-icon-add-product custom-icon"></i>
						<text class="u-p-l-10">{{orderBtnName}}</text>
					</view>
					<u-line direction="col" :color="themeConfig.pageTextSub" length="30%"></u-line>
				</template>
				
				
				 <view class="item-btn  u-flex u-flex-items-center u-flex-center">
					<u-button open-type="share" :customStyle="{
						color: themeConfig.tabText,
						backgroundColor: 'transparent',
						border: 'none',
						fontSize: '16px'
					}">
						<i class="custom-icon-forward custom-icon"></i>
						<text class="u-p-l-10">转发</text>
					</u-button>
					
				</view>
			</view>
			
		</tabBar>
		<u-loading-page 
			:loading="pageLoading"
			loading-text="loading..."
			loadingMode="semicircle"
			:bg-color="themeConfig.pageBg"
			:loading-color="themeConfig.loading"
			:color="themeConfig.pageTextSub"
		></u-loading-page>
		<u-toast ref="uToast"></u-toast>
		<menusPopupImg 
			:show="wxImgShow"  
			:wx_img="`${baseWebImg}${cpy.weixin_pic}`"
			@close="wxImgShow = false"
		></menusPopupImg>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import mixShareInfo from '@/config/mixShareInfo'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				id: '',
				fxid: '',
				pan: '',
				key: '',
				wxImgShow: false,
				imgWrapShow: false,
				jpListShow: false,
				jpSubmitShow: false,
				backBtn: true,
				indexList: [],
				list: {},
				list2: {},
				cpy: {},
				timeData: {},
				jpData: {
					num: 0,
					add: 0, 
				},
				cpyInfo: true,
				tabs_current: 0,
				tabs_desc: [
					{
						label: '商品描述',
						content: ''
					},
					{
						label: '备注',
						content: ''
					},
					{
						label: '说明',
						content: ''
					},
				],
				pageLoading: true,
				orderBtnShow: 1,
				orderBtnName: '立即下单',
				jpBtnName: '预 约',
				timeLeft: 0,
				trade_mode: '',
			};
		},
		async onLoad(options) {
			if(uni.$u.pages().length == 1) this.backBtn = false
			if(options.hasOwnProperty('id')) {
				this.id = options.id
			}
			if(options.hasOwnProperty('fxid')) {
				this.fxid = options.fxid
			}
			if(options.hasOwnProperty('key')) {
				this.key = options.key
			}
			if(options.hasOwnProperty('pan')) {
				this.pan = options.pan
			}
			if(options.hasOwnProperty('trade_mode')) {
				this.trade_mode = options.trade_mode
			}
			await this.getData()
			this.pageLoading = false
			// await this.getCpyData()
			if(!this.fxid) {
				await this.getDataList()
			}
			
		},
		watch: {
			timeLeft() {
				// this.$nextTick(() => {
				// 	this.$refs.countDown.start()
				// })
				
			}
		},
		computed: {
			...mapState({
				baseWebImg: state => state.user.baseWebImg,
				typeActive: state => state.theme.typeActive,
				sh: state => state.user.sh,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig',
				sys: 'theme/sys'
			}),
			jpNumConfig() {
				//竞拍 步进器配置
				let initConfig = {
					add: {
						step: 1,
						min: 0, 
					},
					num: {
						step: 1,
						min: 0,
						max: 100
					},
				}
				if(this.list.hasOwnProperty('Bid_role')) {
					initConfig.add.step = this.list.Bid_role.step1
					initConfig.add.min = this.list.Bid_role.step1 
					
					initConfig.num.step = this.list.Bid_role.step_amount 
					initConfig.num.min = this.list.Bid_role.step_amount *  this.list.Bid_role.min_amount
					initConfig.num.max = this.list.amount
				}
				if(this.list2.hasOwnProperty('list') && this.list2.list.length == 0) {
					initConfig.add.min = 0 
				}
				
				return initConfig
			},
			countDownStr() {
				if(!this.list.Bid_role) return ''
				if(this.list.Bid_role.is_bid_begin == 1) return '距竞拍开始还剩'
				else if(this.list.Bid_role.is_biding == 1) return '距竞拍结束还剩'
				else if(this.list.Bid_role.is_bid_end == 1) return '竞拍已结束'
				return ''
			},
			jpBtnDisabled() {
				//预约阶段按钮使用状态
				let state = (this.list.hasOwnProperty('Bid_role') && this.list.Bid_role.is_bid_begin == 1)
							&& this.list.is_bid == '0'
				//竞价阶段按钮使用状态	
				let state2 = (this.list.hasOwnProperty('Bid_role') && this.list.Bid_role.is_biding == 1)
							
				if(
					state || state2
				) return false;
				return true
			},
			// list_bid_items() {
			// 	if(!this.list.hasOwnProperty('list_bid_items') || this.list.list_bid_items.length == 0) return [];
			// 	let id = this.list.Bid_item.id
			// 	return this.list.list_bid_items.map(ele => {
			// 		if(ele.id == id) {
			// 			ele.mark = 1
			// 		}
			// 		return ele
			// 	})
			// }
		},
		methods: {
			...mapMutations({
				handleGoto: 'user/handleGoto'
			}),
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			},
			onJpTimeChange(e) {
                this.timeData = e
            },
			onJpTimeFinish() {
				this.refreshData()
			},
			makePhone(mobile) {
				uni.makePhoneCall({
					phoneNumber: mobile 
				});
			},
			handleBackEvent() {
				uni.navigateBack()
			},
			async refreshData() {
				uni.showLoading()
				await this.getData() 
			},
			initBidConfig() {
				let now = new Date().getTime()
				// 设置倒计时
				if(this.list.Bid_role.is_bid_begin == 1) {
					//预约阶段
					this.timeLeft = this.list.Bid_role.str_btime * 1000 - now
				}
				else if(this.list.Bid_role.is_biding == 1) {
					//竞拍中
					this.timeLeft = this.list.Bid_role.str_etime * 1000 - now
					// console.log(this.timeLeft)
				}
				 if(this.list.Bid_role.is_part == '1') {
					 this.jpData.num = this.list.Bid_role.step_amount * this.list.Bid_role.min_amount
				 }else {
					 this.jpData.num = this.list.amount
				 }
				 
				 if(this.list2.hasOwnProperty('list') && this.list2.list.length == 0) {
				 	this.jpData.add = 0
				 }else {
					this.jpData.add = this.list.Bid_role.step1
				 }
				
			},
			async getData() {
				const res = await this.$api[this.pan == 's'? 'getSellDetail' : 'getBuyDetail']({params: {id: this.id, fxid: this.fxid, key: this.key, trade_mode: this.trade_mode}})
				// console.log(res)
				if(res.code == 1) {
					this.list = res.list
					this.list2 = res.list2 || {}
					if(this.pan == 's' && this.list.trade_mode == '1') {
						this.initBidConfig() 
					}
					this.cpy = res.company
					this.tabs_desc[0].content = this.list.intro
					this.tabs_desc[1].content = this.list.remark
					this.tabs_desc[2].label =res.detail_title
					this.tabs_desc[2].content =res.detail_info
					this.orderBtnShow = res.button
					this.orderBtnName = res.button_name
					this.jpBtnName = res.button_name1
					this.setOnlineControl(res)
					
				}
			},
			async getCpyData() {
				if(!this.list.login) return
				const res = await this.$api.getCompanyDetail({params: {login: this.list.login}})
				// console.log(res)
				if(res.code == 1) {
					this.cpy = res.list
				}
			},
			async getDataList() {
				// if(this.loadstatus != 'loadmore') return
				// this.loadstatus = 'loading'
				const res = await this.$api[this.pan == 's'?'getSell': 'getBuy']({params: {
						login: this.list.login, 
						// standard: this.list.standard,
						p: 1,
						expressed: 1,
						pr: 3
					}})
				if(res.code == 1) {
					this.indexList = res.list.filter(ele => ele.id != this.id)
					// if(this.curP == res.page_total) {
					// 	this.loadstatus = 'nomore'
					// }else {
					// 	this.loadstatus = 'loadmore'
					// }
				}
			},
			
			handleRouteTo({id}) {
				uni.navigateTo({
					url: `/pages/index/pan/panDetail?id=${id}&pan=${this.pan}`
				})
			},
			
			handleClickTims({tims, id}) {
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login: `${tims.login}`,
						content: ``
					}
				})
			},
			handleTimesBtn(login, content="") {
				if(!login) login = this.list.Tims.login
				// if(this.sh == 1) return
				this.handleGoto({
					url: '/pages/my/msg/msgDetail',
					params: {
						login,
						content,
					}
				})
				// this.handleGoto({
				// 	url: '/pages/index/webview/webview',
				// 	params: {
				// 		_a: 'msg',
				// 		f: 'detail',
				// 		id: `${this.list.Tims.id}_${this.list.Tims.ctime}`,
				// 		ttype: this.pan == 's'? 'sell': 'buy',
				// 		tid: this.id,
				// 		tims: '1'
				// 	}
				// })
			},
			async jpBtnEvent() {
				if(this.list.Bid_role.is_bid_begin == 1) {
					await this.bid_subscribe()  
					this.refreshData()
				}
				else if(this.list.Bid_role.is_biding == 1) {
					this.jpSubmitShow = true
				}
				
			},
			async bid_subscribe() {
				uni.showLoading()
				const res = await this.$api.bid_subscribe_subscribe_sell({
					params: {
						source: 'SELL',
						source_id: this.id
					}
				})
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
				}
			},
			async bidPriceSubmit() {
				uni.showLoading()
				const res = await this.$api.bid_subscribe_bid_trade({
					params: {
						source: pan == 's' ?  'SELL' : 'BUY' ,
						source_id: this.id,
						curr_unit_price: this.list.curr_unit_price2,
						bid_price: this.jpData.add,
						bid_amount: this.jpData.num,
					}
				})
				
				if(res.code == 1) {
					this.showToast({
						type: 'success',
						message: res.msg, 
					})
					this.jpSubmitShow = false
					await this.refreshData()
				}
			},
			handleOrderBtn() {
				let obj = {
					url: '/pages/my/order/order_inquiry_edit', 
					params: { 
						id: this.id,  
						fxid: this.fxid, 
						trade_mode: this.trade_mode
					},
				}
				if(this.list.trade_mode != '5') {
					obj.url = '/pages/my/order/order_edit'
					obj.params = {
						ordertype: this.pan == 's'? 'B' : 'S', 
						id: this.id, 
						fxid: this.fxid, 
						type: 'add',
						trade_mode: this.trade_mode
					}
				}
				this.handleGoto(obj)
			},
		}
	}
</script>
<style lang="scss">
.time {
    @include flex;
    align-items: center;

    &__item {
         // color: #fff;
         font-size: 15px;
         text-align: center;
     }
}
</style>
<style lang="scss" scoped>
	.jp-wrap {  
		box-sizing: border-box;
	}
	.jp-bar {
		border-radius: 10px;
	}
	.jp-content { 
		width: 100%;
		box-sizing: border-box; 
	}
	.imgw {
		width: 100vw;
	}
	.item-label {
		flex: 0 0 80px
	}
	.w {
		padding-bottom: 60px;
		min-height: 100vh;
	}
	.tag {
		display: inline-block;
		line-height: 18px;
		height: 18px;
		border: 1rpx solid #f8f8f8;
		color: #666;
		border-radius: 8rpx;
		padding: 0 8px;
	}
	.pan-tabbar {
		height: 100%;
		.item-btn {
			height: 100%;
			&.share-btn {
				
			}
		}
	}
	.pan-main {
		position: relative;
		top: -40px;
		padding: 0 15px;
		.main-box {
			border-radius: 16rpx;
			overflow: hidden;
			box-shadow: 0 0 10px rgba(0,0,0,.1);
		}
	}
	.main-box-title .item {
		height: 35px;
		flex: 1 1 50%;
		
	}
</style>
