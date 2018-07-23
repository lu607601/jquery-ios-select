### 参数配置
    
    * `class`
       设置类名: ''


    * `title[String]`
      设置标题，默认值：'请选择'

    #### 取消
    * `cancelTxt[String]`
      设置取消文案，默认值：'cancel',

    * `cancelClass[String]`
      设置取消按钮class, 默认值：'',

    * `cancel[Function]`
      设置点击取消的回调函数，默认值: null,

    #### 确认
    * `confirmTxt[String]`
      设置确认文案, 默认值：'confirm',

    * `confirmClass[String]`
      设置取消按钮class, 默认值：'',

    * `confirm[Function]`
       设置点击确认按钮的回调函数，默认值: null,

    #### 数据
    * `data[[Array]]`: 
       设置设置可供选择的数值,最多支持三级选择
       例子：
       [
           [{
               text: '水晶室女水晶室女水晶室女水晶室女水晶室女',
               id: 12
           }]
       ],

    #### 初始选择的默认值
    * `selectedIndex[Array]`
      设置初始选择的默认值
