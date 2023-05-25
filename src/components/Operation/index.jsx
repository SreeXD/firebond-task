import { useSelector, useDispatch } from 'react-redux'
import { renderOperations } from '../../store/slices/appSlice'
import { color, toString } from '../../lib/Utility'
import style from './style.module.css'

function Operation({ node }) {
    const { variables } = useSelector(state => ({ 
        opTree: state.opTree, 
        variables: state.variables 
    }))

    const dispatch = useDispatch()

    const reset = <button className={style.reset} onClick={() => {
        node.reset()
        dispatch(renderOperations())
    }}>
        x
    </button>

    switch (node.type) {
        case 'constant': 
            var elem = <>                
                <button 
                    className={style.constant} 
                    style={{ 
                        backgroundColor: color(node.value),
                        cursor: 'pointer'
                    }} 
                    onClick={() => {
                        node.toggleValue()
                        dispatch(renderOperations())
                    }}
                >
                    {toString(node.value)}
                </button>

                {reset}
            </>

            break

        case 'variable': 
            var elem = <>
                <select onInput={(e) => {
                    node.setIndex(e.target.value)
                    dispatch(renderOperations())
                }}>
                    {
                        variables.map((variable, i) => (
                            <option key={i} value={i}>{variable.name}</option>
                        ))
                    }
                </select>

                <span 
                    className={style.constant} 
                    style={{ 
                        backgroundColor: color(node.value)
                    }} 
                >
                    {toString(node.value)}
                </span>

                {reset}
            </>

            break

        case 'and':
        case 'or':
            var elem = (
                <>
                    <div>
                        <span>{node.type}</span>

                        <span 
                            className={style.constant} 
                            style={{ 
                                backgroundColor: color(node.value)
                            }} 
                        >
                            {toString(node.value)}
                        </span>
                        
                        {reset}
                    </div>

                    {
                        node.children.map((child, i) => (
                            <Operation key={i} node={child} />
                        ))
                    }

                    <button onClick={() => {
                        node.add()
                        dispatch(renderOperations())
                    }}>
                        add operation
                    </button>
                </>
            )

            break

        default:
            var elem = (
                <select 
                    value='select'
                    onInput={(e) => {
                        node.set(e.target.value)
                        dispatch(renderOperations())
                    }}
                >
                    <option value='select' disabled>select</option>
                    <option value='constant'>constant</option>
                    <option value='variable'>variable</option>
                    <option value='or'>or</option>
                    <option value='and'>and</option>
                </select>
            )

            break
    }

    return (
        <div className={style.operation}>
            {elem}
        </div>
    )
}

export default Operation