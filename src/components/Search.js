import { useDispatch, useSelector } from "react-redux";
import { getGalleries, setSearchTerm } from "../store/galleries/slice";
import {
  selectSearchTerm,
  selectSearchUserId,
} from "../store/galleries/selectors";

export default function Search() {
  const dispatch = useDispatch();

  const term = useSelector(selectSearchTerm);

  const userId = useSelector(selectSearchUserId);

  function handleChangeSearchTerm(event) {
    dispatch(setSearchTerm(event.target.value));
  }

  function handleSearch() {
    dispatch(getGalleries({ page: 1, term: term, userId: userId }));
  }

  return (
    <div>
      <input
        type="text"
        onChange={handleChangeSearchTerm}
        placeholder="Search..."
      />
      <button class="btn btn-warning" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
