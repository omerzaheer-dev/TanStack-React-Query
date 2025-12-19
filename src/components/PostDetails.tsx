import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams();
  console.log(postId);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => {
      return axios.get(`http://localhost:4000/posts/${postId}`);
    },
    select: (res) => res?.data,
  });
  console.log("data", data);
  if (isError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-500/10 border-2 border-red-500 rounded-xl p-8 max-w-md backdrop-blur-sm">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-500 rounded-full p-3">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-red-400 text-center mb-2">
            Error
          </h2>
          <p className="text-gray-300 text-center">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
          <p className="mt-4 text-xl text-gray-300 font-semibold">
            Loading posts...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center gap-3 ">
        <p className="mt-4 text-6xl pb-5 text-gray-300 font-extrabold">
          {data.title}
        </p>
        <p className="mt-4 text-2xl text-gray-300 font-semibold">{data.body}</p>
      </div>
    </div>
  );
}

export default PostDetails;
