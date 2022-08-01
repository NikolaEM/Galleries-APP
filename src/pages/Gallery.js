import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGallery,
  deleteGallery,
  createComment,
  deleteComment,
} from "../store/galleries/slice";
import { selectGallery } from "../store/galleries/selectors";
import useFormattedDate from "../hooks/useFormattedDate";
import {
  selectIsAuthenticated,
  selectActiveUser,
} from "../store/auth/selectors";
import { format } from "date-fns";
import { Carousel } from "react-bootstrap";

export default function Gallery() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gallery = useSelector(selectGallery);
  const formattedDate = useFormattedDate(
    gallery ? gallery.created_at : "",
    "dd-MM-yyyy HH:mm"
  );
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const history = useHistory();
  const [newComment, setNewComment] = useState({ content: "" });

  useEffect(() => {
    dispatch(getGallery(id));
  }, [id, dispatch]);

  const handleContentChange = (e) => {
    setNewComment({ ...newComment, content: e.target.value });
  };

  const handleAddNewComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ content: newComment, galleryId: id }));
    setNewComment({ content: "" });
  };

  const handleDeleteComment = (id) => {
    const response = prompt(
      "Are you sure you want to delete your comment? If so, type 'yes' "
    );
    if (response !== "yes") {
      return;
    }
    dispatch(deleteComment(id));
    setTimeout(() => {
      history.go(0);
    }, 500);
  };

  const handleDeleteGallery = () => {
    const response = prompt(
      "Are you sure you want to delete your gallery? If so, type 'yes' "
    );
    if (response !== "yes") {
      return;
    }
    dispatch(deleteGallery(id));
    setTimeout(() => {
      history.push("/galleries/me");
    }, 500);
  };

  return (
    <div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          border: "solid",
          margin: "5px",
          fontSize: "10px",
          backgroundColor: "Gainsboro",
          boxSizing: "border-box",
        }}
      >
        {gallery ? (
          <>
            <h1 style={{ padding: "10px" }}>{gallery?.title}</h1>

            <h3 style={{ padding: "10px", color: "red" }}>
              By:{" "}
              <Link
                to={`/authors/${gallery?.user?.id}`}
                style={{ color: "red", textDecoration: "none" }}
              >
                {gallery?.user?.first_name} {gallery?.user?.last_name}
              </Link>
            </h3>

            {formattedDate === "unknown" ? (
              <div style={{ padding: "10px" }}>Unknown date</div>
            ) : (
              <div style={{ padding: "10px" }}>Created at: {formattedDate}</div>
            )}

            <div>
              <Carousel>
                {gallery.images && gallery.images.length
                  ? gallery.images.map((image, index) => (
                      <Carousel.Item key={image.id} interval={10000}>
                        <a
                          key={index}
                          rel="noreferrer"
                          target="_blank"
                          href={image.url}
                        >
                          <img
                            className="d-block w-100"
                            key={image.id}
                            src={image.url}
                            alt="Gallery carousel element"
                          />
                        </a>
                      </Carousel.Item>
                    ))
                  : "No images found"}
              </Carousel>
            </div>
            <div>
              {gallery && gallery.description ? (
                <p
                  style={{
                    fontSize: 18,
                  }}
                >
                  {gallery.description}
                </p>
              ) : (
                <p>No Descripton</p>
              )}
            </div>
            {activeUser && activeUser.id === gallery.user_id ? (
              <Link
                style={{
                  color: "white",
                  backgroundColor: "#5D6D7E ",
                  padding: "10px 20px",
                  textDecoration: "none",
                  border: "2px solid black",
                  borderRadius: "5px",
                }}
                to={`/edit-gallery/${gallery.id}`}
              >
                Edit Gallery
              </Link>
            ) : (
              <></>
            )}
            {activeUser && activeUser.id === gallery.user_id ? (
              <button class="btn btn-secondary" onClick={handleDeleteGallery}>
                Delete gallery
              </button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div>
        {gallery && gallery.comments ? (
          <>
            {gallery.comments.length ? <h4>Comments</h4> : <h4>No Comments</h4>}
            <ul style={{ listStyleType: "none" }}>
              {gallery.comments.map((comment) => (
                <li key={comment.id} id={`comment${comment.id}`}>
                  <div>
                    {comment.user.first_name} {comment.user.last_name}
                  </div>
                  <div>
                    {format(new Date(comment.created_at), "dd-MM-yyyy HH:mm")}
                  </div>
                  <p>{comment.content}</p>
                  {activeUser && activeUser.id === comment.user.id ? (
                    <button
                      class="btn btn-secondary"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete Comment
                    </button>
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}

        {isAuthenticated && (
          <form onSubmit={handleAddNewComment} class="justify-content-center">
            <textarea
              required
              rows="3"
              cols="40"
              onChange={handleContentChange}
              value={newComment.content}
              placeholder="Something to say?"
            />
            <button class="btn btn-secondary">Submit!</button>
          </form>
        )}
      </div>
    </div>
  );
}
