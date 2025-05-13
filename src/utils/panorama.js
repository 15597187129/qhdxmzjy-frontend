// 文件路径：src/api/panorama.ts
import request from '@/utils/request';
/**
 * 获取全景图列表
 * 接口：GET /api/panorama/list
 */
export const fetchPanoramaList = () => {
    return request.get('/panorama/list'); // :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
};
/**
 * 删除指定全景图
 * 接口：DELETE /api/panorama/delete/{id}
 */
export const removePanorama = (id) => {
    return request.delete(`/panorama/delete/${id}`); // :contentReference[oaicite:2]{index=2}:contentReference[oaicite:3]{index=3}
};
