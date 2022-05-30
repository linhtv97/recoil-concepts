import {FC} from 'react'
import {useRecoilValue} from "recoil";
import {todoStatsState} from "./atoms/atoms";

type Props = {}
const TodoStats: FC<Props> = () => {

  const { done, total } = useRecoilValue(todoStatsState)
  return <div>
    {done} / {total}
  </div>
}
export default TodoStats
