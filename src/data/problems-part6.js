export const problemsPart6 = [
    {
        id: "next-greater-element-i",
        leetcodeNum: 496,
        title: "Next Greater Element I",
        category: "stack",
        difficulty: "easy",
        solved: true,
        sheet: "striver-a2z",
        code: `vector<int> nextGreaterElement(vector<int>& nums1,vector<int>& nums2) {
    unordered_map<int,int> mp;
    stack<int> st;
    for(int i=nums2.size()-1;i>=0;i--) {
        while(!st.empty()&&st.top()<=nums2[i]) {
            st.pop();
        }
        mp[nums2[i]]=st.empty() ? -1 : st.top();
        st.push(nums2[i]);
    }
    vector<int> ans;
    for(int x:nums1) {
        ans.push_back(mp[x]);
    }
    return ans;
}`
    },
    {
        id: "asteroid-collision",
        leetcodeNum: 735,
        title: "Asteroid Collision",
        category: "stack",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `vector<int> asteroidCollision(vector<int>& asteroids) {
    vector<int> st;
    for(int a:asteroids) {
        bool alive=true;
        while(alive&&a<0&&!st.empty()&&st.back()>0) {
            if(st.back() < -a) {
                st.pop_back();
            } else if(st.back()==-a) {
                st.pop_back();
                alive=false;
            } else {
                alive=false;
            }
        }
        if(alive) {
            st.push_back(a);
        }
    }
    return st;
}`
    },
    {
        id: "sum-of-subarray-minimums",
        leetcodeNum: 907,
        title: "Sum of Subarray Minimums",
        category: "stack",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int sumSubarrayMins(vector<int>& arr) {
    int n=arr.size();
    long long mod=1e9+7;
    vector<int> left(n),right(n);
    stack<int> s1,s2;
    for(int i=0;i<n;i++) {
        while(!s1.empty()&&arr[s1.top()]> arr[i]) {
            s1.pop();
        }
        left[i]=s1.empty() ? i+1 : i-s1.top();
        s1.push(i);
    }
    for(int i=n-1;i>=0;i--) {
        while(!s2.empty()&&arr[s2.top()]>=arr[i]) {
            s2.pop();
        }
        right[i]=s2.empty() ? n-i : s2.top()-i;
        s2.push(i);
    }
    long long ans=0;
    for(int i=0;i<n;i++) {
        ans=(ans+(long long)arr[i]*left[i]%mod*right[i]%mod)%mod;
    }
    return ans;
}`
    },
    {
        id: "sum-of-subarray-ranges",
        leetcodeNum: 2104,
        title: "Sum of Subarray Ranges",
        category: "stack",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `long long subArrayRanges(vector<int>& nums) {
    long long ans=0;
    int n=nums.size();
    for(int i=0;i<n;i++) {
        int mn=nums[i],mx=nums[i];
        for(int j=i;j<n;j++) {
            mn=min(mn,nums[j]);
            mx=max(mx,nums[j]);
            ans+=mx-mn;
        }
    }
    return ans;
}`
    },
    {
        id: "remove-k-digits",
        leetcodeNum: 402,
        title: "Remove K Digits",
        category: "stack",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `string removeKdigits(string num,int k) {
    string st;
    for(char c:num) {
        while(!st.empty()&&k>0&&st.back()> c) {
            st.pop_back();
            k--;
        }
        if(!st.empty()||c!='0') {
            st.push_back(c);
        }
    }
    while(!st.empty()&&k>0) {
        st.pop_back();
        k--;
    }
    return st.empty() ? "0" : st;
}`
    },
    {
        id: "next-smaller-element",
        leetcodeNum: 0,
        title: "Next Smaller Element",
        category: "stack",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `vector<int> prevSmaller(vector<int>& arr) {
    int n=arr.size();
    vector<int> ans(n);
    stack<int> st;
    for(int i=0;i<n;i++) {
        while(!st.empty()&&st.top()>=arr[i]) {
            st.pop();
        }
        ans[i]=st.empty() ? -1 : st.top();
        st.push(arr[i]);
    }
    return ans;
}`
    },
    {
        id: "min-stack",
        leetcodeNum: 155,
        title: "Min Stack",
        category: "stack",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `stack<pair<int,int>> st;

MinStack() {}

void push(int val) {
    int mn=st.empty() ? val : min(val,st.top().second);
    st.push({val,mn});
}

void pop() {
    st.pop();
}

int top() {
    return st.top().first;
}

int getMin() {
    return st.top().second;
}`
    },
    {
        id: "trapping-rain-water",
        leetcodeNum: 42,
        title: "Trapping Rain Water",
        category: "stack",
        difficulty: "hard",
        solved: true,
        sheet: "striver-a2z",
        code: `int trap(vector<int>& height) {
    int n=height.size();
    int l=0,r=n-1;
    int maxL=0,maxR=0;
    int ans=0;
    while(l<r) {
        if(height[l]<=height[r]) {
            if(height[l]>=maxL) maxL=height[l];
            else ans+=maxL-height[l];
            l++;
        } else {
            if(height[r]>=maxR) maxR=height[r];
            else ans+=maxR-height[r];
            r--;
        }
    }
    return ans;
}`
    },
    {
        id: "largest-rectangle-in-histogram",
        leetcodeNum: 84,
        title: "Largest Rectangle in Histogram",
        category: "stack",
        difficulty: "hard",
        solved: true,
        sheet: "striver-a2z",
        code: `int largestRectangleArea(vector<int>& heights) {
    int n=heights.size();
    stack<int> st;
    int maxA=0;
    for(int i=0;i<=n;i++) {
        int h=(i==n) ? 0 : heights[i];
        while(!st.empty()&&heights[st.top()]>=h) {
            int height=heights[st.top()];
            st.pop();
            int width=st.empty() ? i : i-st.top()-1;
            maxA=max(maxA,height*width);
        }
        st.push(i);
    }
    return maxA;
}`
    },
    {
        id: "maximal-rectangle",
        leetcodeNum: 85,
        title: "Maximal Rectangle",
        category: "stack",
        difficulty: "hard",
        solved: true,
        sheet: "striver-a2z",
        code: `int maximalRectangle(vector<vector<char>>& matrix) {
    if(matrix.empty()) return 0;
    int n=matrix[0].size();
    vector<int> h(n,0);
    int ans=0;
    for(auto& row:matrix) {
        for(int j=0;j<n;j++) {
            h[j]=(row[j]=='1') ? h[j]+1 : 0;
        }
        stack<int> st;
        for(int j=0;j<=n;j++) {
            int cur=(j==n) ? 0 : h[j];
            while(!st.empty()&&h[st.top()]>=cur) {
                int height=h[st.top()];
                st.pop();
                int width=st.empty() ? j : j-st.top()-1;
                ans=max(ans,height*width);
            }
            st.push(j);
        }
    }
    return ans;
}`
    },
    {
        id: "balanced-binary-tree",
        leetcodeNum: 110,
        title: "Balanced Binary Tree",
        category: "trees",
        difficulty: "easy",
        solved: true,
        sheet: "striver-a2z",
        code: `int height(TreeNode* root) {
    if(!root) return 0;
    int lh=height(root->left);
    if(lh==-1) return-1;
    int rh=height(root->right);
    if(rh==-1) return-1;
    if(abs(lh-rh)>1) return-1;
    return 1+max(lh,rh);
}

bool isBalanced(TreeNode* root) {
    return height(root)!=-1;
}`
    },
    {
        id: "diameter-of-binary-tree",
        leetcodeNum: 543,
        title: "Diameter of Binary Tree",
        category: "trees",
        difficulty: "easy",
        solved: true,
        sheet: "striver-a2z",
        code: `int diameterOfBinaryTree(TreeNode* root) {
    int dia=0;
    height(root,dia);
    return dia;
}

int height(TreeNode* node,int& dia) {
    if(!node) return 0;
    int lh=height(node->left,dia);
    int rh=height(node->right,dia);
    dia=max(dia,lh+rh);
    return 1+max(lh,rh);
}`
    },
    {
        id: "binary-tree-zigzag-level-order-traversal",
        leetcodeNum: 103,
        title: "Binary Tree Zigzag Level Order Traversal",
        category: "trees",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
    if(!root) return {};
    vector<vector<int>> res;
    queue<TreeNode*> q;
    q.push(root);
    bool ltr=true;
    while(!q.empty()) {
        int sz=q.size();
        vector<int> row(sz);
        for(int i=0;i<sz;i++) {
            TreeNode* cur=q.front();
            q.pop();
            int idx=ltr ? i : sz-1 - i;
            row[idx]=cur->val;
            if(cur->left) q.push(cur->left);
            if(cur->right) q.push(cur->right);
        }
        ltr=!ltr;
        res.push_back(row);
    }
    return res;
}`
    },
    {
        id: "boundary-traversal-of-binary-tree",
        leetcodeNum: 0,
        title: "Boundary Traversal of Binary Tree",
        category: "trees",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `bool isLeaf(TreeNode* node) {
    return !node->left&&!node->right;
}

void addLeftBoundary(TreeNode* root,vector<int>& res) {
    TreeNode* cur=root->left;
    while(cur) {
        if(!isLeaf(cur)) res.push_back(cur->val);
        if(cur->left) cur=cur->left;
        else cur=cur->right;
    }
}

void addLeaves(TreeNode* root,vector<int>& res) {
    if(isLeaf(root)) {
        res.push_back(root->val);
        return;
    }
    if(root->left) addLeaves(root->left,res);
    if(root->right) addLeaves(root->right,res);
}

void addRightBoundary(TreeNode* root,vector<int>& res) {
    TreeNode* cur=root->right;
    vector<int> tmp;
    while(cur) {
        if(!isLeaf(cur)) tmp.push_back(cur->val);
        if(cur->right) cur=cur->right;
        else cur=cur->left;
    }
    for(int i=tmp.size()-1;i>=0;i--) res.push_back(tmp[i]);
}

vector<int> boundary(TreeNode* root) {
    if(!root) return {};
    vector<int> res;
    if(!isLeaf(root)) res.push_back(root->val);
    addLeftBoundary(root,res);
    addLeaves(root,res);
    addRightBoundary(root,res);
    return res;
}`
    },
    {
        id: "vertical-order-traversal",
        leetcodeNum: 987,
        title: "Vertical Order Traversal of a Binary Tree",
        category: "trees",
        difficulty: "hard",
        solved: true,
        sheet: "striver-a2z",
        code: `vector<vector<int>> verticalTraversal(TreeNode* root) {
    map<int,map<int,multiset<int>>> nodes;
    queue<pair<TreeNode*,pair<int,int>>> q;
    q.push({root,{0,0}});
    while(!q.empty()) {
        auto p=q.front();
        q.pop();
        TreeNode* node=p.first;
        int x=p.second.first,y=p.second.second;
        nodes[x][y].insert(node->val);
        if(node->left) q.push({node->left,{x-1,y+1}});
        if(node->right) q.push({node->right,{x+1,y+1}});
    }
    vector<vector<int>> ans;
    for(auto& p:nodes) {
        vector<int> col;
        for(auto& q:p.second) {
            col.insert(col.end(),q.second.begin(),q.second.end());
        }
        ans.push_back(col);
    }
    return ans;
}`
    },
    {
        id: "top-view-of-binary-tree",
        leetcodeNum: 0,
        title: "Top View of Binary Tree",
        category: "trees",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `vector<int> topView(TreeNode* root) {
    if(!root) return {};
    map<int,int> mp;
    queue<pair<TreeNode*,int>> q;
    q.push({root,0});
    while(!q.empty()) {
        auto p=q.front();
        q.pop();
        TreeNode* node=p.first;
        int line=p.second;
        if(!mp.count(line)) mp[line]=node->val;
        if(node->left) q.push({node->left,line-1});
        if(node->right) q.push({node->right,line+1});
    }
    vector<int> ans;
    for(auto& p:mp) ans.push_back(p.second);
    return ans;
}`
    },
    {
        id: "bottom-view-of-binary-tree",
        leetcodeNum: 0,
        title: "Bottom View of Binary Tree",
        category: "trees",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `vector<int> bottomView(TreeNode* root) {
    if(!root) return {};
    map<int,int> mp;
    queue<pair<TreeNode*,int>> q;
    q.push({root,0});
    while(!q.empty()) {
        auto p=q.front();
        q.pop();
        TreeNode* node=p.first;
        int line=p.second;
        mp[line]=node->val;
        if(node->left) q.push({node->left,line-1});
        if(node->right) q.push({node->right,line+1});
    }
    vector<int> ans;
    for(auto& p:mp) ans.push_back(p.second);
    return ans;
}`
    },
    {
        id: "lowest-common-ancestor-of-a-binary-tree",
        leetcodeNum: 236,
        title: "Lowest Common Ancestor of a Binary Tree",
        category: "trees",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `TreeNode* lowestCommonAncestor(TreeNode* root,TreeNode* p,TreeNode* q) {
    if(!root||root==p||root==q) return root;
    TreeNode* left=lowestCommonAncestor(root->left,p,q);
    TreeNode* right=lowestCommonAncestor(root->right,p,q);
    if(!left) return right;
    if(!right) return left;
    return root;
}`
    },
    {
        id: "maximum-width-of-binary-tree",
        leetcodeNum: 662,
        title: "Maximum Width of Binary Tree",
        category: "trees",
        difficulty: "medium",
        solved: true,
        sheet: "striver-a2z",
        code: `int widthOfBinaryTree(TreeNode* root) {
    if(!root) return 0;
    long long ans=0;
    queue<pair<TreeNode*,long long>> q;
    q.push({root,0});
    while(!q.empty()) {
        int sz=q.size();
        long long minIdx=q.front().second;
        long long first=0,last=0;
        for(int i=0;i<sz;i++) {
            long long curIdx=q.front().second-minIdx;
            TreeNode* node=q.front().first;
            q.pop();
            if(i==0) first=curIdx;
            if(i==sz-1) last=curIdx;
            if(node->left) q.push({node->left,2*curIdx+1});
            if(node->right) q.push({node->right,2*curIdx+2});
        }
        ans=max(ans,last-first+1);
    }
    return ans;
}`
    }
];

