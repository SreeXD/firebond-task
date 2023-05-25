import { createSlice } from '@reduxjs/toolkit'
import OperationTree from '../../lib/OperationTree'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        variables: [{
            name: 'var1',
            value: false
        }],
        
        opTree: new OperationTree()
    },
    reducers: {
        addVariable: (state) => {
            state.variables.push({ 
                name: 'var' + (state.variables.length + 1),
                value: false
            })
        },

        toggleVariable: (state, { payload: index }) => {
            state.variables[index].value = !state.variables[index].value
        },

        renameVariable: (state, { payload }) => {
            const { index, name } = payload 
            state.variables[index].name = name
        },

        renderOperations: (state) => {
            state.opTree = state.opTree.clone()
        }
    }
})

export const { addVariable, toggleVariable, renameVariable, renderOperations } = appSlice.actions

export default appSlice