module.exports = {
    // 网站标题
    title: '长方体移动工程师',
    base: '/blog/',
    // 网站描述
    description: '长方体移动工程师',
    appearance: true,
    ignoreDeadLinks: true,
    lang: 'en-CN',
    lastUpdated: true,
    // 打包目录
    dest: './dist',
    head: [
        // 添加图标
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    markdown: {
        theme: 'material-palenight',
        lineNumbers: true
      },
    themeConfig: {
        // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
        // lastUpdated: 'Last Updated', // string | boolean
        // 启动页面丝滑滚动
        smoothScroll: true,
        // 右边侧栏
        // 导航栏配置
        nav:[
            {text: 'ES', link: '/es/' },
            {text: 'CSS', link: '/css/'},
            {text: 'TypeScript', link: '/TypeScript/'}
        ],
        sidebar:{
            '/es/':[
                {
                    text:'es',
                    collapsible: true,
                    collapsed: false,
                    items:[
                        {text:'数据类型',link: '/es/'},
                        {text:'let&var&const',link: '/es/modified.md'},
                        {text:'函数&this',link: '/es/func.md'},
                        {text:'修改this指向',link: '/es/modifyThis.md'}
                    ]
                }
                
            ]
        }
    }
    
}
