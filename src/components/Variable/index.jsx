import { useDispatch, useSelector } from 'react-redux'
import { toggleVariable, renameVariable, renderOperations } from '../../store/slices/appSlice'
import { color } from '../../lib/Utility'
import style from './style.module.css'

function Variable({ index }) {
    const { data, opTree } = useSelector(state => ({
        data: state.variables[index],
        opTree: state.opTree
    }))

    const dispatch = useDispatch()

    return (
        <div>
            <input 
                onInput={(e) => dispatch(renameVariable({ index, name: e.target.value }))} 
                value={data.name} 
            />

            <button 
                className={style.variableValue} 
                style={{ 
                    backgroundColor: color(data.value),
                    cursor: 'pointer'
                }} 
                onClick={() => {
                    dispatch(toggleVariable(index))
                    opTree.root.evaluateDown()
                    dispatch(renderOperations())
                }}
            >
                {data.value.toString()}
            </button>
        </div>
    )
}

export default Variable