class TreeTemplate {
    constructor(trees, container) {
        this.trees = trees
        this.container = container
    }

    render() {
        this.container.innerHTML = ''
        this.trees.forEach(tree => {
            this.container.insertAdjacentHTML('beforeend', tree.createTreeHTML())
            tree.listeners()
        })
    }

    addNewTree(newTree) {
        this.trees.push(newTree)
        this.render()
    }

    removeTree(id) {
        this.trees = this.trees.filter(tree => id !== tree.id)
        this.render()
    }
}