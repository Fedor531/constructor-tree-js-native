export class Site {
  constructor(model, container) {
    this.model = model,
    this.$container = container
  }

  // Функция отрисовки страницы
  render() {
    this.$container.innerHTML = ''
    this.model.forEach(tree => {
      this.$container.insertAdjacentHTML('beforeend', tree.createTreeHTML())
      tree.listeners()
    })
  }

  // Функция добавления дерева
  addNewTree(newTree) {
    this.model.push(newTree)
    this.render()
  }

  // Функция удаления дерева
  removeTree(id) {
    this.model = this.model.filter((tree) => {
      return id !== tree._id
    })
    this.render()
  }
}