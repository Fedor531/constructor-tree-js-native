const addTreeButton = document.querySelector('.add-tree-button')
const jsonButton = document.querySelector('.json-button')
const container = document.querySelector('.tree-container')

const trees = [] // Tree storage array

// Tree rendering control
const treesTemplate = new TreeTemplate(trees, container)

// Callback render
const treesTemplateRender = () => treesTemplate.render()

// Arbitrary tree template
const tree = new Tree('1', treesTemplateRender);

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

// Add tree template
treesTemplate.addNewTree(tree)

function addNewTree() {
    const nameTree = prompt('Enter the tree name')
    if (nameTree) {
        const newTree = new Tree(nameTree, treesTemplateRender)
        treesTemplate.addNewTree(newTree)
    }
}

function deleteTree(event) {
    if (event.target.classList.contains('delTreeBtn')) {
        if (confirm('Do you really want to delete the whole tree?')) {
            treesTemplate.removeTree(event.target.id)
        }
    }
}

// Show JSON
function getTreeJSON() {
    const arr = []
    trees.forEach((item) => {
        arr.push(item.getObjectTree())
    })
    console.log(JSON.stringify(arr))
}

// Listeners
addTreeButton.addEventListener('click', addNewTree)
jsonButton.addEventListener('click', getTreeJSON)
container.addEventListener('click', deleteTree)
