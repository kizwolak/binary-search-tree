function nodeCreate (d) {
    return {
        data: d,
        left: null,
        right: null,
    }
}

function Tree (array) {
    function sortTree (array) {
        for (element of array) {
            let elementIndexes = [];
            for (let i = 0; i < array.length; i++) {
                if (array[i] === element) (elementIndexes.push(i));
            }
            if (elementIndexes.length > 1) {
                elementIndexes.shift();
                for (index of elementIndexes) {
                    array.splice(index, 1);
                }
            }
        }
        array.sort(function(a, b) {return a - b});
        return array;
    }

    let sorted = sortTree(array);

    function buildTree (array, start, end) {
        if (start > end) return null;
        let mid = Math.floor((start + end) / 2);
        let node = nodeCreate(array[mid]);
        node.left = buildTree(array, start, mid - 1);
        node.right = buildTree(array, mid + 1, end);
        return node;
    }

    let main = buildTree(array, 0, array.length - 1);

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    function insert (tree, value) {
        if (tree.left === null && tree.right === null) {
            if (tree.data < value) {
                tree.right = nodeCreate(value);
                return tree.right;
            } else if (tree.data > value) {
                tree.left = nodeCreate(value);
                return tree.right;
            }
        }
        if (tree.data === value) return;
        if (value < tree.data) return insert(tree.left, value);
        if (value > tree.data) return insert(tree.right, value);
    }

    function nextMinimum (tree) {
        let minValue = tree.data;
        while (tree.left !== null) {
            minValue = tree.left.data;
            tree = tree.left;
        }
        return minValue;
    }

    function remove (tree, value) {
        if (tree === null) return tree;
        if (value < tree.data) tree.left = remove(tree.left, value);
        else if (value > tree.data) tree.right = remove(tree.right, value);
        else {
            if (tree.left === null && tree.right === null) return null;
            if (tree.right === null && tree.left !== null) return tree.left;
            if (tree.left === null && tree.right !== null) return tree.right;
            if (tree.left !== null && tree.right !== null) {
                tree.data = nextMinimum(tree.right);
                tree.right = remove(tree.right, tree.data);
            }
        }
        return tree;
    }

    // insert(main, 10);
    // remove(main, 324);
    
    function find (tree, value) {
        if (tree === null) return new Error('BST does not contain value');
        if (tree.data < value) return find(tree.right, value);
        if (tree.data > value) return find(tree.left, value);
        if (tree.data === value) return tree;
    }

    // let found = find(main, 11);

    function log(param) {
        console.log(param);
    }

    function levelOrder (tree, func) {
        let queue = [tree];
        let spareArray = [];
        let current;
        while (queue.length !== 0) {
            current = queue.shift();
            if (current === null) continue;
            if (func != null) func(current.data);
            if (func == null) spareArray.push(current.data);
            queue.push(current.left);
            queue.push(current.right);
        }
    }

    function inorder (tree, func) {
        let spareArray = [];
        if (tree === null) return;
        inorder(tree.left, func);
        if (func == null) spareArray.push(tree.data);
        else func(tree.data);
        inorder(tree.right, func);
    }

    function preorder (tree, func) {
        let spareArray = [];
        if (tree === null) return;
        if (func == null) spareArray.push(tree.data);
        else func(tree.data);
        preorder(tree.left, func);
        preorder(tree.right, func);
    }
    
    function postorder (tree, func) {
        let spareArray = [];
        if (tree === null) return;
        postorder(tree.right, func);
        if (func == null) spareArray.push(tree.data);
        else func(tree.data);
        postorder(tree.left, func);
    }

    function mainHeight (tree, value) {
        if (tree === null) return -1;
        let leftHeight = mainHeight(tree.left)
        let rightHeight = mainHeight(tree.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    function height(tree, value) {
        let nodeHeight = mainHeight(tree, value);
        while (tree !== null) {
            if (tree.data < value) {
                nodeHeight -= 1;
                tree = tree.right;
            } else if (tree.data > value) {
                nodeHeight -= 1;
                tree = tree.left;
            } else if (tree.data === value) return nodeHeight;
        }
    }

    function depth(tree, value) {
        let counter = 0;
        while (tree !== null) {
            if (tree.data < value) {
                counter += 1;
                tree = tree.right;
            } else if (tree.data > value) {
                counter += 1;
                tree = tree.left;
            } else if (tree.data === value) return counter;
        }
    }

    let foundHeight = depth(main, 23);

    return {
        sorted: buildTree(sorted, 0, sorted.length - 1),
        printed: prettyPrint(main),
        foundHeight,
    }
}

let test = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(test.printed);
console.log(test.foundHeight);
