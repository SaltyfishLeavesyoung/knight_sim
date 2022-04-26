function friendship(){
	ev["fighter"]={
		ev:function(){
			show("你踩中了哥布林设下的陷阱。",true)
			show("埋伏在一旁的哥布林向你扑来。")
			show("正当你以为自己会遭到侵犯时，一位路过的女武道家打倒了哥布林。")
			gainop("武道家")
			pause()
			show("你想要向她支付谢礼。")
			show("她表示这只是举手之劳，改天请她吃顿饭就好了。")
		},
		town:false,
		once:true,
		chance:function(){
			return 2
		}
	}
	ev["fighter2"]={
		ev:function(){
			show("你在街上遇到了帮助过你的武道家。",true)
			show("为了表达感谢，你请她吃了一顿大餐。")
			show("她的饭量显著地超出了你的预算。")
			gain({"money":-40})
			gainop("武道家")
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("fighter")&&op["武道家"].val>=0)return 1
		},
	}
	ev["fighter3"]={
		ev:function(){
			show("武道家问你对城中新开的餐馆有没有兴趣。",true)
			show("见你有些犹豫，她补充道：各人付各人的钱就行了。")
			gain({"money":-10})
			gainop("武道家")
		},
		town:true,
		once:false,
		chance:function(){
			if(status.money<=50)return 0
			if(past_event.includes("fighter2")&&op["武道家"].val>=0)return 0.3
		},
	}
	ev["fighter4"]={
		ev:function(){
			show("你在翻检敌人的尸体时碰见了武道家。")
			show("她一眼看出，一件被你忽略的残破护符是附魔的宝物。",true)
			show("你将护符卖了不少钱。")
			show("当天晚上，这笔钱就在请武道家吃饭时花掉了一半。")
			gain({"money":50})
			gainop("武道家")
		},
		town:false,
		once:true,
		chance:function(){
			if(past_event.includes("fighter2")&&op["武道家"].val>=0)return 1
		},
	}
	ev["fighter5"]={
		ev:function(){
			show("你在公会的校场里和武道家进行对战练习。")
			gain({"str":2})
			show("你在连败几局后总算是扳回一城。",true)
			show("旁观的公会教官表示，武道家完全就是在放水。")
			show("随后他和武道家拆了几招，逼迫她拿出了真本事，你这才意识到了她刚才让了你多少。",true)
			show("十招之后，武道家被教官抓住了胸部。")
			if(status.b_lv<=1){
				show("你扭过头不忍心再看下去，耳边传来武道家高亢的娇声。")
			}else{
				show("你上前帮助武道家。")
				show("教官一边表扬你关心同伴的精神，一边揉着你的胸部。")
				gain({b_exp:3})
				gainop("武道家")
			}
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("fighter2")&&past_event.includes("guild_trainer")&&op["武道家"].val>=0)return 0.5
		},
	}
	ev["fighter6"]={
		ev:function(){
			show("得知你最近手头紧张，武道家塞给你一些钱，并爽快地表示不用还。")
			show("你不知道该怎么报答她。")
			gain({"money":100})
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("fighter2")&&status.money<0&&op["武道家"].val>=0)return 1
		},
	}
	ev["fighter7"]={
		ev:function(){
			show("你主动还上了武道家借给你的钱。")
			gain({"money":-100})
			gainop("武道家")
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("fighter6")&&status.money>=200&&op["武道家"].val>=0)return 1
		},
	}
	ev["fighter_prison"]={
		ev:function(){
			show("武道家在接下清理哥布林据点的任务之后没有回来。")
			op["武道家"].val-=10000
			op["武道家"].prison=week+5
		},
		town:true,
		once:true,
		chance:function(){
			if(week-chapter_startweek<=7)return 0
			if(past_event.includes("fighter")&&!("讨伐证明：哥布林村"in buff)&&(op["武道家"].val>=0))return 1
		},
		end:1
	}
	ev["magic"]={
		ev:function(){
			show("你从史莱姆的粘液中救出了一个娇小的女孩子，根据她身上装备的残留部分，你判断她可能是个魔法师。")
			gainop("魔法师")
			pause()
			show("她突然开始大哭。",true)
			if(check("wis",18)<0){
				show("你试图安慰她。想了一阵之后你对她说，被柔软的史莱姆插入不一定会破处。")
				show("她哭得更厉害了。")
			}else{
				show("你不顾她身上污秽的粘液，给了她一个温柔的拥抱。")
				show("她在你的怀中渐渐平静了下来。")
				gain({les_exp:1})
				gainop("魔法师")
			}
			pause()
			show("你将魔法师背回城里。")
			show("医生表示她只是受了些刺激，身体并无大碍。")
		},
		town:false,
		once:true,
		chance:function(){
			return 2
		},
		start:2,
	}
	ev["magic2"]={
		ev:function(){
			show("你在街上遇到了被你救助过的魔法师。")
			show("她送给你一件可爱的挂坠。",true)
			show("当天晚上，你发现她送给你的饰品居然是附魔的高级品。")
			gain({wis:2})
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("magic")&&op["魔法师"].val>=0)return 1
		},
	}
	ev["magic3"]={
		ev:function(){
			show("魔法师在跟你聊天时，将你叫成了姐姐。")
			show("她解释道，自己在内心里一直是这么叫的，只是不小心说出了口。")
			pause()
			show("你让她随意称呼自己，不必拘谨。她立刻就姐姐，姐姐地叫了起来。")
			show("你也为多了一个妹妹感到有些欣慰。")
			gain({les_exp:1})
			gainop("魔法师")
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("magic2")&&op["魔法师"].val>=0)return 1
		},
	}
	ev["magic4"]={
		ev:function(){
			show("你和魔法师一起上街购物。")
			ans=rand(3)
			if(ans==1){
				show("你们分享了一份美味的甜食。")
			}else if(ans==2){
				if(check(status.lewd,15))
					show("你们讨论着内衣的款式。")
				else show("你们讨论着衣服的款式。")
			}else{
				show("你们分别为对方购买了一件小礼物。")
			}
			gain({money:-10,les_exp:1})
			if(past_event.includes("magic5")){
				show("约会临近结束时，你们在一个无人的角落接吻了。")
				gain({o_exp:2,les_exp:2},"魔法师")
				if(op["魔法师"].val>=4&&status.les_lv>=rand(4)+1){
					pause()
					show("你意犹未尽地将魔法师带进了旅馆。")
					gain({o_exp:6,v_exp:2,b_exp:2,les_exp:5})
				}
			}
			gainop("魔法师")
		},
		town:true,
		once:false,
		chance:function(){
			if (status.money<=50) return 0
			if(past_event.includes("magic5")&&op["魔法师"].val>=0)return 0.5
			if(past_event.includes("magic2")&&op["魔法师"].val>=0)return 0.3
		},
	}
	ev["magic5"]={
		ev:function(){
			show("魔法师向你承认，自己小时候差一点被孤儿院的院长侵犯，为此讨厌男性。")
			show("你不知道该怎么答复，只好将她抱在怀里，轻轻抚摸着她的头。",true)
			show("接着她用害羞的声音补充道：在遇到你之后，她发现自己……喜欢女孩子。")
			show("你不确定继续让她靠在你的胸口是不是一个好主意，但你无法推开她。")
			show("魔法师踮起脚尖亲吻了你的嘴唇。")
			gain({o_exp:2,les_exp:2},"魔法师")
			gainop("魔法师")
			gainbuff("魔法师的恋人")
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("magic3")&&op["魔法师"].val>=2)return 1
		},
	}
	ev["magic_prison"]={
		ev:function(){
			show("魔法师被兽人抓走了。")
			op["魔法师"].val-=10000
			op["魔法师"].prison=week+4
		},
		town:true,
		once:true,
		chance:function(){
			if(week-chapter_startweek<=7)return 0
			if(past_event.includes("magic")&&!("讨伐证明：兽人族长"in buff)&&(op["魔法师"].val>=0))return 1
		},
		start:3,
		end:3
	}

	ev["assassin"]={
		ev:function(){
			show("你听到打斗的声音。当你赶到现场时，看到兽人压倒了一个矮小的冒险者。")
			show("兽人将魔爪伸向了冒险者的下身。",true)
			show("你正要出手相助时，兽人的动作突然停了一下。")
			show("冒险者乘机掏出一把匕首，洞穿了兽人的腹部。")
			gainop("刺客")
			pause()
			show("你试图和她搭话。")
			show("她丢出一个烟雾弹，在烟雾的掩护下消失了。")
		},
		town:false,
		once:true,
		chance:function(){
			return 2
		},
		start:3,
	}

	ev["assassin2"]={
		ev:function(){
			show("你注意到刺客独自一人坐在酒吧阴暗的角落里。")
			show("你坐到了她的对面。")
			show("刺客要求你离她远点。")
			gainop("刺客")
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("assassin")&&getop("刺客")>=0) {
				return 1
			}
		}
	}

	ev["assassin3"]={
		ev:function(){
			show("你遇到了正在和触手打斗的刺客。")
			show("她的紧身衣被触手撕碎了，暴露出了……和她娇小的身形并不相称的，勃起的阴茎。")
			show("刺客满脸通红地丢出了烟雾弹。")
			gainop("刺客")
		},
		town:false,
		once:true,
		chance:function(){
			if(past_event.includes("assassin")&&getop("刺客")>=0) return 1
		},
		start:4
	}

	ev["assassin4"]={
		ev:function(){
			show("刺客半夜里潜入了你的房间，威胁你不要暴露她的秘密。")
			show("你再三向她承诺，她总算移开了顶住你后心的匕首。")
			show("“那么，你打算什么时候移开顶着我屁股的匕首呢？”你问道。")
			show("烟雾弹立刻在你的房间里炸裂开来。")
			gainop("刺客")
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("assassin3")&&getop("刺客")>=0) return 2
		},
		start:4
	}

	ev["assassin5"]={
		ev:function(){
			show("你遇到了正在被触手榨取精液的刺客。")
			show("刺客表示不需要你的帮助，但你还是出手赶跑了触手。",true)
			show("刺客声称你是多管闲事，而你觉得她只是有些害羞。")
			show("然后，受到媚药影响，失去理智的刺客袭击了你。")
			show("她爆发出一股怪力，将你按在洞窟的石壁上。")
			show("扶她肉棒进入了你的身体。")
			gain({v_exp:4,s_exp:1,les_exp:2},"刺客")
			gainop("刺客")
		},
		town:false,
		once:true,
		chance:function(){
			if(past_event.includes("assassin4")&&getop("刺客")>=0) return 1
		},
		start:4
	}

	ev["assassin5_1"]={
		ev:function(){
			show("你遇到了正在被魅魔榨取精液的刺客。")
			show("她似乎想对你说什么，但魅魔用接吻封住了她的嘴。")
			show("你决定不要多管闲事。")
			op["刺客"].val-=10000
			op["刺客"].prison=week+4
			show("接下来的一段时间里，刺客都没有半夜造访你的房间——你意识到刺客可能是真的败给魅魔了。")
		},
		town:false,
		once:true,
		chance:function(){
			if(past_event.includes("assassin5")&&getop("刺客")>=0) return 1
		},
		start:5
	}

	ev["assassin6"]={
		ev:function(){
			show("刺客半夜里潜入了你的房间，为之前侵犯你的事情向你道歉。")
			show("作为赔偿，她送给你一柄制作精良的匕首。")
			gain({dex:2})
			pause()
			show("刺客讲述了自己过去在冒险时获得扶她化诅咒的经历。")
			show("近年她都在忍受着性欲——实在忍不住的时候，就会找个魔物发泄一下。")
			if(status.lewd>=20){
				show("你表示，她不必这么冒险，自己就可以帮她解决欲望。")
				show("看到她纠结的样子，你温柔地握住了她早已坚硬的阴茎。")
				gain({o_exp:4,s_exp:1,les_exp:2},"刺客")
				gainop("刺客")
				gainbuff("刺客的密友")
			}else{
				show("你欲言又止。")
			}
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("assassin5")&&getop("刺客")>=0) return 2
		},
		start:4
	}
	ev["assassin7"]={
		ev:function(){
			show("刺客半夜里潜入了你的房间，拜托你为她处理性欲。")
			if(past_event.includes("succubus_assassin"))
				gain({v_exp:4,a_exp:4,s_exp:2,les_exp:2},"刺客")
			else gain({v_exp:4,s_exp:1,les_exp:2},"刺客")
			gainop("刺客")
		},
		town:true,
		once:true,
		chance:function(){
			if(("刺客的密友" in buff)&&getop("刺客")>=0) return 0.8
		},
		start:4
	}
}