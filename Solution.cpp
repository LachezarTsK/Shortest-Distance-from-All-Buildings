
#include <array>
#include <queue>
#include <vector>
using namespace std;

class Solution {
    
public:

    size_t rows;
    size_t columns;
    int ID_forEmptyPointsToCheckFromCurrentBuilding;
    vector<vector<int>> distance;
    static inline const array<array<int, 2>, 4> moves{
        array<int, 2>{-1, 0}/*up*/,
        array<int, 2>{1, 0}/*down*/,
        array<int, 2>{0, -1}/*left*/,
        array<int, 2>{0, 1}/*right*/};

    int shortestDistance(vector<vector<int>>&grid) {
        
        rows = grid.size();
        columns = grid[0].size();
        ID_forEmptyPointsToCheckFromCurrentBuilding = 0;
        distance = {rows, vector<int>(columns)};
        int minDistance = INT_MAX;
        
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < columns; c++) {
                if (grid[r][c] == 1) {
                    minDistance = breadthFirstSearch(grid, pair<int, int>{r, c});
                    ID_forEmptyPointsToCheckFromCurrentBuilding--;
                }
            }
        }
        return minDistance < INT_MAX ? minDistance : -1;
    }

    int breadthFirstSearch(vector<vector<int>>&grid, pair<int, int> start) {

        queue<pair<int, int> > queue;
        queue.push(start);
        int distanceFromCurrentBuilding = 0;
        int minDistance = INT_MAX;

        while (!queue.empty()) {

            int steps = queue.size();
            distanceFromCurrentBuilding++;

            while (steps-- > 0) {
                pair<int, int> point = queue.front();
                queue.pop();

                for (const auto& move : moves) {
                    int row = point.first + move[0];
                    int column = point.second + move[1];

                    if (isInGrid(row, column) && grid[row][column] == ID_forEmptyPointsToCheckFromCurrentBuilding) {
                        grid[row][column]--;
                        queue.push(pair<int, int>{row, column});
                        distance[row][column] += distanceFromCurrentBuilding;
                        minDistance = min(minDistance, distance[row][column]);
                    }
                }
            }
        }
        return minDistance;
    }

    bool isInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
