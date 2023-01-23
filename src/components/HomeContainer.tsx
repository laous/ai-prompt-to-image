import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import type { PostType } from "../types/post";
import { api } from "../utils/api";
import Card from "./Card";
import Loader from "./Loader";

const HomeContainer = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedResults, setSearchedResults] = useState<PostType[]>([]);
  const { isLoading, data } = api.post.getAllPosts.useQuery();

  useEffect(() => {
    if (data) {
      setPosts(data);
      // console.log("data", data);
    }
  }, [isLoading, data]);

  const handleSearchChange = (e: FormEvent) => {
    const target = e?.target as HTMLInputElement;
    setSearchText(target?.value);

    const searchResult = posts.filter((item) =>
      item.prompt.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchedResults(searchResult);
  };

  return (
    <section className="mx-auto max-w-7xl ">
      <div>
        <h1 className="text-[32px] font-extrabold text-[#222328]">
          The Community Showcase
        </h1>
        <p className="mt-2 max-w-[500px] text-[16px] text-[#666e75]">
          Browse through a collection of imaginative and visually stunning
          images.
        </p>
      </div>
      <div className="mt-16">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label
              htmlFor="search-query"
              className="block text-sm font-medium text-gray-900"
            >
              Search posts
            </label>
          </div>
          <input
            type="text"
            id="search-query"
            name="search-query"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-[#6469ff] focus:ring-[#6469ff]"
            placeholder="Search something.."
            value={searchText}
            onChange={handleSearchChange}
            required
          />
        </div>
      </div>
      <div className="mt-10">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="mb-3 text-xl font-medium text-[#666e45]">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-4">
        {!isLoading &&
          (searchText ? (
            <RenderCards
              data={searchedResults}
              errorMessage="No results found"
            />
          ) : (
            <RenderCards data={posts} errorMessage="No results found" />
          ))}
      </div>
    </section>
  );
};
export default HomeContainer;

const RenderCards = ({
  data,
  errorMessage,
}: {
  data: PostType[];
  errorMessage: string;
}) => {
  if (data?.length > 0) {
    return (
      <>
        {data.map((item) => {
          return <Card key={item.id} {...item} />;
        })}
      </>
    );
  }
  return (
    <h2 className="mt-5 text-xl font-bold uppercase text-[#6449ff]">
      {errorMessage}
    </h2>
  );
};
