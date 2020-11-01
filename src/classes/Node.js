// Узел
export class Node {
  constructor(data) {
    this.data = data; // Хранит название узла
    this.parent = null; // Указывает на родительский элемент узла
    this.children = []; // Содержит массив дочерних элементов
    this._id = (Math.random() * 10000).toFixed() // Рандомный ID 
  }
}