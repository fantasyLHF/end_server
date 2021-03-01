export const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/Main'),
        children: [
            {//首页
                path: '',
                name: 'Home',
                component: () => import('../views/Home'),
            },
            {//类型列表
                path: 'typeList',
                name: 'TypeList',
                component: () => import('../views/TypeList'),
            },
            {//类型创建
                path: 'create',
                name: 'Create',
                component: () => import('../views/Create'),
            },
            {//商品列表
                path: 'shoplist',
                name: 'ShopList',
                component: () => import('../views/ShopList'),
            },
            {//发布新商品
                path: 'publicNew',
                name: 'PublicNew',
                component: () => import('../views/PublicNew'),
            },
            {//订单列表
                path: 'orderList',
                name: 'OrderList',
                component: () => import('../views/OrderList'),
            },
            {//商品销售统计
                path: 'shopSell',
                name: 'ShopSell',
                component: () => import('../views/ShopSell'),
            },
            {//用户设置
                path: 'setting',
                name: 'Setting',
                component: () => import('../views/Setting'),
            },

        ]
    },
    {//注册，登录
        path: '/ral',
        name: 'RAL',
        component: () => import('../views/RAL'),
        children: [
            {//登录
                path: '',
                name: 'Login',
                component: () => import('../views/Login')
            },
            {//注册
                path: 'register',
                name: 'Register',
                component: () => import('../views/Register')
            },
        ]
    },

]
