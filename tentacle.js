let tentacle_pow=30
let tentacle_e=30
let tentacle_m=60

function tentacle(){
	ev["tentacle"]={
		ev:function(){
			var ans=check("str",tentacle_pow-5)
			if(ans>=5){
				show("你斩杀了一只触手怪物。")
				gain({money:tentacle_m,exp:tentacle_e})
			}else if(ans>=0){
				show("你在战斗中被触手绑住了身体。")
				show("在被触手玩弄了身体后，你奋力挣脱了。")
				gain({v_exp:1,a_exp:1,b_exp:1,p_exp:1})
			}else{
				show("你在战斗中被触手绑住了身体。")
				show("在被触手玩弄了身体后，你失去了反抗的力量。")
				gain({v_exp:1,a_exp:1,b_exp:1,p_exp:1})
				pause()
				show("你被触手侵犯了。")
				gain({v_exp:3,a_exp:3,o_exp:3,p_exp:3,s_exp:3},"触手")
				if(rand(3)==1){
					gainbuff("怀孕：触手",1)
				}
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:4,
		end:4
	}
	ev["tentacle2"]={
		ev:function(){
			var ans=check("dex",tentacle_pow)
			show("一根触手从阴影中卷向你的脚踝。")
			if(ans>=0){
				show("你躲开了触手的偷袭。")
				gain({money:tentacle_m,exp:tentacle_e})
			}else if(check("str",tentacle_pow)>=0){
				show("你激烈地反抗着。触手卷走了你身上的衣服后逃走了。")
				gain({e_exp:2})
			}else{
				show("触手将你吊了起来。")
				show("在被触手玩弄了身体后，你失去了反抗的力量。")
				gain({v_exp:1,a_exp:1,b_exp:1,p_exp:1})
				pause()
				show("你被触手侵犯了。")
				gain({v_exp:3,a_exp:3,o_exp:3,p_exp:3,s_exp:3},"触手")
				if(rand(3)==1){
					gainbuff("怀孕：触手",1)
				}
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:4,
		end:4
	}
	ev["tentacle3"]={
		ev:function(){
			var ans=check("dex",tentacle_pow)
			show("触手突然张开了长满细小牙齿的嘴，咬向你的乳头。")
			if(ans>=0){
				show("你及时躲开了。")
				gain({money:tentacle_m,exp:tentacle_e})
			}else if("母乳体质" in buff){
				show("触手贪婪地吸食着你分泌的乳汁。")
				gain({b_exp:5,p_exp:2})
			}else{
				if(rand(3)==0){
					show("触手对你的胸部注入了一些液体。")
					show("随后，你分泌出了乳汁。")
					gain({b_exp:5,p_exp:2})
					gainbuff("母乳体质")
				}else{
					show("触手对你的胸部注入了一些液体。")
					show("随后，你的乳头挺立起来。")
					gain({b_exp:5,p_exp:2})
				}
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:4,
		end:4
	}
	ev["tentacle4"]={
		ev:function(){
			var ans=check("wis",tentacle_pow-5)
			show("你遇到了一只在触手顶端长着魔眼的怪物。")
			if(ans>=5){
				show("你避开了它的目光。")
				gain({money:tentacle_m,exp:tentacle_e})
			}else if(ans>=0){
				show("你的目光和它略微接触，下体立刻就产生了一股热流。你连忙移开了视线。")
				gain({lust:10})
			}else{
				show("你的目光和它略微接触，下体立刻就产生了一股热流。")
				show("你向触手张开小穴，请求触手的侵犯。")
				gain({v_exp:5,s_exp:2},"触手")
				if(rand(2)==1){
					gainbuff("怀孕：触手",1)
				}
			}
		},
		town:false,
		chance:function(){
			return 1
		},
		start:4,
		end:4
	}
	ev["tentacle_birth"]={
		ev:function(){
			show("你产下了一只触手怪。")
			show("不知道为什么，你对自己生下的触手产生了亲切感。")
			show("你决定自己养大这个孩子，既不让它被冒险者伤害，也不让它危害人类。")
			gain({birth_exp:1})
			gainbuff("触手的饲主",1)
			gainbuff("怀孕：触手",-10000)
			if(rand(3)==0){
				pause()
				show("由于出产的影响，你分泌出了乳汁。")
				gain({b_exp:5})
				gainbuff("母乳体质")
			}
		},
		town:true,
		chance:function(){
			if("怀孕：触手" in buff){
				return 10000
			}
		},
		end:4
	}
	ev["tentacle_birth2"]={
		ev:function(){
			show("你褪去上衣，将触手抱在怀中。")
			show("触手出于本能地张开小口咬住你的乳头，吮吸起来。")
			gain({b_exp:5})
			gainbuff("触手的饲主",1)
		},
		town:true,
		chance:function(){
			if("触手的饲主" in buff && "母乳体质" in buff)
				return 1
		},
		end:4

	}
	ev["tentacle_birth3"]={
		ev:function(){
			show("你对着自己产下的幼体触手自慰，让它吸收你分泌的淫液。",true)
			if(getbuff("触手的饲主")>=3){
				show("触手对你的投食并不满足，直接钻进了你的阴道。")
				gain({v_exp:5,m_exp:3})
				gainbuff("触手的饲主",1)
			}else{
				show("你坚信这只是在喂食。")
				gain({v_exp:3,m_exp:3})
				gainbuff("触手的饲主",1)
			}
		},
		town:true,
		chance:function(){
			if("触手的饲主" in buff){
				return 1
			}
		},
		end:4
	}
	ev["tentacle_birth4"]={
		ev:function(){
			show("你做了一场被触手侵犯的春梦。")
			show("一觉醒来，你发现自己的下体满是触手的精液。")
			show("你意识到自己的孩子已经长大到可以侵犯女人了。")
			gain({v_exp:5,s_exp:2})
			gainbuff("触手的饲主",1)
		},
		town:true,
		once:true,
		chance:function(){
			if(getbuff("触手的饲主")>=3){
				return 1
			}
		},
		end:4
	}
	ev["tentacle_birth5"]={
		ev:function(){
			show("你隐晦地告诉武道家自己在饲养触手的事情。")
			show("她立刻就表示今天晚上就去你住的地方看看——你不确定她是否真的听明白了。",true)
			show("当天晚上，她如约而至……还带上了她生下的触手。")
			show("你们为对方的孩子处理了性欲。")
			gain({v_exp:5,s_exp:2})
			gainop("武道家")
			gainbuff("触手的饲主",1)
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("tentacle_birth4")&&getop("武道家")>=3){
				return 1
			}
		},
		end:4
	}
	ev["tentacle_birth6"]={
		ev:function(){
			show("你隐晦地告诉魔法师自己在饲养触手的事情。")
			show("她纠结了一番之后表示，凡是姐姐所希望的事情，她都会尝试着去接纳。",true)
			show("当天晚上，她如约而至……")
			show("你们和触手一同度过了缠绵的一夜。")
			gain({v_exp:3,o_exp:3,b_exp:3,s_exp:1,les_exp:3})
			gainop("魔法师")
			gainbuff("触手的饲主",1)
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("tentacle_birth4")&&getop("魔法师")>=3){
				return 1
			}
		},
		end:4
	}
	ev["tentacle_birth7"]={
		ev:function(){
			show("你隐晦地告诉刺客自己在饲养触手的事情。")
			show("她同意前来看看，并表示自己只是不想欠你人情。",true)
			show("当天晚上，她如约而至……")
			show("然后，触手幼体被她作为自慰套使用了。")
			gainop("刺客")
			gainbuff("触手的饲主",1)
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("tentacle_birth4")&&getop("刺客")>=3){
				return 1
			}
		},
		end:4
	}
	ev["tentacle_birth8"]={
		ev:function(){
			show("会长察觉到了你的异常，要求你交出藏匿的触手。")
			show("你同意她搜查你住处的要求。但你觉得自己的孩子不会伤人，她的要求根本没有道理。",true)
			show("为了改变她的观点，你决定让她亲自体验一下触手的美好。")
			show("你暗算了会长，然后叫出躲在一旁的触手侵犯了她。")
			show("会长和你预料的一样，沉迷在和触手交合当中。",true)
			show("事后，她并没有责备你。只是代表公会没收了这只触手怪。")
			show("几个星期后，公会里的每一个女冒险者都认识到了触手的美好。",true)
			show("结局：触手的俘虏")
			gameover=true
		},
		town:true,
		once:true,
		chance:function(){
			if(getbuff("触手的饲主")>=5){
				return getbuff("触手的饲主")/5
			}
		},
		end:4
	}
	ev["tentacle_boss"]={
		ev:function(){
			show("你在迷宫的深处遇到了触手原体。")
			show("它正在侵犯一个衣不蔽体的少女。",true)
			var pow=tentacle_pow
			if(check("wis",pow)>=0){
				show("你注意到少女有被触手洗脑的迹象，判断这可能是个陷阱。",true)
			}else{
				show("你救下了少女。")
				show("她紧紧抱住你的身子，使你无法动弹。",true)
				show("触手原体同时插入了三穴，注入了大量的精液。")
				gain({v_exp:5,a_exp:5,o_exp:5,s_exp:5},"触手原体")
				gainbuff("怀孕：触手",1)
				return
			}
			show("见你没有上钩，大量的触手朝你袭来。")
			if(check("dex",pow)>=0){
				show("你灵活地避开了。")
			}else{
				show("你被触手卷住四肢。随后，触手将你的身体在空中摆成了一个大字型。")
				show("触手原体同时插入了三穴，注入了大量的精液。")
				gain({v_exp:5,a_exp:5,o_exp:5,s_exp:5},"触手原体")
				gainbuff("怀孕：触手",1)
				return
			}
			show("你每斩断一条触手，都会有新的触手向你袭来。你知道这么耗下去不是办法，朝着原体发起突击。")
			show("原体连忙用触手组成一道墙壁，挡住你的去路。")
			if(check("str",pow)>=0){
				show("你强行突破了触手的阻挡，然后击穿了原体的心脏。")
				//gainbuff("讨伐证明：触手原体")
				chapter=5
				chapter_startweek=week
				gain({p_exp:5,s_exp:2,exp:tentacle_e*5,money:tentacle_m*5})
				if("触手的饲主" in buff){
					pause()
					show("触手的洗脑效果解除了。")
					show("回城之后，你放生了自己饲养的触手。")
				}
				pause()
				show("你的冒险者等级提升了。")
			}else{
				show("你冲进了这道肉墙当中，随后被触手淹没了。",true)
				show("触手原体同时插入了三穴，注入了大量的精液。")
				gain({v_exp:10,a_exp:10,o_exp:10,s_exp:10},"触手原体")
				gainbuff("怀孕：触手",1)
				return
			}
		},
		town:false,
		chance:function(){
			if(week-chapter_startweek<=7)return 0
			if(week-chapter_startweek>=16)return 2
			return 1
		},
		start:4,
		end:4
	}
}

