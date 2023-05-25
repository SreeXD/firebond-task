import { useSelector, useDispatch } from 'react-redux'
import Variable from '../../components/Variable'
import { addVariable } from '../../store/slices/appSlice'
import style from './style.module.css'

function Variables() {
    const numVariables = useSelector(state => state.variables.length)
    const dispatch = useDispatch()

    return (
        <div className={style.variables}>
            {
                new Array(numVariables).fill(0).map((_, i) => <Variable key={i} index={i} />)
            }

            <button onClick={() => dispatch(addVariable())}>
                add variable
            </button>
        </div>
    )
}

export default Variables