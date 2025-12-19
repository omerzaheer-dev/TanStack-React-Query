import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Fruit {
  id: number;
  name: string;
}

interface ApiResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Fruit[];
}

const PER_PAGE = 4;

const fetchFruits = async (page: number): Promise<ApiResponse> => {
  const res = await axios.get(
    `http://localhost:4000/fruits?_page=${page}&_per_page=${PER_PAGE}`
  );
  return res.data;
};

export default function Pagination() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading fruits</p>;

  return (
    <div style={{ maxWidth: 400 }}>
      {/* List */}
      <ul>
        {data.data.map((fruit) => (
          <li key={fruit.id}>{fruit.name}</li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          disabled={page === data.first}
          onClick={() => setPage(data.first)}
        >
          First
        </button>

        <button disabled={!data.prev} onClick={() => setPage(data.prev!)}>
          Prev
        </button>

        <span>
          Page {page} of {data.pages}
        </span>

        <button disabled={!data.next} onClick={() => setPage(data.next!)}>
          Next
        </button>

        <button
          disabled={page === data.last}
          onClick={() => setPage(data.last)}
        >
          Last
        </button>
      </div>
    </div>
  );
}
