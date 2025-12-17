import { useParams } from "react-router-dom";

export default function GenrePage() {
  const { genreId } = useParams();  
  return <div>Genre Page: {genreId}</div>;
}
