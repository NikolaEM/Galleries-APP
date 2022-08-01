import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getGalleries: () => {},
  getGallery: () => {},
  createGallery: () => {},
  editGallery: () => {},
  deleteGallery: () => {},
  createComment: () => {},
  deleteComment: () => {},
};

const galleriesSlice = createSlice({
  name: "galleries",
  initialState: {
    gallery: null,
    term: null,
    userId: null,
    createErrors: null,
    page: {
      data: [],
      current_page: 0,
      last_page: 0,
    },
  },
  reducers: {
    setGalleries: (state, action) => {
      state.page = action.payload;
    },
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
    setSearchTerm(state, action) {
      state.term = action.payload;
    },
    setSearchUserId(state, action) {
      state.userId = action.payload;
    },
    setPaginatedGalleries(state, action) {
      state.page.data = [...state.page.data, ...action.payload.data];
      state.page.current_page = action.payload.current_page;
    },
    setGalleryWithNewComment(state, action) {
      state.gallery = {
        ...state.gallery,
        comments: [...state.gallery.comments, action.payload],
      };
    },
    setGalleryWithoutComment(state, action) {
      state.gallery = action.gallery;
    },
    setCreateErrors(state, action) {
      state.createErrors = action.payload;
    },

    ...middlewareActions,
  },
});

export const {
  getGalleries,
  getGallery,
  setGalleries,
  setGallery,
  createGallery,
  editGallery,
  deleteGallery,
  setSearchTerm,
  setSearchUserId,
  setPaginatedGalleries,
  createComment,
  deleteComment,
  setGalleryWithNewComment,
  setGalleryWithoutComment,
  setCreateErrors,
} = galleriesSlice.actions;
export default galleriesSlice.reducer;
