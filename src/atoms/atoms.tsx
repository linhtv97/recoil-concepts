import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilState,
} from "recoil";
import { FilterTodoCondition, Todo } from "./contracts";
import { PostType } from "../Post";
import React from "react";
import _ from "lodash";

export const todoState = atom<Todo[]>({
  key: "todos",
  default: [
    {
      id: 1,
      name: "Learn React",
      done: true,
    },
    {
      id: 2,
      name: "Learn Recoil",
      done: false,
    },
    {
      id: 3,
      name: "Fix the bug",
      done: false,
    },
    {
      id: 4,
      name: "Fux the big",
      done: true,
    },
  ],
});

export const conditionState = atom<FilterTodoCondition>({
  key: "todos.condition",
  default: {
    keyword: "F",
    done: false,
  },
});

export const filteredTodoState = selector<Todo[]>({
  key: "todos.filtered",
  get: ({ get }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const todos = get(todoState);
        const condition = get(conditionState);

        return resolve(
          todos
            .filter(({ name }) => {
              if (condition.keyword) {
                return name.includes(condition.keyword);
              }

              return true;
            })
            .filter(({ done }) => {
              if (condition.done !== undefined) {
                return done === condition.done;
              }

              return true;
            })
        );
      }, 1000);
    });
  },
});

export const todoStatsState = selector<{
  done: number;
  total: number;
}>({
  key: "todos.stats",
  get: ({ get }) => {
    const todos = get(filteredTodoState);
    return {
      done: todos.reduce((done, todo) => done + (todo.done ? 1 : 0), 0),
      total: todos.length,
    };
  },
});

export const postListState = atom<PostType[]>({
  key: "posts",
  default: [
    {
      id: 1,
      title: "Post 1",
    },
    {
      id: 2,
      title: "Post 2",
    },
    {
      id: 3,
      title: "Post 3",
    },
  ],
});

export const selectedPostIdState = atom<number | null>({
  key: "posts.selectedId",
  default: null,
});

export const selectedPostState = selectorFamily({
  key: "posts.selected",
  get:
    () =>
    ({ get }) => {
      const selectedPostId = get(selectedPostIdState);
      const posts = get(postListState);

      return posts.find((post) => post.id === selectedPostId);
    },
  set:
    () =>
    ({ set, get }, updatedPost) => {
      set(postListState, (prevPost) => {
        const newPost = _.clone(prevPost),
          newPostIndex = newPost.findIndex(
            (post) => post.id === (updatedPost as PostType).id
          );

        newPost.splice(newPostIndex, 1, updatedPost as PostType);
        return [...newPost];
      });
    },
});
