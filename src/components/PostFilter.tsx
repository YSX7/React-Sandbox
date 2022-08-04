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
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Поиск..."
      />
      <MySelect
        defaultValue="Сортировка"
        options={[
          { value: "title", name: "По заголовку" },
          { value: "body", name: "По содержимому" },
        ]}
        value={filter.sort}
        onChange={(selectedSort: SortValue) =>
          setFilter({ ...filter, sort: selectedSort as keyof IPost })
        }
      ></MySelect>
    </div>
  );
};

export default PostFilter;
