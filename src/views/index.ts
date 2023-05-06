import type { RouteComponent } from 'vue-router'

export const views: Record<
	PageRoute.LastDegreeRouteKey,
	RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
	403: () => import('./_builtin/403'),
	404: () => import('./_builtin/404'),
	500: () => import('./_builtin/500'),
	login: () => import('./_builtin/login'),
	'not-found': () => import('./_builtin/not-found'),
	dashboard_analysis: () => import('./dashboard/analysis'),
	dashboard_workbench: () => import('./dashboard/workbench')
}
