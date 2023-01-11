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
        console.log(tree);
    }

    let inserted = insert(main, 2);

    // let printInserted = prettyPrint(insert(main, 2));
    
    return {
        sorted: buildTree(sorted, 0, sorted.length - 1),
        printed: prettyPrint(main),
        // logged: mainConsole,
        insert: inserted,
        // printedInsert: printInserted,
    }
}

let test = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(test.insert);
