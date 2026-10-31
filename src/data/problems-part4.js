export const problemsPart4 = [
    {
        id: "rotting-oranges",
        leetcodeNum: 994,
        title: "Rotting Oranges",
        category: "graphs",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int orangesRotting(vector<vector<int>>& grid) {
    int m=grid.size();
    int n=grid[0].size();
    queue<pair<int,int>> q;
    int fresh=0;
    for(int i=0;i<m;i++) {
        for(int j=0;j<n;j++) {
            if(grid[i][j]==2) {
                q.push({i,j});
            } else if(grid[i][j]==1) {
                fresh++;
            }
        }
    }
    if(fresh==0) return 0;
    int dirs[4][2]={{-1,0},{1,0},{0,-1},{0,1}};
    int mins=0;
    while(!q.empty()) {
        int sz=q.size();
        bool rotted=false;
        for(int k=0;k<sz;k++) {
            pair<int,int> cur=q.front();
            q.pop();
            for(int d=0;d<4;d++) {
                int ni=cur.first+dirs[d][0];
                int nj=cur.second+dirs[d][1];
                if(ni>=0&&ni<m&&nj>=0&&nj<n&&grid[ni][nj]==1) {
                    grid[ni][nj]=2;
                    fresh--;
                    q.push({ni,nj});
                    rotted=true;
                }
            }
        }
        if(rotted) mins++;
    }
    return fresh==0 ? mins : -1;
}`
    },
    {
        id: "number-of-provinces",
        leetcodeNum: 547,
        title: "Number of Provinces",
        category: "graphs",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `void dfs(int node,vector<vector<int>>& isConnected,vector<bool>& vis) {
    vis[node]=true;
    for(int j=0;j<isConnected.size();j++) {
        if(isConnected[node][j]&&!vis[j]) {
            dfs(j,isConnected,vis);
        }
    }
}

int findCircleNum(vector<vector<int>>& isConnected) {
    int n=isConnected.size();
    vector<bool> vis(n,false);
    int ans=0;
    for(int i=0;i<n;i++) {
        if(!vis[i]) {
            ans++;
            dfs(i,isConnected,vis);
        }
    }
    return ans;
}`
    },
    {
        id: "flood-fill",
        leetcodeNum: 733,
        title: "Flood Fill",
        category: "graphs",
        difficulty: "easy",
        solved: true,
        sheet: "striver-a2z",
        code: `void dfs(vector<vector<int>>& image,int r,int c,int oldColor,int newColor) {
    if(r<0||r>=image.size()||c<0||c>=image[0].size()) return;
    if(image[r][c]!=oldColor) return;
    image[r][c]=newColor;
    dfs(image,r+1,c,oldColor,newColor);
    dfs(image,r-1,c,oldColor,newColor);
    dfs(image,r,c+1,oldColor,newColor);
    dfs(image,r,c-1,oldColor,newColor);
}

vector<vector<int>> floodFill(vector<vector<int>>& image,int sr,int sc,int color) {
    if(image[sr][sc]==color) return image;
    dfs(image,sr,sc,image[sr][sc],color);
    return image;
}`
    },
    {
        id: "course-schedule-ii",
        leetcodeNum: 210,
        title: "Course Schedule II",
        category: "graphs",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `vector<int> findOrder(int numCourses,vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> indeg(numCourses,0);
    for(int i=0;i<prerequisites.size();i++) {
        adj[prerequisites[i][1]].push_back(prerequisites[i][0]);
        indeg[prerequisites[i][0]]++;
    }
    queue<int> q;
    for(int i=0;i<numCourses;i++) {
        if(indeg[i]==0) q.push(i);
    }
    vector<int> ans;
    while(!q.empty()) {
        int u=q.front();
        q.pop();
        ans.push_back(u);
        for(int i=0;i<adj[u].size();i++) {
            int v=adj[u][i];
            indeg[v]--;
            if(indeg[v]==0) q.push(v);
        }
    }
    if(ans.size()!=numCourses) return {};
    return ans;
}`
    },
    {
        id: "shortest-path-in-binary-matrix",
        leetcodeNum: 1091,
        title: "Shortest Path in Binary Matrix",
        category: "graphs",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
    int n=grid.size();
    if(grid[0][0]!=0||grid[n-1][n-1]!=0) return-1;
    if(n==1) return 1;
    queue<pair<int,int>> q;
    q.push({0,0});
    grid[0][0]=1;
    int dist=1;
    while(!q.empty()) {
        int sz=q.size();
        for(int k=0;k<sz;k++) {
            pair<int,int> cur=q.front();
            q.pop();
            int r=cur.first;
            int c=cur.second;
            if(r==n-1&&c==n-1) return dist;
            for(int dr=-1;dr<=1;dr++) {
                for(int dc=-1;dc<=1;dc++) {
                    if(dr==0&&dc==0) continue;
                    int nr=r+dr;
                    int nc=c+dc;
                    if(nr>=0&&nr<n&&nc>=0&&nc<n&&grid[nr][nc]==0) {
                        grid[nr][nc]=1;
                        q.push({nr,nc});
                    }
                }
            }
        }
        dist++;
    }
    return-1;
}`
    },
    {
        id: "path-with-minimum-effort",
        leetcodeNum: 1631,
        title: "Path With Minimum Effort",
        category: "graphs",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int minimumEffortPath(vector<vector<int>>& heights) {
    int m=heights.size();
    int n=heights[0].size();
    priority_queue<pair<int,pair<int,int>>,vector<pair<int,pair<int,int>>>,greater<pair<int,pair<int,int>>>> pq;
    vector<vector<int>> dist(m,vector<int>(n,1e9));
    dist[0][0]=0;
    pq.push({0,{0,0}});
    int dirs[4][2]={{-1,0},{1,0},{0,-1},{0,1}};
    while(!pq.empty()) {
        pair<int,pair<int,int>> top=pq.top();
        pq.pop();
        int d=top.first;
        int r=top.second.first;
        int c=top.second.second;
        if(d> dist[r][c]) continue;
        if(r==m-1&&c==n-1) return d;
        for(int i=0;i<4;i++) {
            int nr=r+dirs[i][0];
            int nc=c+dirs[i][1];
            if(nr>=0&&nr<m&&nc>=0&&nc<n) {
                int effort=max(d,abs(heights[r][c]-heights[nr][nc]));
                if(effort<dist[nr][nc]) {
                    dist[nr][nc]=effort;
                    pq.push({effort,{nr,nc}});
                }
            }
        }
    }
    return 0;
}`
    },
    {
        id: "cheapest-flights-within-k-stops",
        leetcodeNum: 787,
        title: "Cheapest Flights Within K Stops",
        category: "graphs",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int findCheapestPrice(int n,vector<vector<int>>& flights,int src,int dst,int k) {
    vector<vector<pair<int,int>>> adj(n);
    for(int i=0;i<flights.size();i++) {
        adj[flights[i][0]].push_back({flights[i][1],flights[i][2]});
    }
    queue<pair<int,pair<int,int>>> q;
    q.push({0,{src,0}});
    vector<int> dist(n,1e9);
    dist[src]=0;
    while(!q.empty()) {
        pair<int,pair<int,int>> cur=q.front();
        q.pop();
        int stops=cur.first;
        int u=cur.second.first;
        int cost=cur.second.second;
        if(stops> k) continue;
        for(int i=0;i<adj[u].size();i++) {
            int v=adj[u][i].first;
            int w=adj[u][i].second;
            if(cost+w<dist[v]) {
                dist[v]=cost+w;
                q.push({stops+1,{v,cost+w}});
            }
        }
    }
    return dist[dst]==1e9 ? -1 : dist[dst];
}`
    },
    {
        id: "floyd-warshall",
        leetcodeNum: 0,
        title: "Floyd Warshall Algorithm",
        category: "graphs",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `void shortestDistance(vector<vector<int>>& matrix) {
    int n=matrix.size();
    for(int i=0;i<n;i++) {
        for(int j=0;j<n;j++) {
            if(matrix[i][j]==-1) matrix[i][j]=1e9;
            if(i==j) matrix[i][j]=0;
        }
    }
    for(int k=0;k<n;k++) {
        for(int i=0;i<n;i++) {
            for(int j=0;j<n;j++) {
                if(matrix[i][k]!=1e9&&matrix[k][j]!=1e9) {
                    matrix[i][j]=min(matrix[i][j],matrix[i][k]+matrix[k][j]);
                }
            }
        }
    }
    for(int i=0;i<n;i++) {
        for(int j=0;j<n;j++) {
            if(matrix[i][j]==1e9) matrix[i][j]=-1;
        }
    }
}`
    },
    {
        id: "frog-jump-dp",
        leetcodeNum: 0,
        title: "Frog Jump DP",
        category: "dynamic-programming",
        difficulty: "easy",
        solved: true,
        sheet: "striver-a2z",
        code: `int frogJump(int n,vector<int>& heights) {
    vector<int> dp(n,0);
    dp[0]=0;
    for(int i=1;i<n;i++) {
        int jump1=dp[i-1]+abs(heights[i]-heights[i-1]);
        int jump2=1e9;
        if(i>1) {
            jump2=dp[i-2]+abs(heights[i]-heights[i-2]);
        }
        dp[i]=min(jump1,jump2);
    }
    return dp[n-1];
}`
    },
    {
        id: "unique-paths-ii",
        leetcodeNum: 63,
        title: "Unique Paths II",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
    int m=obstacleGrid.size();
    int n=obstacleGrid[0].size();
    if(obstacleGrid[0][0]==1||obstacleGrid[m-1][n-1]==1) return 0;
    vector<vector<long long>> dp(m,vector<long long>(n,0));
    dp[0][0]=1;
    for(int i=0;i<m;i++) {
        for(int j=0;j<n;j++) {
            if(obstacleGrid[i][j]==1) {
                dp[i][j]=0;
                continue;
            }
            if(i>0) dp[i][j]+=dp[i-1][j];
            if(j>0) dp[i][j]+=dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}`
    },
    {
        id: "minimum-falling-path-sum",
        leetcodeNum: 931,
        title: "Minimum Falling Path Sum",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int minFallingPathSum(vector<vector<int>>& matrix) {
    int n=matrix.size();
    vector<vector<int>> dp=matrix;
    for(int i=1;i<n;i++) {
        for(int j=0;j<n;j++) {
            int mn=dp[i-1][j];
            if(j>0) mn=min(mn,dp[i-1][j-1]);
            if(j<n-1) mn=min(mn,dp[i-1][j+1]);
            dp[i][j]+=mn;
        }
    }
    int ans=dp[n-1][0];
    for(int j=1;j<n;j++) {
        ans=min(ans,dp[n-1][j]);
    }
    return ans;
}`
    },
    {
        id: "triangle",
        leetcodeNum: 120,
        title: "Triangle",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int minimumTotal(vector<vector<int>>& triangle) {
    int n=triangle.size();
    vector<int> dp=triangle[n-1];
    for(int i=n-2;i>=0;i--) {
        for(int j=0;j<=i;j++) {
            dp[j]=triangle[i][j]+min(dp[j],dp[j+1]);
        }
    }
    return dp[0];
}`
    },
    {
        id: "best-time-to-buy-and-sell-stock-ii",
        leetcodeNum: 122,
        title: "Best Time to Buy and Sell Stock II",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int maxProfit(vector<int>& prices) {
    int ans=0;
    for(int i=1;i<prices.size();i++) {
        if(prices[i]> prices[i-1]) {
            ans+=prices[i]-prices[i-1];
        }
    }
    return ans;
}`
    },
    {
        id: "best-time-to-buy-and-sell-stock-iii",
        leetcodeNum: 123,
        title: "Best Time to Buy and Sell Stock III",
        category: "dynamic-programming",
        difficulty: "hard",
        solved: true,
        sheet: "striver-a2z",
        code: `int maxProfit(vector<int>& prices) {
    int buy1=-1e9,sell1=0;
    int buy2=-1e9,sell2=0;
    for(int i=0;i<prices.size();i++) {
        buy1=max(buy1,-prices[i]);
        sell1=max(sell1,buy1+prices[i]);
        buy2=max(buy2,sell1-prices[i]);
        sell2=max(sell2,buy2+prices[i]);
    }
    return sell2;
}`
    },
    {
        id: "best-time-to-buy-and-sell-stock-with-cooldown",
        leetcodeNum: 309,
        title: "Best Time to Buy and Sell Stock with Cooldown",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int maxProfit(vector<int>& prices) {
    int hold=-1e9,sold=0,rest=0;
    for(int i=0;i<prices.size();i++) {
        int prevHold=hold;
        int prevSold=sold;
        hold=max(hold,rest-prices[i]);
        sold=prevHold+prices[i];
        rest=max(rest,prevSold);
    }
    return max(sold,rest);
}`
    },
    {
        id: "best-time-to-buy-and-sell-stock-with-transaction-fee",
        leetcodeNum: 714,
        title: "Best Time to Buy and Sell Stock with Transaction Fee",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int maxProfit(vector<int>& prices,int fee) {
    int hold=-prices[0];
    int notHold=0;
    for(int i=1;i<prices.size();i++) {
        hold=max(hold,notHold-prices[i]);
        notHold=max(notHold,hold+prices[i]-fee);
    }
    return notHold;
}`
    },
    {
        id: "partition-equal-subset-sum",
        leetcodeNum: 416,
        title: "Partition Equal Subset Sum",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `bool canPartition(vector<int>& nums) {
    int sum=0;
    for(int i=0;i<nums.size();i++) sum+=nums[i];
    if(sum%2!=0) return false;
    int target=sum/2;
    vector<bool> dp(target+1,false);
    dp[0]=true;
    for(int i=0;i<nums.size();i++) {
        for(int j=target;j>=nums[i];j--) {
            dp[j]=dp[j]||dp[j-nums[i]];
        }
    }
    return dp[target];
}`
    },
    {
        id: "target-sum",
        leetcodeNum: 494,
        title: "Target Sum",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int findTargetSumWays(vector<int>& nums,int target) {
    int total=0;
    for(int i=0;i<nums.size();i++) total+=nums[i];
    if(abs(target)> total||(total+target)%2!=0) return 0;
    int s1=(total+target)/2;
    vector<int> dp(s1+1,0);
    dp[0]=1;
    for(int i=0;i<nums.size();i++) {
        for(int j=s1;j>=nums[i];j--) {
            dp[j]+=dp[j-nums[i]];
        }
    }
    return dp[s1];
}`
    },
    {
        id: "longest-palindromic-subsequence",
        leetcodeNum: 516,
        title: "Longest Palindromic Subsequence",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int longestPalindromeSubseq(string s) {
    int n=s.size();
    vector<vector<int>> dp(n,vector<int>(n,0));
    for(int i=n-1;i>=0;i--) {
        dp[i][i]=1;
        for(int j=i+1;j<n;j++) {
            if(s[i]==s[j]) {
                dp[i][j]=dp[i+1][j-1]+2;
            } else {
                dp[i][j]=max(dp[i+1][j],dp[i][j-1]);
            }
        }
    }
    return dp[0][n-1];
}`
    },
    {
        id: "edit-distance",
        leetcodeNum: 72,
        title: "Edit Distance",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int minDistance(string word1,string word2) {
    int m=word1.size();
    int n=word2.size();
    vector<vector<int>> dp(m+1,vector<int>(n+1,0));
    for(int i=0;i<=m;i++) dp[i][0]=i;
    for(int j=0;j<=n;j++) dp[0][j]=j;
    for(int i=1;i<=m;i++) {
        for(int j=1;j<=n;j++) {
            if(word1[i-1]==word2[j-1]) {
                dp[i][j]=dp[i-1][j-1];
            } else {
                dp[i][j]=1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]});
            }
        }
    }
    return dp[m][n];
}`
    },
    {
        id: "generate-parentheses",
        leetcodeNum: 22,
        title: "Generate Parentheses",
        category: "backtracking",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `void backtrack(int open,int close,int n,string& cur,vector<string>& ans) {
    if(cur.size()==2*n) {
        ans.push_back(cur);
        return;
    }
    if(open<n) {
        cur.push_back('(');
        backtrack(open+1,close,n,cur,ans);
        cur.pop_back();
    }
    if(close<open) {
        cur.push_back(')');
        backtrack(open,close+1,n,cur,ans);
        cur.pop_back();
    }
}

vector<string> generateParenthesis(int n) {
    vector<string> ans;
    string cur="";
    backtrack(0,0,n,cur,ans);
    return ans;
}`
    },
    {
        id: "combination-sum-ii",
        leetcodeNum: 40,
        title: "Combination Sum II",
        category: "backtracking",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `void dfs(vector<int>& c,int target,int start,vector<int>& path,vector<vector<int>>& ans) {
    if(target==0) {
        ans.push_back(path);
        return;
    }
    for(int i=start;i<c.size();i++) {
        if(i> start&&c[i]==c[i-1]) continue;
        if(c[i]> target) break;
        path.push_back(c[i]);
        dfs(c,target-c[i],i+1,path,ans);
        path.pop_back();
    }
}

vector<vector<int>> combinationSum2(vector<int>& candidates,int target) {
    vector<vector<int>> ans;
    vector<int> path;
    sort(candidates.begin(),candidates.end());
    dfs(candidates,target,0,path,ans);
    return ans;
}`
    },
    {
        id: "subsets-ii",
        leetcodeNum: 90,
        title: "Subsets II",
        category: "backtracking",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `void dfs(vector<int>& nums,int start,vector<int>& path,vector<vector<int>>& ans) {
    ans.push_back(path);
    for(int i=start;i<nums.size();i++) {
        if(i> start&&nums[i]==nums[i-1]) continue;
        path.push_back(nums[i]);
        dfs(nums,i+1,path,ans);
        path.pop_back();
    }
}

vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    vector<vector<int>> ans;
    vector<int> path;
    sort(nums.begin(),nums.end());
    dfs(nums,0,path,ans);
    return ans;
}`
    },
    {
        id: "letter-combinations-of-a-phone-number",
        leetcodeNum: 17,
        title: "Letter Combinations of a Phone Number",
        category: "backtracking",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `void dfs(string& digits,int idx,string& cur,vector<string>& mapping,vector<string>& ans) {
    if(idx==digits.size()) {
        ans.push_back(cur);
        return;
    }
    string letters=mapping[digits[idx]-'0'];
    for(int i=0;i<letters.size();i++) {
        cur.push_back(letters[i]);
        dfs(digits,idx+1,cur,mapping,ans);
        cur.pop_back();
    }
}

vector<string> letterCombinations(string digits) {
    if(digits.empty()) return {};
    vector<string> mapping={"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    vector<string> ans;
    string cur="";
    dfs(digits,0,cur,mapping,ans);
    return ans;
}`
    },
    {
        id: "palindrome-partitioning",
        leetcodeNum: 131,
        title: "Palindrome Partitioning",
        category: "backtracking",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `bool isPalindrome(string& s,int l,int r) {
    while(l<r) {
        if(s[l++]!=s[r--]) return false;
    }
    return true;
}

void dfs(string& s,int start,vector<string>& path,vector<vector<string>>& ans) {
    if(start==s.size()) {
        ans.push_back(path);
        return;
    }
    for(int end=start;end<s.size();end++) {
        if(isPalindrome(s,start,end)) {
            path.push_back(s.substr(start,end-start+1));
            dfs(s,end+1,path,ans);
            path.pop_back();
        }
    }
}

vector<vector<string>> partition(string s) {
    vector<vector<string>> ans;
    vector<string> path;
    dfs(s,0,path,ans);
    return ans;
}`
    },
    {
        id: "n-queens",
        leetcodeNum: 51,
        title: "N-Queens",
        category: "backtracking",
        difficulty: "hard",
        solved: true,
        sheet: "striver-a2z",
        code: `void solve(int col,int n,vector<string>& board,vector<vector<string>>& ans,vector<int>& leftRow,vector<int>& upperDiag,vector<int>& lowerDiag) {
    if(col==n) {
        ans.push_back(board);
        return;
    }
    for(int row=0;row<n;row++) {
        if(leftRow[row]==0&&lowerDiag[row+col]==0&&upperDiag[n-1 + col-row]==0) {
            board[row][col]='Q';
            leftRow[row]=1;
            lowerDiag[row+col]=1;
            upperDiag[n-1 + col-row]=1;
            solve(col+1,n,board,ans,leftRow,upperDiag,lowerDiag);
            board[row][col]='.';
            leftRow[row]=0;
            lowerDiag[row+col]=0;
            upperDiag[n-1 + col-row]=0;
        }
    }
}

vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> ans;
    vector<string> board(n,string(n,'.'));
    vector<int> leftRow(n,0);
    vector<int> upperDiag(2*n - 1,0);
    vector<int> lowerDiag(2*n - 1,0);
    solve(0,n,board,ans,leftRow,upperDiag,lowerDiag);
    return ans;
}`
    }
];
