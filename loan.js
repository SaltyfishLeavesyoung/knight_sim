function loan(){
	ev["hotel"]={
		ev:function(){
			show("由于长期拖欠房费，你被旅馆赶了出去。")
			gainbuff("露宿街头")
		},
		town:true,
		chance:function(){
			if(getbuff("负债")>=2 && !("露宿街头"in buff)) return 2
		}
	}
	ev["loan"]={
		ev:function(){
			show("放贷者要求你为他口交来支付利息。")
			if(status.o_lv<=2){
				show("你强忍着恶心舔着他的肉棒。")
				gain({o_exp:3,s_exp:1},"放贷者")
				show("完事后他表示你的技术不行，所以这个月的利息还是得正常支付——你理智地决定不要跟他争辩。")
			}else{
				show("你卖力地吞吐着他的肉棒。")
				gain({o_exp:3,s_exp:1},"放贷者")
				if(status.s_lv<=2){
					show("完事后他表示你没有把精液全部喝下去，所以这个月的利息还是得正常支付——你理智地决定不要跟他争辩。")
				}else{
					show("完事后他表示自己最喜欢女人口交完之后嘴角流出精液的样子，而你却全部喝下去了，所以这个月的利息还是得正常支付——你理智地决定不要跟他争辩。")
				}
			}
		},
		town:true,
		chance:function(){
			if(getbuff("负债")>=2 && !(past_event.includes("loan"))) return 1
			if(getbuff("负债")>=2) return 0.3
		}
	}
	ev["loan2"]={
		ev:function(){
			show("放贷者在街上拦住了你，要求你立刻还钱。")
			show("你向他低头道歉。")
			show("他要求你拿出道歉的诚意。")
			show("你被迫照着他的指示全裸下跪，求他宽限一些时日。")
			show("路人指着你议论纷纷。")
			gain({e_exp:5})
		},
		town:true,
		chance:function(){
			if(getbuff("负债")>=2 && !(past_event.includes("loan2")) && status.money<=-100) return 1
			if(getbuff("负债")>=2 && status.money<=-100) return 0.3
		}
	}
	ev["loan3"]={
		ev:function(){
			show("放贷者将你带到了一间娼馆里。")
			show("你被迫立下了卖身的魔法契约。")
			show("娼馆老板交给你一袋金币。")
			gain({money:200})
			gainbuff("契约：娼妇")
			gainflag("娼妇",1)
			pause()
			show("你还没来得及伸手，这笔钱就进了放贷者的口袋。")
			prostitute_week=week
		},
		town:true,
		once:true,
		chance:function(){
			if(!past_event.includes("loan"))return 0
			if(getbuff("负债")>=2 && !("娼妇" in flag) && status.money<=-200) {
				return 1+(-status.money)/200
			}
		}
	}
	ev["loan4"]={
		ev:function(){
			show("由于你长期拖欠，放贷者决定给你一个教训。")
			show("他不顾你的求饶，将你带到了贫民区一间废弃的厕所里。")
			gainbuff("公共厕所")
		},
		town:true,
		once:true,
		chance:function(){
			if(!past_event.includes("loan3"))return 0
			if(getbuff("负债")>=3 && status.money<=-200) return 0.5
		}
	}
	ev["loan5"]={
		ev:function(){
			show("你无力偿还欠款，被放贷者卖给了奴隶商人。")
			gainbuff("契约：奴隶")
			ans=rand(4)
			if(ans==0){
				show("你被卖到了遥远的国度，成为了奴隶娼妇。")
				show("对来自异国的肉体产生兴趣的客人络绎不绝。")
				show("",true)
				show("结局：奴隶娼妇")
			}else if(ans==1){
				show("你被卖给了一个兴趣奇特的贵族，作为女仆在他的宅邸里工作。")
				show("在你的女仆装下总是挂满了各种各样的性玩具。")
				show("",true)
				show("结局：女仆装下的玩具")
			}else if(ans==2){
				show("你被卖给了邪术师，接受各种残酷的人体实验——直到彻底坏掉为止。")
				show("",true)
				show("结局：实验耗材")
			}else{
				show("你被卖给了斗技场，成为了一名奴隶斗士。")
				show("奴隶主向你承诺，如果能连续胜出十场就给你自由。")
				show("然而，斗技场的另一条规则是，像你这样的斗士每连胜一场，下次战斗就必须附带额外的不利条件——直到战败后被对手侵犯为止。")
				show("",true)
				show("结局：斗技场的败者")
			}
			gameover=true
		},
		town:true,
		once:true,
		chance:function(){
			if(!past_event.includes("loan"))return 0
			if(getbuff("负债")>=4 && status.money<=-500) return (-status.money)/250-1
		}
	}
}
