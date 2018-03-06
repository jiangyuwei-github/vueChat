const state = {
	footerflg:true, // 底部导航
	"bottomTag":"",
	"chatFlag":false,  //判断是否进入聊天列表
	"attendguest" : [   //所有用户列表
			{
				'name':"123",
				'pwd':"123",
				'company':"科技有限公司",
				'position':"设计师",
				"guestId":"123"
			},{
				'name':"234",
				'pwd':"234",
				'company':"互动有限公司",
				'position':"java",
				"guestId":"234"
			},{
				'name':"345",
				'pwd':"345",
				'company':"3D曲线有限公司",
				'position':"插画师",
				"guestId":"345"
			},{
				'name':"456",
				'pwd':"456",
				'company':"号城有限公司",
				'position':"编辑",
				"guestId":"456"
			}
	],
	"firend":[],   //好友
	"msgList":[],    //信息列表
	"unread":0,
	"dynamicList":[],
	"dynamicRandom":[3]
}

export default state