const input = [[1, 4], [4, 4], [3, 2], [5, 1]];

const distance = (c1, c2) => {
    const x = c1[0] - c2[0];
    const y = c1[1] - c2[1];
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    return Math.sqrt(x * x + y * y);
}

const mapKeyGenerator = (c1, c2) => {
    const flat = [...c1, ...c2];
    // const sortedFlat = flat.sort((a, b) => a - b)
    return flat.toString()
}

const it = (arr) => {
    const distanceMap = new Map();
    arr.forEach((value, i) => {
        const rest = input.filter((coord) => {
            if ((coord[0] === value[0]) && (coord[1] === value[1])) return false
            else return true
        });
        for (const each of rest) {
            const d = distance(value, each);
            const k = mapKeyGenerator(value, each)
            distanceMap.set(k, d)
        }
    });
    console.log(distanceMap);
}

it(input);