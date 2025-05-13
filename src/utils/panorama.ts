// 文件路径：src/api/panorama.ts
import request from '@/utils/request'
import type { AxiosResponse } from 'axios'

/** 全景图列表项类型 */
export interface Panorama {
    id: number
    title: string
    description: string
    imagePath: string
    createdAt: string
}

/**
 * 获取全景图列表
 * 接口：GET /api/panorama/list
 */
export const fetchPanoramaList = (): Promise<AxiosResponse<Panorama[]>> => {
    return request.get<Panorama[]>('/panorama/list')  // :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
}

/**
 * 删除指定全景图
 * 接口：DELETE /api/panorama/delete/{id}
 */
export const removePanorama = (id: number): Promise<AxiosResponse<void>> => {
    return request.delete<void>(`/panorama/delete/${id}`)  // :contentReference[oaicite:2]{index=2}:contentReference[oaicite:3]{index=3}
}
