import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Fruit {
  id: number;
  name: string;
}

interface FruitsResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Fruit[];
}

const PER_PAGE = 4;

const fetchFruits = ({ pageParam }: { pageParam: number }) => {
  return axios.get<FruitsResponse>(
    `http://localhost:4000/fruits?_page=${pageParam}&_per_page=${PER_PAGE}`
  );
};

export default function Pagination() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Return the next page number if it exists, otherwise undefined
      return lastPage.data.next ?? undefined;
    },
    select: (res) => ({
      pages: res.pages,
      pageParams: res.pageParams,
      // Flatten all pages into a single array
      fruits: res.pages.flatMap((page) => page.data.data),
    }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading fruits</p>;

  return (
    <div style={{ maxWidth: 400 }}>
      {/* List */}
      <ul>
        {data.fruits.map((fruit) => (
          <li key={fruit.id}>{fruit.name}</li>
        ))}
      </ul>

      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading..." : "Next"}
      </button>
    </div>
  );
}
