import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/app',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'information',
          component: () => import('@/views/Information.vue'),
        },
        {
          path: 'employee-form',
          name: 'employee',
          component: () => import('@/views/Employee.vue'),
        },
        {
          path: 'validation',
          name: 'validation',
          component: () => import('@/views/Validation.vue'),
          children: [
            {
              path: '',
              name: 'leave-validation',
              component: () => import('@/views/validation/ValidationLeave.vue'),
            },
            {
              path: 'authorization',
              name: 'authorization-validation',
              component: () => import('@/views/validation/ValidationAuthorization.vue'),
            },
            {
              path: 'permission',
              name: 'permission-validation',
              component: () => import('@/views/validation/ValidationPermission.vue'),
            },
          ],
        },
        {
          path: 'request',
          name: 'request',
          component: () => import('@/views/Request.vue'),
          children: [
            {
              path: '',
              name: 'leave-request',
              component: () => import('@/views/request/RequestLeave.vue'),
            },
            {
              path: 'authorization',
              name: 'authorization-request',
              component: () => import('@/views/request/RequestAuthorization.vue'),
            },
            {
              path: 'permission',
              name: 'permission-request',
              component: () => import('@/views/request/RequestPermission.vue'),
            },
          ],
        },
        {
          path: 'meeting',
          children: [
            {
              path: '',
              name: 'meeting',
              component: () => import('@/views/Meeting.vue'),
            },
          ],
        },
        {
          path: 'mission',
          children: [
            {
              path: '',
              name: 'mission',
              component: () => import('@/views/Mission.vue'),
            },
          ],
        },
        {
          path: 'telework',
          children: [
            {
              path: '',
              name: 'telework',
              component: () => import('@/views/Telework.vue'),
            },
          ],
        },
        {
          path: 'planning',
          name: 'planning',
          component: () => import('@/views/Planning.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  const matricule = localStorage.getItem('matricule')
  const isAuthenticated = Boolean(matricule)
  const isLoginRoute = to.path === '/'

  if (!isAuthenticated && !isLoginRoute) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (isAuthenticated && isLoginRoute) {
    return { name: 'information' }
  }

  return true
})

export default router
