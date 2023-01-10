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
            let elementIndexes = [];
            for (let i = 0; i < array.length; i++) {
                if (array[i] === element) (elementIndexes.push(i));
            }
            if (elementIndexes.length > 1) {
                elementIndexes.shift();
                for (index of elementIndexes) {
                    array.splice(index, 1);
                }
                console.log(array);
                return array;
            }
        }
        let sortedArray = array.sort();
        console.log(`Sorted: ${sortedArray}`);
        return sortedArray;
    }
    return {
        sorted: console.log(buildTree(array)),
    }
}

Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(Tree.sorted);