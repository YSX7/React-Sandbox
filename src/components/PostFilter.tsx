import { IFilter, IPost, SortValue } from "@/types/types";
import React, { FC } from "react";
import MyInput from "./UI/Input/MyInput";
import MySelect from "./UI/select/MySelect";

interface PostFilterProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

const PostFilter: FC<PostFilterProps> = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFilter({ ...filter, query: e.target.value })
        }
        placeholder="Поиск..."
      />
      <MySelect
        defaultValue="Сортировка"
        value={filter.sort}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFilter({ ...filter, sort: e.target.value as keyof IPost })
        }
      >
        <option value="title">По заголовку</option>
        <option value="body">По содержимому</option>
      </MySelect>
    </div>
  );
};

export default PostFilter;
