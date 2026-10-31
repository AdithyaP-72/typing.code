export const problemsPart2 = [
    {
        id: "same-tree",
        leetcodeNum: 100,
        title: "Same Tree",
        category: "trees",
        difficulty: "easy",
        solved: true,
        code: `bool isSameTree(TreeNode* p, TreeNode* q){
    if(!p && !q) return true;
    if(!p || !q) return false;
    return p->val==q->val && isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}`
    },
    {
        id: "subtree-of-another-tree",
        leetcodeNum: 572,
        title: "Subtree of Another Tree",
        category: "trees",
        difficulty: "easy",
        solved: false,
        code: `bool isSame(TreeNode* p, TreeNode* q){
    if(!p && !q) return true;
    if(!p || !q) return false;
    return p->val==q->val && isSame(p->left, q->left) && isSame(p->right, q->right);
}

bool isSubtree(TreeNode* root, TreeNode* subRoot){
    if(!root) return false;
    if(isSame(root, subRoot)) return true;
    return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
}`
    },
    {
        id: "binary-tree-level-order-traversal",
        leetcodeNum: 102,
        title: "Binary Tree Level Order Traversal",
        category: "trees",
        difficulty: "medium",
        solved: true,
        code: `vector<vector<int>> levelOrder(TreeNode* root){
    vector<vector<int>> res;
    if(!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while(!q.empty()){
        int sz=q.size();
        vector<int> level;
        for(int i=0;i<sz;i++){
            TreeNode* node=q.front();
            q.pop();
            level.push_back(node->val);
            if(node->left) q.push(node->left);
            if(node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`
    },
    {
        id: "validate-binary-search-tree",
        leetcodeNum: 98,
        title: "Validate Binary Search Tree",
        category: "trees",
        difficulty: "medium",
        solved: true,
        code: `bool check(TreeNode* node, long lo, long hi){
    if(!node) return true;
    if(node->val<=lo || node->val>=hi) return false;
    return check(node->left, lo, node->val) && check(node->right, node->val, hi);
}

bool isValidBST(TreeNode* root){
    return check(root, LONG_MIN, LONG_MAX);
}`
    },
    {
        id: "kth-smallest-element-in-a-bst",
        leetcodeNum: 230,
        title: "Kth Smallest Element in a BST",
        category: "trees",
        difficulty: "medium",
        solved: false,
        code: `int kthSmallest(TreeNode* root, int k){
    stack<TreeNode*> st;
    TreeNode* cur=root;
    while(cur || !st.empty()){
        while(cur){
            st.push(cur);
            cur=cur->left;
        }
        cur=st.top();
        st.pop();
        k--;
        if(k==0) return cur->val;
        cur=cur->right;
    }
    return-1;
}`
    },
    {
        id: "construct-binary-tree-from-preorder-and-inorder-traversal",
        leetcodeNum: 105,
        title: "Construct Binary Tree from Preorder and Inorder Traversal",
        category: "trees",
        difficulty: "medium",
        solved: true,
        code: `TreeNode* build(vector<int>& pre, vector<int>& in, int ps, int pe, int is, int ie, unordered_map<int, int>& mp){
    if(ps> pe || is> ie) return nullptr;
    TreeNode* root=new TreeNode(pre[ps]);
    int mid=mp[pre[ps]];
    int leftSize=mid-is;
    root->left=build(pre, in, ps+1, ps+leftSize, is, mid-1, mp);
    root->right=build(pre, in, ps+leftSize+1, pe, mid+1, ie, mp);
    return root;
}

TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder){
    int n=preorder.size();
    unordered_map<int, int> mp;
    for(int i=0;i<n;i++) mp[inorder[i]]=i;
    return build(preorder, inorder, 0, n-1, 0, n-1, mp);
}`
    },
    {
        id: "binary-tree-maximum-path-sum",
        leetcodeNum: 124,
        title: "Binary Tree Maximum Path Sum",
        category: "trees",
        difficulty: "hard",
        solved: true,
        code: `int ans;

int dfs(TreeNode* node){
    if(!node) return 0;
    int l=max(0, dfs(node->left));
    int r=max(0, dfs(node->right));
    ans=max(ans, l+r + node->val);
    return max(l, r)+node->val;
}

int maxPathSum(TreeNode* root){
    ans=INT_MIN;
    dfs(root);
    return ans;
}`
    },
    {
        id: "lowest-common-ancestor-of-a-bst",
        leetcodeNum: 235,
        title: "Lowest Common Ancestor of a BST",
        category: "trees",
        difficulty: "medium",
        solved: false,
        code: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q){
    while(root){
        if(p->val<root->val && q->val<root->val)
            root=root->left;
        else if(p->val> root->val && q->val> root->val)
            root=root->right;
        else
            return root;
    }
    return nullptr;
}`
    },
    {
        id: "implement-trie",
        leetcodeNum: 208,
        title: "Implement Trie",
        category: "tries",
        difficulty: "medium",
        solved: false,
        code: `struct TrieNode{
    TrieNode* children[26]={};
    bool isEnd=false;
};

class Trie{
    TrieNode* root;
public:
    Trie(){ root=new TrieNode();}

    void insert(string word){
        TrieNode* cur=root;
        for(char c:word){
            int idx=c-'a';
            if(!cur->children[idx])
                cur->children[idx]=new TrieNode();
            cur=cur->children[idx];
        }
        cur->isEnd=true;
    }

    bool search(string word){
        TrieNode* cur=root;
        for(char c:word){
            int idx=c-'a';
            if(!cur->children[idx]) return false;
            cur=cur->children[idx];
        }
        return cur->isEnd;
    }

    bool startsWith(string prefix){
        TrieNode* cur=root;
        for(char c:prefix){
            int idx=c-'a';
            if(!cur->children[idx]) return false;
            cur=cur->children[idx];
        }
        return true;
    }
};`
    },
    {
        id: "design-add-and-search-words-data-structure",
        leetcodeNum: 211,
        title: "Design Add and Search Words Data Structure",
        category: "tries",
        difficulty: "medium",
        solved: false,
        code: `struct TrieNode{
    TrieNode* children[26]={};
    bool isEnd=false;
};

class WordDictionary{
    TrieNode* root;

    bool dfs(string& word, int i, TrieNode* node){
        if(i==word.size()) return node->isEnd;
        if(word[i]=='.'){
            for(int j=0;j<26;j++){
                if(node->children[j] && dfs(word, i+1, node->children[j]))
                    return true;
            }
            return false;
        }
        int idx=word[i]-'a';
        if(!node->children[idx]) return false;
        return dfs(word, i+1, node->children[idx]);
    }

public:
    WordDictionary(){ root=new TrieNode();}

    void addWord(string word){
        TrieNode* cur=root;
        for(char c:word){
            int idx=c-'a';
            if(!cur->children[idx])
                cur->children[idx]=new TrieNode();
            cur=cur->children[idx];
        }
        cur->isEnd=true;
    }

    bool search(string word){
        return dfs(word, 0, root);
    }
};`
    },
    {
        id: "word-search-ii",
        leetcodeNum: 212,
        title: "Word Search II",
        category: "tries",
        difficulty: "hard",
        solved: false,
        code: `struct TrieNode{
    TrieNode* children[26]={};
    string word="";
};

class Solution{
    vector<string> res;

    void dfs(vector<vector<char>>& board, int i, int j, TrieNode* node){
        char c=board[i][j];
        if(c=='#' || !node->children[c-'a']) return;
        node=node->children[c-'a'];
        if(!node->word.empty()){
            res.push_back(node->word);
            node->word="";
        }
        board[i][j]='#';
        int m=board.size(), n=board[0].size();
        if(i>0) dfs(board, i-1, j, node);
        if(i<m-1) dfs(board, i+1, j, node);
        if(j>0) dfs(board, i, j-1, node);
        if(j<n-1) dfs(board, i, j+1, node);
        board[i][j]=c;
    }

public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words){
        TrieNode* root=new TrieNode();
        for(string& w:words){
            TrieNode* cur=root;
            for(char c:w){
                int idx=c-'a';
                if(!cur->children[idx])
                    cur->children[idx]=new TrieNode();
                cur=cur->children[idx];
            }
            cur->word=w;
        }
        int m=board.size(), n=board[0].size();
        for(int i=0;i<m;i++)
            for(int j=0;j<n;j++)
                dfs(board, i, j, root);
        return res;
    }
};`
    },
    {
        id: "number-of-islands",
        leetcodeNum: 200,
        title: "Number of Islands",
        category: "graphs",
        difficulty: "medium",
        solved: false,
        code: `void dfs(vector<vector<char>>& grid, int i, int j){
    int m=grid.size(), n=grid[0].size();
    if(i<0 || i>=m || j<0 || j>=n || grid[i][j]=='0') return;
    grid[i][j]='0';
    dfs(grid, i+1, j);
    dfs(grid, i-1, j);
    dfs(grid, i, j+1);
    dfs(grid, i, j-1);
}

int numIslands(vector<vector<char>>& grid){
    int m=grid.size(), n=grid[0].size();
    int cnt=0;
    for(int i=0;i<m;i++)
        for(int j=0;j<n;j++)
            if(grid[i][j]=='1'){
                cnt++;
                dfs(grid, i, j);
            }
    return cnt;
}`
    },
    {
        id: "clone-graph",
        leetcodeNum: 133,
        title: "Clone Graph",
        category: "graphs",
        difficulty: "medium",
        solved: false,
        code: `unordered_map<Node*, Node*> mp;

Node* cloneGraph(Node* node){
    if(!node) return nullptr;
    if(mp.count(node)) return mp[node];
    Node* clone=new Node(node->val);
    mp[node]=clone;
    for(Node* nb:node->neighbors)
        clone->neighbors.push_back(cloneGraph(nb));
    return clone;
}`
    },
    {
        id: "pacific-atlantic-water-flow",
        leetcodeNum: 417,
        title: "Pacific Atlantic Water Flow",
        category: "graphs",
        difficulty: "medium",
        solved: false,
        code: `int m, n;
int dirs[4][2]={{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

void dfs(vector<vector<int>>& heights, vector<vector<bool>>& visited, int i, int j){
    visited[i][j]=true;
    for(int d=0;d<4;d++){
        int ni=i+dirs[d][0], nj=j+dirs[d][1];
        if(ni>=0 && ni<m && nj>=0 && nj<n && !visited[ni][nj] && heights[ni][nj]>=heights[i][j])
            dfs(heights, visited, ni, nj);
    }
}

vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights){
    m=heights.size();
    n=heights[0].size();
    vector<vector<bool>> pac(m, vector<bool>(n, false));
    vector<vector<bool>> atl(m, vector<bool>(n, false));
    for(int i=0;i<m;i++){
        dfs(heights, pac, i, 0);
        dfs(heights, atl, i, n-1);
    }
    for(int j=0;j<n;j++){
        dfs(heights, pac, 0, j);
        dfs(heights, atl, m-1, j);
    }
    vector<vector<int>> res;
    for(int i=0;i<m;i++)
        for(int j=0;j<n;j++)
            if(pac[i][j] && atl[i][j])
                res.push_back({i, j});
    return res;
}`
    },
    {
        id: "course-schedule",
        leetcodeNum: 207,
        title: "Course Schedule",
        category: "graphs",
        difficulty: "medium",
        solved: true,
        code: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites){
    vector<vector<int>> adj(numCourses);
    vector<int> indeg(numCourses, 0);
    for(vector<int>& p:prerequisites){
        adj[p[1]].push_back(p[0]);
        indeg[p[0]]++;
    }
    queue<int> q;
    for(int i=0;i<numCourses;i++)
        if(indeg[i]==0) q.push(i);
    int cnt=0;
    while(!q.empty()){
        int cur=q.front();
        q.pop();
        cnt++;
        for(int nb:adj[cur])
            if(--indeg[nb]==0) q.push(nb);
    }
    return cnt==numCourses;
}`
    },
    {
        id: "palindromic-substrings",
        leetcodeNum: 647,
        title: "Palindromic Substrings",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: false,
        code: `int countSubstrings(string s){
    int n=s.size(), cnt=0;
    for(int i=0;i<n;i++){
        int l=i, r=i;
        while(l>=0 && r<n && s[l]==s[r]){
            cnt++;
            l--;
            r++;
        }
        l=i;
        r=i+1;
        while(l>=0 && r<n && s[l]==s[r]){
            cnt++;
            l--;
            r++;
        }
    }
    return cnt;
}`
    },
    {
        id: "longest-palindromic-substring",
        leetcodeNum: 5,
        title: "Longest Palindromic Substring",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        code: `string longestPalindrome(string s){
    int n=s.size(), start=0, maxLen=1;
    for(int i=0;i<n;i++){
        int l=i, r=i;
        while(l>=0 && r<n && s[l]==s[r]){ l--;r++;}
        if(r-l - 1> maxLen){ maxLen=r-l - 1;start=l+1;}
        l=i;r=i+1;
        while(l>=0 && r<n && s[l]==s[r]){ l--;r++;}
        if(r-l - 1> maxLen){ maxLen=r-l - 1;start=l+1;}
    }
    return s.substr(start, maxLen);
}`
    },
    {
        id: "climbing-stairs",
        leetcodeNum: 70,
        title: "Climbing Stairs",
        category: "dynamic-programming",
        difficulty: "easy",
        solved: true,
        code: `int climbStairs(int n){
    if(n<=2) return n;
    int a=1, b=2;
    for(int i=3;i<=n;i++){
        int c=a+b;
        a=b;
        b=c;
    }
    return b;
}`
    },
    {
        id: "coin-change",
        leetcodeNum: 322,
        title: "Coin Change",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        code: `int coinChange(vector<int>& coins, int amount){
    vector<int> dp(amount+1, amount+1);
    dp[0]=0;
    for(int i=1;i<=amount;i++)
        for(int c:coins)
            if(c<=i)
                dp[i]=min(dp[i], dp[i-c]+1);
    return dp[amount]> amount ? -1 : dp[amount];
}`
    },
    {
        id: "longest-increasing-subsequence",
        leetcodeNum: 300,
        title: "Longest Increasing Subsequence",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        code: `int lengthOfLIS(vector<int>& nums){
    vector<int> tails;
    for(int x:nums){
        int lo=0, hi=tails.size();
        while(lo<hi){
            int mid=(lo+hi)/2;
            if(tails[mid]<x) lo=mid+1;
            else hi=mid;
        }
        if(lo==tails.size()) tails.push_back(x);
        else tails[lo]=x;
    }
    return tails.size();
}`
    },
    {
        id: "longest-common-subsequence",
        leetcodeNum: 1143,
        title: "Longest Common Subsequence",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        code: `int longestCommonSubsequence(string text1, string text2){
    int m=text1.size(), n=text2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for(int i=1;i<=m;i++)
        for(int j=1;j<=n;j++)
            if(text1[i-1]==text2[j-1])
                dp[i][j]=dp[i-1][j-1]+1;
            else
                dp[i][j]=max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}`
    },
    {
        id: "word-break",
        leetcodeNum: 139,
        title: "Word Break",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        code: `bool wordBreak(string s, vector<string>& wordDict){
    int n=s.size();
    unordered_set<string> dict(wordDict.begin(), wordDict.end());
    vector<bool> dp(n+1, false);
    dp[0]=true;
    for(int i=1;i<=n;i++)
        for(int j=0;j<i;j++)
            if(dp[j] && dict.count(s.substr(j, i-j))){
                dp[i]=true;
                break;
            }
    return dp[n];
}`
    },
    {
        id: "house-robber",
        leetcodeNum: 198,
        title: "House Robber",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        code: `int rob(vector<int>& nums){
    int n=nums.size();
    if(n==1) return nums[0];
    int a=0, b=0;
    for(int i=0;i<n;i++){
        int c=max(b, a+nums[i]);
        a=b;
        b=c;
    }
    return b;
}`
    },
    {
        id: "house-robber-ii",
        leetcodeNum: 213,
        title: "House Robber II",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: true,
        code: `int helper(vector<int>& nums, int lo, int hi){
    int a=0, b=0;
    for(int i=lo;i<=hi;i++){
        int c=max(b, a+nums[i]);
        a=b;
        b=c;
    }
    return b;
}

int rob(vector<int>& nums){
    int n=nums.size();
    if(n==1) return nums[0];
    return max(helper(nums, 0, n-2), helper(nums, 1, n-1));
}`
    },
    {
        id: "decode-ways",
        leetcodeNum: 91,
        title: "Decode Ways",
        category: "dynamic-programming",
        difficulty: "medium",
        solved: false,
        code: `int numDecodings(string s){
    int n=s.size();
    if(n==0 || s[0]=='0') return 0;
    int a=1, b=1;
    for(int i=1;i<n;i++){
        int c=0;
        if(s[i]!='0') c+=b;
        int two=stoi(s.substr(i-1, 2));
        if(two>=10 && two<=26) c+=a;
        a=b;
        b=c;
    }
    return b;
}`
    }
];
