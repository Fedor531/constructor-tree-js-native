import './style.css'
import { Site } from './classes/Site'
import { Tree } from './classes/Tree'
import { Node } from './classes/Node'
import { model } from './model'

const addNewTreeButton = document.querySelector('.addNewTreeButton')
const jsStringButton = document.querySelector('.jsStringButton')
const container = document.querySelector('.container')

// Переменная для отрисовки и управлениями деревьями
const site = new Site(model, container)
site.render()

// Callback функции render()
const siteRender = () => site.render()

// Шаблон произвольного дерева
const tree = new Tree('Лес', siteRender);

tree._root.children.push(new Node('Береза'));
tree._root.children[0].parent = tree._root;

tree._root.children[0].children.push(new Node('Ствол'));
tree._root.children[0].children[0].parent = tree._root.children[0];

tree._root.children.push(new Node('Сосна'));
tree._root.children[1].parent = tree._root;

tree._root.children.push(new Node('Ель'));
tree._root.children[2].parent = tree._root;

tree._root.children.push(new Node('Пихта'));
tree._root.children[3].parent = tree._root;

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
    if (confirm('Вы действительно хотите удалить все дерево?')) {
      site.removeTree(event.target.id)
    }
  }
}

// Функция вывода массива объектов-деревьев в JSON формате
function getTreeJSON() {
  const arr = []
  model.forEach(function (item) {
    arr.push(item.getObjectTree())
  })
  console.log(JSON.stringify(arr))
}

// Слушатели
addNewTreeButton.addEventListener('click', addNewTree)
jsStringButton.addEventListener('click', getTreeJSON)
container.addEventListener('click', deleteTree)
