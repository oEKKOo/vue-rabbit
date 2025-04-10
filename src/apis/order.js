/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/
import http from '@/utils/http'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

export const getUserOrder = (params) => {
    return http({
        url: '/member/order',
        method: 'GET',
        params
    }).catch(error => {
        if (error.response?.status === 401) {
            ElMessage.error('请先登录')
            // 可以在这里添加跳转到登录页的逻辑
            const router = useRouter()
            router.push('/login')
        }
        return Promise.reject(error)
    })
}
