class Node {
    constructor(name) {
        this.name = name // Node name
        this.parent = null // Points to the parent node element
        this.children = [] // Contains an array of child elements
        this.id = (Math.random() * 10000).toFixed() // Random id
    }
}