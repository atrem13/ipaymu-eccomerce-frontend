import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/product/',
        name: 'product.index',
        component: () => import('@/views/product/Index.vue')
    },
    {
        path: '/product/create',
        name: 'product.create',
        component: () => import('@/views/product/Create.vue')
    },
    {
        path: '/product/edit/:id',
        name: 'product.edit',
        component: () => import('@/views/product/Edit.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes  
})

export default router
