class Site {
    constructor(trees, container) {
        this.trees = trees;
        this.container = container;
    }

    // Функция отрисовки страницы
    render() {
        this.container.innerHTML = ''
        this.trees.forEach(tree => {
            this.container.insertAdjacentHTML('beforeend', tree.createTreeHTML())
            tree.listeners()
        })
    }

    // Функция добавления дерева
    addNewTree(newTree) {
        this.trees.push(newTree)
        this.render()
    }

    // Функция удаления дерева
    removeTree(id) {
        this.trees = this.trees.filter((tree) => {
            return id !== tree.id
        })
        this.render()
    }
}