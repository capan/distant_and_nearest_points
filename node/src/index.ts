class Point {
    constructor(public readonly x: number, public readonly y: number) { }
    distanceTo(other: Point): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

class PointsSet {
    constructor(public readonly points: Point[]) { }
    async findClosestAndFarthest(): Promise<[[Point, Point], [Point, Point]]> {
        return new Promise((resolve, reject) => {
            if (this.points.length < 2) {
                reject(new Error('At least two points are required'));
            }
            let closestPoints: [Point, Point] = [this.points[0], this.points[1]];
            let closestDistance = closestPoints[0].distanceTo(closestPoints[1]);
            let mostDistantPoints: [Point, Point] = [this.points[0], this.points[1]];
            let mostDistantDistance = mostDistantPoints[0].distanceTo(mostDistantPoints[1]);
            for (let i = 0; i < this.points.length; i++) {
                for (let j = i + 1; j < this.points.length; j++) {
                    const distance = this.points[i].distanceTo(this.points[j]);
                    if (distance < closestDistance) {
                        closestPoints = [this.points[i], this.points[j]];
                        closestDistance = distance;
                    }
                    if (distance > mostDistantDistance) {
                        mostDistantPoints = [this.points[i], this.points[j]];
                        mostDistantDistance = distance;
                    }
                }
            }
            resolve([mostDistantPoints, closestPoints]);
        });
    }
}

const inputGen = (totalNumber: number) => {
    let i = 0;
    const input: [number, number][] = [];
    while (i <= totalNumber) {
        input.push([Math.ceil(Math.random() * 1000), Math.ceil(Math.random() * 1000)]);
        i += 1;
    }
    return input
}

const totalInputs = 1000000;

console.time("InputGen");
const input = inputGen(totalInputs);
console.timeEnd("InputGen");
const points = input.map(([x, y]) => new Point(x, y));
const ps = new PointsSet(points);
console.time(`FindingDistantClosest:${totalInputs}`);
const res = ps.findClosestAndFarthest();
Promise.all([res]).then(([res]) => {
    console.log("Closests: ", res[0]);
    console.log("Distants: ", res[1]);
    console.timeEnd(`FindingDistantClosest:${totalInputs}`);
}).catch((err) => {
    console.error(err);
    console.timeEnd(`FindingDistantClosest:${totalInputs}`);
})