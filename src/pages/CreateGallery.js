import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGallery } from "../store/galleries/selectors";
import { createGallery, editGallery } from "../store/galleries/slice";

export default function CreateGallery() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const retrievedGallery = useSelector(selectGallery);

  const [newGallery, setNewGallery] = useState({
    title: "",
    description: "",
    images: [{ url: "" }],
  });

  function handleActionSuccessEdit() {
    history.push(`/galleries/${retrievedGallery.id}`);
  }

  function handleActionSuccessAdd() {
    history.push("/galleries/me");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      if (!retrievedGallery) {
        alert("You can edit only your own gallery");
        history.push("/galleries");
        return;
      }
      dispatch(
        editGallery({
          id,
          gallery: newGallery,
          meta: {
            onSuccess: handleActionSuccessEdit,
          },
        })
      );
    } else {
      dispatch(
        createGallery({
          gallery: newGallery,
          meta: {
            onSuccess: handleActionSuccessAdd,
          },
        })
      );
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (id) {
      history.push(`/galleries/${retrievedGallery.id}`);
    } else {
      history.push("/galleries/me");
    }
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...newGallery.images];
    list[index].url = value;
    setNewGallery({
      ...newGallery,
      images: list,
    });
  };

  const handleAddClick = () => {
    setNewGallery({
      ...newGallery,
      images: [...newGallery.images, { url: "" }],
    });
  };

  useEffect(() => {
    if (id) {
      setNewGallery(retrievedGallery);
      if (!retrievedGallery) {
        alert("You can edit only your own gallery");
        history.push("/galleries");
        return;
      }
    }
  }, [id, history, retrievedGallery]);

  const handleRemoveClick = (index) => {
    setNewGallery({
      ...newGallery,
      images: newGallery.images.filter((i) => index !== i),
    });
  };

  const reorderArray = (event, originalArray) => {
    const movedItem = originalArray.find(
      (i, index) => index === event.oldIndex
    );
    const remainingItems = originalArray.filter(
      (i, index) => index !== event.oldIndex
    );

    const reorderedItems = [
      ...remainingItems.slice(0, event.newIndex),
      movedItem,
      ...remainingItems.slice(event.newIndex),
    ];

    return reorderedItems;
  };

  function changeOrder(index, direction) {
    var updatedImages = [...newGallery.images];
    setNewGallery({
      ...newGallery,
      images: reorderArray(
        { oldIndex: index, newIndex: index + (direction === "UP" ? -1 : 1) },
        updatedImages
      ),
    });
  }

  return (
    <div>
      <h2
        style={{
          color: "black",
          backgroundColor: "DodgerBlue",
          padding: "10px",
          marginBottom: "50px",
        }}
      >
        {id ? "Edit Gallery" : "Create Gallery"}
      </h2>
      <form class="justify-content-center" onSubmit={handleSubmit}>
        <br />
        <div class="form-group">
          <input
            class="form-control"
            aria-describedby="emailHelp"
            required
            type="text"
            id="title"
            placeholder="Title"
            value={newGallery?.title}
            onChange={({ target }) =>
              setNewGallery({ ...newGallery, title: target.value })
            }
          />

          <textarea
            class="form-control"
            cols="50"
            rows="4"
            type="text"
            id="description"
            placeholder="Description"
            value={newGallery?.description}
            onChange={({ target }) =>
              setNewGallery({ ...newGallery, description: target.value })
            }
          />

          {newGallery.images &&
            newGallery.images.map((x, i) => {
              return (
                <div>
                  <input
                    required
                    key={i}
                    name="url"
                    value={x.url}
                    placeholder="Image url"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <span>
                    {newGallery.images.length > 1 && (
                      <button onClick={() => handleRemoveClick(i)}>
                        Remove
                      </button>
                    )}
                  </span>
                  <span>
                    {newGallery.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => changeOrder(i, "UP")}
                      >
                        Move Up
                      </button>
                    )}
                  </span>
                  <span>
                    {newGallery.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => changeOrder(i, "DOWN")}
                      >
                        Move Down
                      </button>
                    )}
                  </span>
                  <div>
                    {newGallery.images.length - 1 === i && (
                      <button onClick={handleAddClick}>Add picture</button>
                    )}
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <button class="btn btn-primary" onClick={handleCancel}>
            Cancel
          </button>
          <button class="btn btn-primary" type="submit">
            {id ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
