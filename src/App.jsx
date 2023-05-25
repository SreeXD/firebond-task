import Variables from './components/Variables'
import Operation from './components/Operation'
import { useSelector } from 'react-redux'
import { color, toString } from './lib/Utility'

function App() {
	const opTree = useSelector(state => state.opTree)
	const root = opTree.root

	return (
		<>
			<Variables />
			<Operation node={root} />

			<span 
				style={{ 
					marginLeft: '1rem',
					fontWeight: 'bold',
					color: color(root.value)
				}} 
			>
				{toString(root.value)}
			</span>
		</>
	)
}

export default App
