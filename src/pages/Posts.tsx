import React, { useEffect, useRef, useState } from "react";
import PostService from "@/API/PostService";
import PostFilter from "@/components/PostFilter";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/button/MyButton";
import MyModal from "@/components/UI/modal/MyModal";
import Pagination from "@/components/UI/pagination/Pagination";
import Spinner from "@/components/UI/spinner/spinner";
import { useFetching } from "@/hooks/useFetching";
import { usePosts } from "@/hooks/usePosts";
import { getPageCount } from "@/utils/pages";
import { useObserver } from "@/hooks/useObserver";
import MySelect from "@/components/UI/select/MySelect";
import { IFilter, IPost, SortValue } from "@/types/types";
import ChakraModal from "@/components/UI/chakraModal/ChakraModal";
import { useDisclosure } from "@chakra-ui/react";

const countOptions = [
  { value: 5, name: "5" },
  { value: 10, name: "10" },
  { value: 25, name: "25" },
  { value: -1, name: "Все" },
];

function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    sort: "" as keyof IPost,
    query: "",
  });
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<boolean>(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = React.useRef<any>();

  const [fetchCallback, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = parseInt(response.headers["x-total-count"]);
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchCallback();
  }, [page, limit]);

  const createPost = (newPost: IPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
    setTotalPages(page + 1);
  };

  const removePost = (post: IPost) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <ChakraModal cancelRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <PostForm create={createPost} />
      </ChakraModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setLimit(parseInt(e.target.value))
        }
        defaultValue="Кол-во элементов на странице"
      >
        {countOptions.map((elem) => (
          <option value={elem.value}>{elem.name}</option>
        ))}
      </MySelect>
      <MyButton style={{ marginTop: "10px" }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyButton style={{ marginTop: "10px" }} onClick={onOpen}>
        Создать пост (Chakra)
      </MyButton>
      {postError && <h1>Произошла ошибка: {postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Список постов 1"
      />
      <div ref={lastElement} style={{ height: 20 }} />
      {isPostsLoading && <Spinner />}
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  );
}

export default Posts;
