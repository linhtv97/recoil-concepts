import {FC} from 'react'
import {useRecoilValue} from "recoil";
import {filteredTodoState} from "./atoms/atoms";

type Props = {}

const TodoList: FC<Props> = () => {
  const todos = useRecoilValue(filteredTodoState)

  return <div>
    <ul>
      {todos.map(todo => {
        return (<li key={todo.id}>{todo.name} - {todo.done.toString()}</li>)
      })}
    </ul>
  </div>
}
export default TodoList
