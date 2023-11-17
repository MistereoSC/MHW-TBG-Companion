import {createRouter, createWebHistory} from 'vue-router'
import HuntHelper from '@/views/HuntHelper.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: {name: 'hunt'},
		},
		{
			path: '/campaign',
			name: 'campaign',
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/hunt',
			name: 'hunt',
			component: HuntHelper,
		},
		{
			path: '/weapons',
			name: 'weapons',
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/armors',
			name: 'armors',
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/monsters',
			name: 'monsters',
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/quests',
			name: 'quests',
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/arenas',
			name: 'arenas',
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('../views/AboutView.vue'),
		},
	],
})

export default router
