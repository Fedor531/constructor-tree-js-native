// Дерево
class Tree {
    constructor(data, siteRender) {
        this.root = new Node(data);
        this.siteRender = siteRender;
        this.id = this.root.id;
        this.checkEventClick = this.checkEventClick.bind(this);
    }

    // Метод обхода дерева (в глубину)
    traverseDF(callback) {

        // Рекурсивная и немедленно вызываемая функция
        (function recurse(currentNode) { // currrentNode - текущий узел
            // шаг 2
            currentNode.children.forEach(function (item, index) { // Первая node не вызовет callback до тех пор пока не вызовут callback все его дети
                // шаг 3
                recurse(currentNode.children[index])
            })
            // шаг 4
            callback(currentNode);
            // шаг 1
        })(this.root);

    };

    // Метод создания шаблона дерева (возращает разметку)
    createTreeHTML() {

        const childTreeHTML = (function createTreeHTML(currentNode) {

            let li = '';
            let ul;

            // Перебираем children корневой node (узел) и с помощью рекурсивной функции createTreeHTML обходим все узлы и создаем их шаблоны, записывая в друг друга
            currentNode.children.forEach(function (item, index) {
                li += `<li class='element' id=${item.id}>
              <button id=${item.id} class='addBtn'>+</button>
              <button id=${item.id} class='delBtn'>-</button>
              ${item.data}${createTreeHTML(currentNode.children[index])}
              
              </li>`;
            })

            if (li) {
                ul = '<ul>' + li + '</ul>'
            }

            return ul || '';

        })(this.root);

        // Формируем итоговую разметку дерева
        const treeHTML = `<ul class="tree tree-${this.root.id}">
                        <li id=${this.root.id}>
                          <button id=${this.root.id} class='addBtn'>+</button>
                          <button id=${this.root.id} class='delTreeBtn'>-</button> 
                          ${this.root.data}
                        </li>
                      ${childTreeHTML}
                      </ul>`

        return treeHTML

    };

    // Метод позволяющий найти конкретное значение в дереве (условия поиска записываюстя в callback)
    contains(callback) {
        this.traverseDF.call(this, callback);
    }

    // Метод добавления дочернего узла к родительскому
    addChild(nameChildren, id) {
        const child = new Node(nameChildren);
        let parent = null;

        function callback(node) {
            if (id === node.id) {
                parent = node;
            }
        };

        this.contains(callback);

        if (parent) {
            parent.children.push(child);
            child.parent = parent;
        }
    };

    // Метод удаления узла
    removeChild(id) {
        let parent = null;
        let childToRemove = null;
        let index;

        function callback(node) {
            if (id === node.id) {
                parent = node.parent;
            }
        };
        this.contains(callback);

        if (parent) {
            index = this.findNodeIndex(parent.children, id);
            if (index !== undefined) {
                childToRemove = parent.children.splice(index, 1)
            }
        }
    };

    // Метод возращает индекс узла, который нужно удалить
    findNodeIndex(arr, id) {
        let index;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                index = i;
            }
        }
        return index;
    }

    // Метод проверки события на дереве
    checkEventClick(event) {
        if (event.target.classList.contains('addBtn')) {
            const nameChildren = prompt('Enter node name')
            if (nameChildren) {
                this.addChild(nameChildren, event.target.id)
                this.siteRender()
            }
        }

        if (event.target.classList.contains('delBtn')) {
            if (confirm('Do you really want to remove the node?')) {
                this.removeChild(event.target.id)
                this.siteRender()
            }
        }
    }

    listeners() {
        document.querySelector(`.tree-${this.root.id}`).addEventListener('click', this.checkEventClick)
    }

    // Метод возращает дерево в виде объекта
    getObjectTree() {

        const mainTreeChildren = (function getObjectsArray(currentNode) {

            const objectsChildrenArray = []

            currentNode.children.forEach(function (item, index) {
                const obj = {
                    name: item.data,
                    id: item.id,
                }

                if (getObjectsArray(currentNode.children[index]).length) {
                    obj.children = getObjectsArray(currentNode.children[index])
                }

                objectsChildrenArray.push(obj)
            })

            return objectsChildrenArray

        })(this.root);

        const mainTreeObj = {
            name: this.root.data,
            id: this.root.id,
            children: mainTreeChildren
        }

        return mainTreeObj
    };

}