
import java.util.Queue;
import java.util.LinkedList;

public class Solution {

    int rows;
    int columns;
    int ID_forEmptyPointsToCheckFromCurrentBuilding;
    int[][] distance;
    static final int[][] moves = {{-1, 0}/*up*/, {1, 0}/*down*/, {0, -1}/*left*/, {0, 1}/*right*/};

    public int shortestDistance(int[][] grid) {
        rows = grid.length;
        columns = grid[0].length;
        ID_forEmptyPointsToCheckFromCurrentBuilding = 0;
        distance = new int[rows][columns];
        int minDistance = Integer.MAX_VALUE;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                if (grid[r][c] == 1) {
                    minDistance = breadthFirstSearch(grid, new int[]{r, c});
                    ID_forEmptyPointsToCheckFromCurrentBuilding--;
                }
            }
        }
        return minDistance < Integer.MAX_VALUE ? minDistance : -1;
    }

    private int breadthFirstSearch(int[][] grid, int[] start) {

        Queue<int[]> queue = new LinkedList<>();
        queue.add(start);
        int distanceFromCurrentBuilding = 0;
        int minDistance = Integer.MAX_VALUE;

        while (!queue.isEmpty()) {

            int steps = queue.size();
            distanceFromCurrentBuilding++;

            while (steps-- > 0) {
                int[] point = queue.poll();

                for (int i = 0; i < moves.length; i++) {
                    int row = point[0] + moves[i][0];
                    int column = point[1] + moves[i][1];

                    if (isInGrid(row, column) && grid[row][column] == ID_forEmptyPointsToCheckFromCurrentBuilding) {
                        grid[row][column]--;
                        queue.add(new int[]{row, column});
                        distance[row][column] += distanceFromCurrentBuilding;
                        minDistance = Math.min(minDistance, distance[row][column]);
                    }
                }
            }
        }
        return minDistance;
    }

    private boolean isInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
