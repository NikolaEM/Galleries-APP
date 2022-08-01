import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";

export default function GalleryRow({ gallery }) {
  const formattedDate = useFormattedDate(
    gallery.created_at,
    "dd-MM-yyyy HH:mm"
  );

  return (
    <div>
      {gallery ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "solid",
            margin: "5px",
            width: "100%",
            justifyContent: "start",
          }}
        >
          <div>
            <img
              src={gallery?.images[0]?.url}
              width="500"
              height="300"
              alt="Gallery cover"
            />
          </div>
          <div>
            <Link
              style={{
                textDecoration: "none",
                fontSize: 28,
              }}
              to={`/galleries/${gallery?.id}`}
            >
              {gallery?.title}
            </Link>
          </div>

          {formattedDate === "unknown" ? (
            <div>Unknown date</div>
          ) : (
            <div>Created at: {formattedDate}</div>
          )}

          <div>
            By:{" "}
            <Link
              style={{
                textDecoration: "none",
                fontSize: 18,
              }}
              to={`/authors/${gallery?.user.id}`}
            >
              {gallery?.user?.first_name} {gallery?.user?.last_name}
            </Link>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
