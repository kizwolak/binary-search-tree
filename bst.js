function Node (d) {
    return {
        data: d,
        left: null,
        right: null,
    }
}

function Tree (array) {
    function buildTree (array) {
        for (element of array) {
            let elementCounter = 0;
            for ()
            if (elementCounter.length > 1) {
                elementCounter.shift();
                for (index of elementCounter) {
                    array.splice(index, 1);
                }
            }
        }
        console.log(array);
        let sortedArray = array.sort();
        console.log(sortedArray);
    }
    return {
        sorted: console.log(buildTree(array)),
    }
}

Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(Tree.sorted);