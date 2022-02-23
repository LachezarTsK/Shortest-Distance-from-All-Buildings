
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestDistance = function (grid) {

    this.rows = grid.length;
    this.columns = grid[0].length;
    this.ID_forEmptyPointsToCheckFromCurrentBuilding = 0;
    this.moves = [[-1, 0]/*up*/, [1, 0]/*down*/, [0, -1]/*left*/, [0, 1]/*right*/];

    this.distance = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
        this.distance[i] = new Array(this.columns).fill(0);
    }

    let minDistance = Number.MAX_SAFE_INTEGER;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (grid[r][c] === 1) {
                minDistance = breadthFirstSearch(grid, [r, c]);
                ID_forEmptyPointsToCheckFromCurrentBuilding--;
            }
        }
    }
    return minDistance < Number.MAX_SAFE_INTEGER ? minDistance : -1;
};

/**
 * @param {number[][]} grid
 * @param {number[]} start
 * @return {number}
 */
function breadthFirstSearch(grid, start) {

    const queue = new Queue();
    queue.enqueue(start);
    let distanceFromCurrentBuilding = 0;
    let minDistance = Number.MAX_SAFE_INTEGER;

    while (!queue.isEmpty()) {

        let steps = queue.size();
        distanceFromCurrentBuilding++;

        while (steps-- > 0) {
            const point = queue.dequeue();

            for (let i = 0; i < this.moves.length; i++) {
                let row = point[0] + this.moves[i][0];
                let column = point[1] + this.moves[i][1];

                if (isInGrid(row, column) && grid[row][column] === this.ID_forEmptyPointsToCheckFromCurrentBuilding) {
                    grid[row][column]--;
                    queue.enqueue([row, column]);
                    this.distance[row][column] += distanceFromCurrentBuilding;
                    minDistance = Math.min(minDistance, distance[row][column]);
                }
            }
        }
    }
    return minDistance;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function isInGrid(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}
