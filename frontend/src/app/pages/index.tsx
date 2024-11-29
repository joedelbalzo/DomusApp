import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchProperties } from "../../store/propertySlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: properties, status: propertyStatus, error } = useAppSelector((state) => state.properties);

  useEffect(() => {
    if (propertyStatus == "idle") {
      dispatch(fetchProperties());
    }
  }, [propertyStatus, dispatch]);

  let content;
  if (propertyStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (propertyStatus === "succeeded") {
    content = (
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <h2>{property.name}</h2>
            <p>{property.description}</p>
          </li>
        ))}
      </ul>
    );
  } else if (propertyStatus === "failed") {
    content = <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Properties</h1>
      {content}
    </div>
  );
}
