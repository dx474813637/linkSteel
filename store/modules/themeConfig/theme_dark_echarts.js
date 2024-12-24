export const darkSeries = {
	line: {
		series: [
			{
				name: '生意社价格',
				type: 'line',
				lineStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#00cdce' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#0262ab' // 100% 处的颜色
						}],
						global: false // 缺省为 false
					},
					width: 1,
					// shadowOffsetX: 0, // 折线的X偏移    
					// shadowOffsetY: 9,// 折线的Y偏移  
					// shadowBlur: 8,  // 折线模糊
					// shadowColor: "rgba(0, 132, 132, 1)",
					
				},
				smooth: true,
				showSymbol: false,
				legendHoverLink: false,
				data: [],
			}
		]
	},
	bar: {
		series: [
			{
				name: '涨跌幅',
				type: 'bar',
				itemStyle: {
					color: '#ff2c2c'
				},
				barGap: '-100%',
				data: [],
			},
			{
				name: '涨跌幅',
				type: 'bar',
				itemStyle: {
					color: "#00aa7f"
				},
				barGap: '-100%',
				data: [],
			},
		]
	}
}
export const darkBaseOptions = {
	backgroundColor: 'transparent',
	title: {
		left: '10',
		id: 'title',
		text: '生意社价格 {a|[切换]}',
		subtext: '生意社价格',
		subtextStyle: {},
		triggerEvent: true,
		textStyle: {
			color: '#fff',
			fontSize: 17,
			rich: {
				a: {
					color: '#19a7ff',
					lineHeight: 12,
					verticalAlign: 'bottom'
				},
			}
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
		  type: 'cross',
		  crossStyle: {
			color: '#546288'
		  },
		  label: {
			  shadowColor: 'transparent',
			  color: '#aaaaff',
		  },
		},
		textStyle: {
			color: '#fff'
		},
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		formatter: '{b0}\n{a0}: {c0}%',
		position: function (point, params, dom, rect, size) {
			  // 固定在顶部
			  console.log(point, params, dom, rect, size)
			  return [point[0], '10%'];
		}
	},
	axisPointer: {
		lineStyle: {
			color: '#374059'
		},
	},
	color: ['#00FFFF', '#ce5151', '#c6910a'],
	legend: {
		type: 'scroll',
		right: "0",
		top: "25",
		data: ['生意社价格'],
		textStyle: {
			color: '#5d6376'
		},
		itemStyle: {
			
		}
	},
	dataZoom: [{
			type: 'slider',
			xAxisIndex: 0,
			borderColor: '#2a3351',
			// start: 50,
			// startValue : '2021-07-01',
			end: 100,
			textStyle: {
				color:'#5d6376'
			},
			brushStyle: {
				
			}
		}
	],
	grid: {
		y: '18%',
		left: '5%',
		right: '5%',
		bottom: '20%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		axisLabel: {
			color: '#5d6579'
		},
		axisLine: {
			lineStyle: {
				color: '#252b3d', //左边线的颜色
				width: '2'
			}
		},
		boundaryGap: false,
		data: [],
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			color: '#5d6579'
		},
		axisLine: {
			lineStyle: {
				color: '#252b3d', //左边线的颜色
				width: '2'
			}
		},
		splitLine: {
			show: true,
			lineStyle: {
				type: 'dashed',
				color: '#252b3d'
			}
		},
		scale: true, //自适应
	},
}