import {FC} from 'react'
import {useRecoilState} from "recoil";
import {conditionState} from "./atoms/atoms";

type Props = {}
const TodoFilterCondition: FC<Props> = () => {
  const [condition, setCondition] = useRecoilState(conditionState)

  return <form>
    <input type="text" name='keyword' onChange={({ target: { value: keyword }}) => {
      setCondition(condition => ({
        ...condition,
        keyword
      }))
    }} value={condition.keyword || ''}/>
    <input type="checkbox" name='done' onChange={({ target: { checked: done }}) => {
      setCondition(condition => ({
        ...condition,
        done
      }))
    }} checked={condition.done}/>
  </form>
}
export default TodoFilterCondition
