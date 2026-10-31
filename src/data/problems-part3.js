export const problemsPart3 = [
    {
        id: "unique-paths",
        leetcodeNum: 62,
        title: "Unique Paths",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        code: `int uniquePaths(int m, int n){
    vector<vector<int>> dp(m, vector<int>(n, 1));
    for(int i=1;i<m;i++){
        for(int j=1;j<n;j++){
            dp[i][j]=dp[i-1][j]+dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}`
    },
    {
        id: "jump-game",
        leetcodeNum: 55,
        title: "Jump Game",
        category: "greedy",
        difficulty: "medium",
        solved: true,
        code: `bool canJump(vector<int>& nums){
    int reach=0;
    for(int i=0;i<nums.size();i++){
        if(i> reach) return false;
        reach=max(reach, i+nums[i]);
    }
    return true;
}`
    },
    {
        id: "maximum-subarray",
        leetcodeNum: 53,
        title: "Maximum Subarray",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        code: `int maxSubArray(vector<int>& nums){
    int cur=nums[0], res=nums[0];
    for(int i=1;i<nums.size();i++){
        cur=max(nums[i], cur+nums[i]);
        res=max(res, cur);
    }
    return res;
}`
    },
    {
        id: "maximum-product-subarray",
        leetcodeNum: 152,
        title: "Maximum Product Subarray",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: false,
        code: `int maxProduct(vector<int>& nums){
    int res=nums[0];
    int mn=1, mx=1;
    for(int i=0;i<nums.size();i++){
        int a=mx*nums[i], b=mn*nums[i];
        mx=max({nums[i], a, b});
        mn=min({nums[i], a, b});
        res=max(res, mx);
    }
    return res;
}`
    },
    {
        id: "combination-sum",
        leetcodeNum: 39,
        title: "Combination Sum",
        category: "backtracking",
        difficulty: "medium",
        solved: true,
        code: `vector<vector<int>> res;

void dfs(vector<int>& c, int target, int start, vector<int>& path){
    if(target==0){
        res.push_back(path);
        return;
    }
    for(int i=start;i<c.size();i++){
        if(c[i]> target) break;
        path.push_back(c[i]);
        dfs(c, target-c[i], i, path);
        path.pop_back();
    }
}

vector<vector<int>> combinationSum(vector<int>& candidates, int target){
    res.clear();
    sort(candidates.begin(), candidates.end());
    vector<int> path;
    dfs(candidates, target, 0, path);
    return res;
}`
    },
    {
        id: "word-search",
        leetcodeNum: 79,
        title: "Word Search",
        category: "backtracking",
        difficulty: "medium",
        solved: true,
        code: `int m, n;
int dx[4]={0, 0, 1, -1};
int dy[4]={1, -1, 0, 0};

bool dfs(vector<vector<char>>& board, string& word, int i, int j, int k){
    if(k==word.size()) return true;
    if(i<0 || i>=m || j<0 || j>=n) return false;
    if(board[i][j]!=word[k]) return false;
    char tmp=board[i][j];
    board[i][j]='#';
    for(int d=0;d<4;d++){
        if(dfs(board, word, i+dx[d], j+dy[d], k+1))
            return true;
    }
    board[i][j]=tmp;
    return false;
}

bool exist(vector<vector<char>>& board, string word){
    m=board.size();
    n=board[0].size();
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            if(dfs(board, word, i, j, 0))
                return true;
        }
    }
    return false;
}`
    },
    {
        id: "merge-intervals",
        leetcodeNum: 56,
        title: "Merge Intervals",
        category: "intervals",
        difficulty: "medium",
        solved: true,
        code: `vector<vector<int>> merge(vector<vector<int>>& intervals){
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res;
    res.push_back(intervals[0]);
    for(int i=1;i<intervals.size();i++){
        if(intervals[i][0]<=res.back()[1]){
            res.back()[1]=max(res.back()[1], intervals[i][1]);
        } else{
            res.push_back(intervals[i]);
        }
    }
    return res;
}`
    },
    {
        id: "insert-interval",
        leetcodeNum: 57,
        title: "Insert Interval",
        category: "intervals",
        difficulty: "medium",
        solved: true,
        code: `vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval){
    vector<vector<int>> res;
    int i=0, n=intervals.size();
    while(i<n && intervals[i][1]<newInterval[0]){
        res.push_back(intervals[i]);
        i++;
    }
    while(i<n && intervals[i][0]<=newInterval[1]){
        newInterval[0]=min(newInterval[0], intervals[i][0]);
        newInterval[1]=max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.push_back(newInterval);
    while(i<n){
        res.push_back(intervals[i]);
        i++;
    }
    return res;
}`
    },
    {
        id: "non-overlapping-intervals",
        leetcodeNum: 435,
        title: "Non-overlapping Intervals",
        category: "intervals",
        difficulty: "medium",
        solved: true,
        code: `int eraseOverlapIntervals(vector<vector<int>>& intervals){
    sort(intervals.begin(), intervals.end(), [](vector<int>& a, vector<int>& b){
        return a[1]<b[1];
    });
    int res=0, end=intervals[0][1];
    for(int i=1;i<intervals.size();i++){
        if(intervals[i][0]<end){
            res++;
        } else{
            end=intervals[i][1];
        }
    }
    return res;
}`
    },
    {
        id: "rotate-image",
        leetcodeNum: 48,
        title: "Rotate Image",
        category: "math-bit",
        difficulty: "medium",
        solved: false,
        code: `void rotate(vector<vector<int>>& matrix){
    int n=matrix.size();
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    for(int i=0;i<n;i++){
        reverse(matrix[i].begin(), matrix[i].end());
    }
}`
    },
    {
        id: "spiral-matrix",
        leetcodeNum: 54,
        title: "Spiral Matrix",
        category: "math-bit",
        difficulty: "medium",
        solved: false,
        code: `vector<int> spiralOrder(vector<vector<int>>& matrix){
    vector<int> res;
    int top=0, bot=matrix.size()-1;
    int left=0, right=matrix[0].size()-1;
    while(top<=bot && left<=right){
        for(int j=left;j<=right;j++)
            res.push_back(matrix[top][j]);
        top++;
        for(int i=top;i<=bot;i++)
            res.push_back(matrix[i][right]);
        right--;
        if(top<=bot){
            for(int j=right;j>=left;j--)
                res.push_back(matrix[bot][j]);
            bot--;
        }
        if(left<=right){
            for(int i=bot;i>=top;i--)
                res.push_back(matrix[i][left]);
            left++;
        }
    }
    return res;
}`
    },
    {
        id: "set-matrix-zeroes",
        leetcodeNum: 73,
        title: "Set Matrix Zeroes",
        category: "math-bit",
        difficulty: "medium",
        solved: false,
        code: `void setZeroes(vector<vector<int>>& matrix){
    int m=matrix.size(), n=matrix[0].size();
    bool firstRow=false, firstCol=false;
    for(int i=0;i<m;i++){
        if(matrix[i][0]==0) firstCol=true;
    }
    for(int j=0;j<n;j++){
        if(matrix[0][j]==0) firstRow=true;
    }
    for(int i=1;i<m;i++){
        for(int j=1;j<n;j++){
            if(matrix[i][j]==0){
                matrix[i][0]=0;
                matrix[0][j]=0;
            }
        }
    }
    for(int i=1;i<m;i++){
        for(int j=1;j<n;j++){
            if(matrix[i][0]==0 || matrix[0][j]==0)
                matrix[i][j]=0;
        }
    }
    if(firstRow){
        for(int j=0;j<n;j++) matrix[0][j]=0;
    }
    if(firstCol){
        for(int i=0;i<m;i++) matrix[i][0]=0;
    }
}`
    },
    {
        id: "missing-number",
        leetcodeNum: 268,
        title: "Missing Number",
        category: "math-bit",
        difficulty: "easy",
        solved: true,
        code: `int missingNumber(vector<int>& nums){
    int n=nums.size();
    int res=n;
    for(int i=0;i<n;i++){
        res ^=i ^ nums[i];
    }
    return res;
}`
    },
    {
        id: "reverse-bits",
        leetcodeNum: 190,
        title: "Reverse Bits",
        category: "math-bit",
        difficulty: "easy",
        solved: false,
        code: `uint32_t reverseBits(uint32_t n){
    uint32_t res=0;
    for(int i=0;i<32;i++){
        res=(res <<1) | (n & 1);
        n >>=1;
    }
    return res;
}`
    },
    {
        id: "number-of-1-bits",
        leetcodeNum: 191,
        title: "Number of 1 Bits",
        category: "math-bit",
        difficulty: "easy",
        solved: false,
        code: `int hammingWeight(int n){
    int res=0;
    while(n){
        res+=n & 1;
        n >>=1;
    }
    return res;
}`
    },
    {
        id: "counting-bits",
        leetcodeNum: 338,
        title: "Counting Bits",
        category: "math-bit",
        difficulty: "easy",
        solved: false,
        code: `vector<int> countBits(int n){
    vector<int> dp(n+1, 0);
    for(int i=1;i<=n;i++){
        dp[i]=dp[i >> 1]+(i & 1);
    }
    return dp;
}`
    },
    {
        id: "sum-of-two-integers",
        leetcodeNum: 371,
        title: "Sum of Two Integers",
        category: "math-bit",
        difficulty: "medium",
        solved: false,
        code: `int getSum(int a, int b){
    while(b!=0){
        int carry=a & b;
        a=a ^ b;
        b=(unsigned)carry <<1;
    }
    return a;
}`
    },
    {
        id: "find-median-from-data-stream",
        leetcodeNum: 295,
        title: "Find Median from Data Stream",
        category: "heap",
        difficulty: "hard",
        solved: false,
        code: `priority_queue<int> lo;
priority_queue<int, vector<int>, greater<int>> hi;

MedianFinder(){}

void addNum(int num){
    lo.push(num);
    hi.push(lo.top());
    lo.pop();
    if(hi.size()> lo.size()){
        lo.push(hi.top());
        hi.pop();
    }
}

double findMedian(){
    if(lo.size()> hi.size())
        return lo.top();
    return (lo.top()+hi.top())/2.0;
}`
    },
    {
        id: "serialize-and-deserialize-binary-tree",
        leetcodeNum: 297,
        title: "Serialize and Deserialize Binary Tree",
        category: "trees",
        difficulty: "hard",
        solved: false,
        code: `string serialize(TreeNode* root){
    if(!root) return "N";
    return to_string(root->val) + ", " + serialize(root->left) + ", " + serialize(root->right);
}

TreeNode* helper(istringstream& ss){
    string val;
    getline(ss, val, ', ');
    if(val=="N") return nullptr;
    TreeNode* node=new TreeNode(stoi(val));
    node->left=helper(ss);
    node->right=helper(ss);
    return node;
}

TreeNode* deserialize(string data){
    istringstream ss(data);
    return helper(ss);
}`
    },
    {
        id: "graph-valid-tree",
        leetcodeNum: 261,
        title: "Graph Valid Tree",
        category: "graphs",
        difficulty: "medium",
        solved: false,
        code: `vector<int> parent, rank_;

int find(int x){
    if(parent[x]!=x)
        parent[x]=find(parent[x]);
    return parent[x];
}

bool unite(int a, int b){
    int pa=find(a), pb=find(b);
    if(pa==pb) return false;
    if(rank_[pa]<rank_[pb]) swap(pa, pb);
    parent[pb]=pa;
    if(rank_[pa]==rank_[pb]) rank_[pa]++;
    return true;
}

bool validTree(int n, vector<vector<int>>& edges){
    if(edges.size()!=n-1) return false;
    parent.resize(n);
    rank_.resize(n, 0);
    for(int i=0;i<n;i++) parent[i]=i;
    for(vector<int>& e:edges){
        if(!unite(e[0], e[1])) return false;
    }
    return true;
}`
    },
    {
        id: "number-of-connected-components",
        leetcodeNum: 323,
        title: "Number of Connected Components in an Undirected Graph",
        category: "graphs",
        difficulty: "medium",
        solved: false,
        code: `vector<int> parent, rank_;

int find(int x){
    if(parent[x]!=x)
        parent[x]=find(parent[x]);
    return parent[x];
}

void unite(int a, int b){
    int pa=find(a), pb=find(b);
    if(pa==pb) return;
    if(rank_[pa]<rank_[pb]) swap(pa, pb);
    parent[pb]=pa;
    if(rank_[pa]==rank_[pb]) rank_[pa]++;
}

int countComponents(int n, vector<vector<int>>& edges){
    parent.resize(n);
    rank_.resize(n, 0);
    for(int i=0;i<n;i++) parent[i]=i;
    for(vector<int>& e:edges){
        unite(e[0], e[1]);
    }
    set<int> s;
    for(int i=0;i<n;i++){
        s.insert(find(i));
    }
    return s.size();
}`
    },
    {
        id: "meeting-rooms-ii",
        leetcodeNum: 253,
        title: "Meeting Rooms II",
        category: "intervals",
        difficulty: "medium",
        solved: false,
        code: `int minMeetingRooms(vector<vector<int>>& intervals){
    sort(intervals.begin(), intervals.end());
    priority_queue<int, vector<int>, greater<int>> pq;
    for(vector<int>& iv:intervals){
        if(!pq.empty() && pq.top()<=iv[0]){
            pq.pop();
        }
        pq.push(iv[1]);
    }
    return pq.size();
}`
    },
    {
        id: "meeting-rooms",
        leetcodeNum: 252,
        title: "Meeting Rooms",
        category: "intervals",
        difficulty: "easy",
        solved: false,
        code: `bool canAttendMeetings(vector<vector<int>>& intervals){
    sort(intervals.begin(), intervals.end());
    for(int i=1;i<intervals.size();i++){
        if(intervals[i][0]<intervals[i-1][1])
            return false;
    }
    return true;
}`
    },
    {
        id: "alien-dictionary",
        leetcodeNum: 269,
        title: "Alien Dictionary",
        category: "graphs",
        difficulty: "hard",
        solved: false,
        code: `string alienOrder(vector<string>& words){
    unordered_map<char, unordered_set<char>> adj;
    unordered_map<char, int> indeg;
    for(string& w:words){
        for(char c:w){
            indeg[c]=0;
        }
    }
    for(int i=0;i<words.size()-1;i++){
        string& w1=words[i];
        string& w2=words[i+1];
        int len=min(w1.size(), w2.size());
        if(w1.size()> w2.size() && w1.substr(0, len)==w2.substr(0, len))
            return "";
        for(int j=0;j<len;j++){
            if(w1[j]!=w2[j]){
                if(!adj[w1[j]].count(w2[j])){
                    adj[w1[j]].insert(w2[j]);
                    indeg[w2[j]]++;
                }
                break;
            }
        }
    }
    queue<char> q;
    for(auto& p:indeg){
        if(p.second==0) q.push(p.first);
    }
    string res;
    while(!q.empty()){
        char c=q.front();
        q.pop();
        res+=c;
        for(char nb:adj[c]){
            indeg[nb]--;
            if(indeg[nb]==0) q.push(nb);
        }
    }
    if(res.size()!=indeg.size()) return "";
    return res;
}`
    },
    {
        id: "encode-and-decode-strings",
        leetcodeNum: 271,
        title: "Encode and Decode Strings",
        category: "arrays-hashing",
        difficulty: "medium",
        solved: false,
        code: `string encode(vector<string>& strs){
    string res;
    for(string& s:strs){
        res+=to_string(s.size()) + "#" + s;
    }
    return res;
}

vector<string> decode(string s){
    vector<string> res;
    int i=0;
    while(i<s.size()){
        int j=s.find('#', i);
        int len=stoi(s.substr(i, j-i));
        res.push_back(s.substr(j+1, len));
        i=j+1 + len;
    }
    return res;
}`
    },
];
