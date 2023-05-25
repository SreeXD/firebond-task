import store from '../store'

class OperationNode {
    constructor(parent) {
        this.parent = parent
        this.value = undefined
    }
    
    evaluate() {
        switch (this.type) {
            case 'variable':
                this.value = store.getState().variables[this.index].value
                break

            case 'or':
                this.value = this.children.reduce((a, b) => a || b.value, undefined)
                break 

            case 'and':
                // this.value = this.children.reduce((a, b) => a && b.value, true)
                
                this.value = true 

                for (const child of this.children) {
                    if (child.value == undefined) {
                        this.value = undefined
                        break 
                    }

                    this.value &&= child.value
                } 

                break 
        }
    }

    evaluateUp() {
        this.evaluate()
        if (this.parent) this.parent.evaluateUp()
    }

    evaluateDown() {
        if (this.children) this.children.forEach(child => child.evaluateDown())
        this.evaluate()
    }

    set(type) {
        this.type = type

        switch (this.type) {
            case 'variable':
                this.index = 0
                break 

            case 'constant':
                this.value = false
                break 

            case 'or':
            case 'and':
                this.children = [new OperationNode(this), new OperationNode(this)]
                break 
        }

        this.evaluateUp()
    }

    reset() {
        this.value = undefined
        this.type = null
        delete this.index 

        if (this.parent) this.parent.evaluateUp()
    }

    add() {
        this.children.push(new OperationNode(this))
        this.evaluateUp()
    }

    toggleValue() {
        this.value = !this.value

        if (this.parent) this.parent.evaluateUp()
    }

    setIndex(index) {
        this.index = index 
        this.evaluateUp()
    }
}

class OperationTree {
    constructor(root) {
        this.root = root ?? new OperationNode()
    }

    clone() {
        return new OperationTree(this.root)
    }

    revaluate() {

    }
}

export default OperationTree