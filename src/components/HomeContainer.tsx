import { useState, useEffect } from "react";
import type { PostType } from "../types/post";
import Card from "./Card";
import FormField from "./FormField";
import Loader from "./Loader";

const HomeContainer = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]); // or whatever type you need
  const [searchText, setSearchText] = useState<string>("abc");

  useEffect(() => {
    setLoading(false);
  }, []);

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
        <FormField />
      </div>
      <div className="mt-10">
        {loading ? (
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
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {searchText ? (
          <RenderCards data={posts} errorMessage="No results found" />
        ) : (
          <RenderCards data={posts} errorMessage="No results found" />
        )}
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
          return <Card key={item._id} {...item} />;
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
