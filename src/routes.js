export const routes = [
	{
		name: 'Dashboard',
		path: '/',
		meta: { title: 'Auditorias de Paginas' },
		component: () => import(/* webpackChunkName: "DashboardComponent" */ './components/DashboardComponent.vue'),
	},

	//Pagina 404
	{ path: '/:pathMatch(.*)*', name: 'NotFound', meta: { title: 'Pagina No Encontrada' }, component: () => import(/* webpackChunkName: "Error404Component" */ './components/Error404Component.vue') }
];