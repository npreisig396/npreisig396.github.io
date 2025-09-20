export default class Grid {
    constructor() {
        this.map = new Map();
    }

    set(i,j,v) {
        if (!this.map.has(i)) this.map.set(i, new Map());
        this.map.get(i).set(j,v)
    }

    get(i,j) {
        return this.map.get(i).get(j);
    }

    has(i,j) {
        return this.map.has(i) && this.map.get(i).has(j);
    }

    delete(i,j) {
        this.map.get(i).delete(j);
        if (this.map.get(i).size == 0) this.map.delete(i);
    }

    size() {
        return [...this].length;
    }

    clear() {
        this.map.clear();
    }

    *[Symbol.iterator]() {
        for (const [i,row] of this.map) {
            for (const [j,val] of this.map.get(i)) {
                yield [i,j,val];
            }
        }
    }
}
