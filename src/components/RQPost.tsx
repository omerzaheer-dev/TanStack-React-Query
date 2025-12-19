import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

function RQPost() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    select: (res) => res?.data,
    // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,  //in another tab if switch it is true polling continies otherwise it stops
    enabled: false, //any time component mounts this api cal is not made by adding this
  });

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
  console.log("Loading", isLoading, "isFetching", isFetching);

  if (posts) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Blog Posts
          </h1>

          <div className="space-y-6">
            {posts.map((post: { id: number; title: string; body: string }) => (
              <Link to={`/rq-post/${post.id}`}>
                <div
                  key={post.id}
                  className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-linear-to-br from-cyan-500 to-purple-500 rounded-lg p-3 flex-shrink-0">
                      <span className="text-white font-bold text-xl">
                        {post.id}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-300 leading-relaxed">
                        {post.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl">No posts available</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      abc {"  "} <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
}

export default RQPost;
