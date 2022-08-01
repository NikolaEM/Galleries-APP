import HttpService from "./HttpService";
class GalleryService extends HttpService {
  getGalleries = async (page = 0, term = "", userId = "") => {
    let endpoint = `/galleries/?page=${page}`;
    if (term) {
      endpoint += `&term=${term}`;
    }
    if (userId) {
      endpoint += `&userId=${userId}`;
    }
    const { data } = await this.client.get(endpoint);
    return data;
  };
  getGallery = async (id) => {
    const { data } = await this.client.get(`/galleries/${id}`);
    return data;
  };
  createGallery = async (galleryData) => {
    const { data } = await this.client.post("/galleries", galleryData);
    return data;
  };
  deleteGallery = async (gallery) => {
    const { data } = await this.client.delete(`/galleries/${gallery}`);
    return data;
  };
  editGallery = async (galleryId, gallery) => {
    const { data } = await this.client.put(`/galleries/${galleryId}`, gallery);
    return data;
  };
  createComment = async (comment, galleryId) => {
    const { data } = await this.client.post(
      `/galleries/${galleryId}/comments`,
      comment
    );
    return data;
  };
  deleteComment = async (comment) => {
    console.log(comment);
    const { data } = await this.client.delete(`/comments/${comment}`);
    return data;
  };
}
const galleryService = new GalleryService();
export default galleryService;
