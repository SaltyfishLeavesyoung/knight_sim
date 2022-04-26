function prostitute(){
	ev["prostitute"]={
		ev:function(){
			show("你遇到了多日不见的武道家，她看起来从哥布林监禁造成的创伤当中恢复了一些。")
			show("她表示自己在从事一份收入不菲的新职业，建议你前来试一试。")
			show("你随她来到工作地点，才发现这是一家娼馆。",true)
			show("你被武道家的怪力拉进了娼馆老板的办公室。")
			show("老板询问你的来意，武道家立刻抢着表示你对于卖春有兴趣。")
			show("老板注视着你，询问这是不是你的真实想法。")
			show("",true)
			show("你本想拒绝，不知道为什么却无法说出口。",true)
			show("你立下了卖身的魔法契约。")
			show("娼馆老板交给你一袋金币。")
			gain({money:200})
			gainbuff("契约：娼妇")
			gainflag("娼妇",1)
			prostitute_week=week
		},
		town:true,
		once:true,
		chance:function(){
			if(chapter==2 && week-chapter_startweek<=3)return 0
			if(getop("武道家")<0 && ("负债"in buff) && (status.money<0) && !("娼妇" in flag)) return 1
		},
		start:2
	}
	ev["prostitute2"]={
		ev:function(){
			show("你穿着暴露的衣服，在娼馆的客人面前初次亮相。")
			if(status.v_virgin==""){
				show("你亲手张开阴部，向他们展示了你未经人事的小穴。")
				gain({e_exp:3,m_exp:2})
				pause()
				show("娼馆公开拍卖了你的处女。")
				show("成交价达到了一个惊人的数额，但你只分到了一小部分。")
				gain({v_exp:4,s_exp:1,money:150},"客人")
			}else{
				if(status.v_lv>=3)
					show("你亲手张开阴部，向他们展示了你经验丰富的小穴。")
				else
					show("你亲手张开阴部，向他们展示了你几乎全新的小穴。")
				gain({e_exp:3,m_exp:2})
				pause()
				show("娼馆公开拍卖了你的初次接客。")
				show("成交价达到了一个可观的数额，但你只分到了一小部分。")
				gain({v_exp:4,s_exp:1,money:75},"客人")
			}
			gainflag("娼妇",1)
			prostitute_week=week
		},
		town:true,
		once:true,
		chance:function(){
			if("契约：娼妇" in buff) return prostitute_chance()*5
		}
	}
	ev["prostitute_dog"]={
		ev:function(){
			show("你前往娼馆工作。",true)
			show("武道家正以全裸的姿态在舞台上爬行，时不时朝着客人摇晃插在她肛门里的尾巴。")
			show("一个客人看中了她，牵起她项圈上的链子向着房间走去。",true)
			show("娼馆老板问你，听说许多女冒险者都在被俘时受到过母狗化的训练，不知道你是否有份。")
			show("你承认了自己被哥布林监禁的经历。",true)
			show("第二天的母狗表演变成了双人节目。")
			show("两条母狗互舔的样子看得客人们血脉贲张。")
			gain({v_exp:2,a_exp:2,o_exp:2,e_exp:2,u_exp:1,les_exp:3})
			show("",true)
			show("客人等不及将你带进房间，在舞台上当众插入了你湿淋淋的小穴。")
			gain({v_exp:3,s_exp:1,e_exp:3,p_exp:1,money:75},"客人")
			gainflag("娼妇",1)
			prostitute_week=week
		},
		town:true,
		once:true,
		chance:function(){
			if(past_event.includes("prostitute2") && "契约：娼妇" in buff && past_event.includes("goblin_prison")) return prostitute_chance()
		},
		start:2
	}
	ev["prostitute_magic"]={
		ev:function(){
			show("娼馆老板询问你是否认识手头拮据的女冒险者。")
			var v=getop("魔法师")
			if(check("wis",month+20-v)>=0){
				show("你觉得自己不能做这种带人进坑的事情。")
			}else{
				show("第二天，你介绍魔法师来娼馆工作。",true)
				if(op["魔法师"]>0){
					op["魔法师"].val-=10000
					show("魔法师退出了冒险者公会。")
					if("魔法师的恋人" in buff)
						gainbuff("魔法师的恋人",-10000)
				}
				pause()
				show("在魔法师首次卖春的当天，你有些困惑地收到了一笔分成。")
				gain({money:50})
				gainflag("娼妇",1)
				gainflag("娼妇魔法师")
			}
		},
		town:true,
		once:true,
		chance:function(){
			if("契约：娼妇" in buff && getflag("娼妇")>=5 && op["魔法师"]!=null && (status.wis<status.lewd/2)) return 0.5
		},
		start:4
	}
	ev["prostitute_trainer"]={
		ev:function(){
			show("你前往娼馆工作。",true)
			show("你被教官指名了。")
			show("教官一边批评着现在的女冒险者日益淫乱的问题，一边狠狠地冲撞着你的身体深处。")
			show("你哭着乞求他的原谅。",true)
			show("完事之后，他私下多塞给你一些钱，并劝你早点从娼馆脱身。")
			gain({b_exp:3,v_exp:5,p_exp:3,s_exp:2,money:80},"公会教官")
			gainflag("娼妇",1)
			prostitute_week=week
		},
		town:true,
		once:true,
		chance:function(){
			if("契约：娼妇" in buff && getop("教官")>=2) return prostitute_chance()
		},
		start:3
	}
	ev["prostitute_trainer2"]={
		ev:function(){
			show("你前往娼馆工作。",true)
			show("你被教官叫住。武道家和魔法师在里面垂首等候着。")
			show("“公会一届一届换了多少冒险者了，改过了吗？换汤不换药啊！”")
			show("“冒险者公会现在什么水平，就这么几个人，你"+status.name+"什么的都在卖春，你能出来卖吗？”")
			show("“再下去要输兽人了，输完兽人输史莱姆，输完史莱姆输哥布林，接着就没得输了。”",true)
			show("教官骂完之后愤愤不平地离开了。")
			prostitute_week=week
		},
		town:true,
		once:true,
		chance:function(){
			if("契约：娼妇" in buff && past_event.includes("prostitute_trainer") && past_event.includes("prostitute_dog")&& "娼妇魔法师"in flag) return prostitute_chance()
		},
		start:4
	}

	ev["prostitute3"]={
		ev:function(){
			show("你前往娼馆工作。",true)
			var ans=rand(5)
			if(ans==0){
				show("你温柔地侍奉着客人的肉棒。")
				gain({v_exp:3,o_exp:3,b_exp:3,s_exp:2,money:50},"客人")
			}else if(ans==1){
				show("客人激烈地干着你的小穴，直到你失去意识。")
				gain({v_exp:5,p_exp:3,s_exp:2,money:50},"客人")
			}else if(ans==2){
				show("客人在你身上使用了各种各样的调教工具。")
				gain({a_exp:3,p_exp:6,u_exp:3,money:50},"客人")
			}else if(ans==3){
				show("你穿着暴露的服装在街头为娼馆拉客，吸引了不少异样的目光。")
				gain({e_exp:5,money:50})
			}else{
				show("你为集体客提供了服务。")
				gain({v_exp:3,a_exp:3,o_exp:3,b_exp:3,s_exp:4,money:100},"客人")
			}
			gainflag("娼妇",1)
			prostitute_week=week
		},
		town:true,
		once:true,
		chance:function(){
			if("契约：娼妇" in buff) return prostitute_chance()*2
		}
	}

	ev["prostitute_quit"]={
		ev:function(){
			show("你前往娼馆提出赎身。")
			show("赎身的费用比卖身要更高，老板解释这是制作魔法契约的工本费。")
			gain({money:-250})
			show("老板建议你在走之前举办一次引退活动，感谢一下长期以来照顾自己生意的客人——同时也是最后再赚一笔。",true)
			show("引退活动当天，你的所有熟客都来了。活动最终变成了一次盛大的乱交派对。")
			gain({v_exp:10,a_exp:10,b_exp:10,o_exp:10,u_exp:5,p_exp:5,money:100})
			gainflag("娼妇",1)
			gainbuff("契约：娼妇",-10000)
			prostitute_week=week
		},
		town:true,
		once:true,
		chance:function(){
			if("契约：娼妇" in buff && status.money>=250 && past_event.includes("prostitute3")) return (status.money-250)/50
		}
	}

	ev["prostitute_return"]={
		ev:function(){
			show("最近你的手头有些拮据。")
			show("你意识到只有一个地方可以解决你的经济问题。",true)
			show("你来到娼馆，要求继续在这里工作。")
			show("娼馆老板为难地表示，你已经宣布引退了——他不喜欢假引退这种欺骗客人的行为。",true)
			if(check("wis",status.lewd/3+15)>=0){
				show("你不认为一个骗子会不喜欢欺骗。")
				show("你不知道他的话里还藏着多少陷阱，决定离开。")
			}else{
				show("为了证明自己这次回到娼馆里的决心，你签下了一份用一枚金币卖身的契约，赎身费用则是一个你不可能付得起的天文数字。")
				gain({money:1})
				gainbuff("契约：娼妇")
				show("但这只是对老板道歉，你还需要对客人道歉。")
				show("",true)
				show("娼馆公开拍卖了你回归后的初次接客——中拍者还会免费获得一个赠品：为你的屁股挑选一个纹身图案的权力。")
				show("成交价达到了一个可观的数额，但你一个铜子也没有拿到：毕竟这是对你的惩罚。")
				gain({v_exp:3,s_exp:1},"客人")
				pause()
				show("完事之后，客人在你的屁股上写下了娼妇的字样。")
				show("娼馆老板请来的纹身师施展魔力，将这个词永久固定在了你的屁股上。")
				gain({a_exp:2,p_exp:10})
				gainbuff("纹身：娼妇")
			}
		},
		town:true,
		once:true,
		chance:function(){
			if(!("契约：娼妇"in buff)&& ("负债"in buff) && (status.money<0) && prostitute_chance()>=1) prostitute_chance()/2
		}
	}
}

function prostitute_chance(){
	var ans=(week-prostitute_week)*0.2
	if(status.money<0)ans-=status.money/100
	ans=ans*(1+flag["娼妇"]*0.1)
	if("纹身：娼妇" in buff)ans=ans*1.3
	if(ans<0||ans==null)return 0
	return ans
}