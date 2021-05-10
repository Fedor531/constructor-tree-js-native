const trees = []

const addTreeButton = document.querySelector('.add-tree-button')
const jsonButton = document.querySelector('.json-button')
const container = document.querySelector('.container')

// Переменная для отрисовки и управлениями деревьями
const site = new Site(trees, container)
site.render()

// Callback функции render()
const siteRender = () => site.render()

// Шаблон произвольного дерева
const tree = new Tree('1', siteRender);

tree.root.children.push(new Node('1.1'));
tree.root.children[0].parent = tree.root;

tree.root.children[0].children.push(new Node('1.1.1'));
tree.root.children[0].children[0].parent = tree.root.children[0];

tree.root.children.push(new Node('1.2'));
tree.root.children[1].parent = tree.root;

tree.root.children.push(new Node('1.3'));
tree.root.children[2].parent = tree.root;

tree.root.children.push(new Node('1.4'));
tree.root.children[3].parent = tree.root;

// Добавляем шаблон дерева
site.addNewTree(tree)

// Функция создает новое дерево и добавляет на сайт
function addNewTree() {
    const nameTree = prompt('Введите имя дерева')
    if (nameTree) {
        const newTree = new Tree(nameTree, siteRender)
        site.addNewTree(newTree)
    }
}

// Функция удаления дерева
function deleteTree(event) {
    if (event.target.classList.contains('delTreeBtn')) {
        if (confirm('Do you really want to delete the whole tree?')) {
            site.removeTree(event.target.id)
        }
    }
}

// Функция вывода массива объектов-деревьев в JSON формате
function getTreeJSON() {
    const arr = []
    trees.forEach(function (item) {
        arr.push(item.getObjectTree())
    })
    console.log(JSON.stringify(arr))
}

// Listeners
addTreeButton.addEventListener('click', addNewTree)
jsonButton.addEventListener('click', getTreeJSON)
container.addEventListener('click', deleteTree)
