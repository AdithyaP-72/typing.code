export const problemsPart1 = [
    {
        id: "two-sum",
        leetcodeNum: 1,
        title: "Two Sum",
        category: "arrays-hashing",
        difficulty: "easy",
        solved: true,
        code: `vector<int> twoSum(vector<int>& nums,int target) {
    unordered_map<int,int> mp;
    for(int i=0;i<nums.size();i++) {
        int comp=target-nums[i];
        if(mp.count(comp)) {
            return {mp[comp],i};
        }
        mp[nums[i]]=i;
    }
    return {};
}`
    },
    {
        id: "valid-anagram",
        leetcodeNum: 242,
        title: "Valid Anagram",
        category: "arrays-hashing",
        difficulty: "easy",
        solved: true,
        code: `bool isAnagram(string s,string t) {
    if(s.size()!=t.size()) return false;
    int cnt[26]={};
    for(int i=0;i<s.size();i++) {
        cnt[s[i]-'a']++;
        cnt[t[i]-'a']--;
    }
    for(int i=0;i<26;i++) {
        if(cnt[i]!=0) return false;
    }
    return true;
}`
    },
    {
        id: "contains-duplicate",
        leetcodeNum: 217,
        title: "Contains Duplicate",
        category: "arrays-hashing",
        difficulty: "easy",
        solved: false,
        code: `bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for(int i=0;i<nums.size();i++) {
        if(seen.count(nums[i])) return true;
        seen.insert(nums[i]);
    }
    return false;
}`
    },
    {
        id: "group-anagrams",
        leetcodeNum: 49,
        title: "Group Anagrams",
        category: "arrays-hashing",
        difficulty: "medium",
        solved: false,
        code: `vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string,vector<string>> mp;
    for(int i=0;i<strs.size();i++) {
        string key=strs[i];
        sort(key.begin(),key.end());
        mp[key].push_back(strs[i]);
    }
    vector<vector<string>> res;
    for(auto it=mp.begin();it!=mp.end();it++) {
        res.push_back(it->second);
    }
    return res;
}`
    },
    {
        id: "top-k-frequent-elements",
        leetcodeNum: 347,
        title: "Top K Frequent Elements",
        category: "arrays-hashing",
        difficulty: "medium",
        solved: false,
        code: `vector<int> topKFrequent(vector<int>& nums,int k) {
    unordered_map<int,int> cnt;
    for(int x:nums) cnt[x]++;
    vector<vector<int>> bucket(nums.size()+1);
    for(auto& [val,freq]:cnt) {
        bucket[freq].push_back(val);
    }
    vector<int> res;
    for(int i=bucket.size()-1;i>=0;i--) {
        for(int x:bucket[i]) {
            res.push_back(x);
            if(res.size()==k) return res;
        }
    }
    return res;
}`
    },
    {
        id: "product-of-array-except-self",
        leetcodeNum: 238,
        title: "Product of Array Except Self",
        category: "arrays-hashing",
        difficulty: "medium",
        solved: false,
        code: `vector<int> productExceptSelf(vector<int>& nums) {
    int n=nums.size();
    vector<int> res(n,1);
    int prefix=1;
    for(int i=0;i<n;i++) {
        res[i]=prefix;
        prefix*=nums[i];
    }
    int suffix=1;
    for(int i=n-1;i>=0;i--) {
        res[i]*=suffix;
        suffix*=nums[i];
    }
    return res;
}`
    },
    {
        id: "longest-consecutive-sequence",
        leetcodeNum: 128,
        title: "Longest Consecutive Sequence",
        category: "arrays-hashing",
        difficulty: "medium",
        solved: false,
        code: `int longestConsecutive(vector<int>& nums) {
    unordered_set<int> st(nums.begin(),nums.end());
    int ans=0;
    for(int x:st) {
        if(!st.count(x-1)) {
            int len=1;
            while(st.count(x+len)) len++;
            ans=max(ans,len);
        }
    }
    return ans;
}`
    },
    {
        id: "valid-palindrome",
        leetcodeNum: 125,
        title: "Valid Palindrome",
        category: "two-pointers",
        difficulty: "easy",
        solved: false,
        code: `bool isPalindrome(string s) {
    int l=0,r=s.size()-1;
    while(l<r) {
        while(l<r&&!isalnum(s[l])) l++;
        while(l<r&&!isalnum(s[r])) r--;
        if(tolower(s[l])!=tolower(s[r])) return false;
        l++;
        r--;
    }
    return true;
}`
    },
    {
        id: "3sum",
        leetcodeNum: 15,
        title: "3Sum",
        category: "two-pointers",
        difficulty: "medium",
        solved: true,
        code: `vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(),nums.end());
    vector<vector<int>> res;
    int n=nums.size();
    for(int i=0;i<n-2;i++) {
        if(i>0&&nums[i]==nums[i-1]) continue;
        int l=i+1,r=n-1;
        while(l<r) {
            int sum=nums[i]+nums[l]+nums[r];
            if(sum<0) {
                l++;
            } else if(sum>0) {
                r--;
            } else {
                res.push_back({nums[i],nums[l],nums[r]});
                while(l<r&&nums[l]==nums[l+1]) l++;
                while(l<r&&nums[r]==nums[r-1]) r--;
                l++;
                r--;
            }
        }
    }
    return res;
}`
    },
    {
        id: "container-with-most-water",
        leetcodeNum: 11,
        title: "Container With Most Water",
        category: "two-pointers",
        difficulty: "medium",
        solved: false,
        code: `int maxArea(vector<int>& height) {
    int l=0,r=height.size()-1;
    int ans=0;
    while(l<r) {
        int area=min(height[l],height[r])*(r-l);
        ans=max(ans,area);
        if(height[l]<height[r]) {
            l++;
        } else {
            r--;
        }
    }
    return ans;
}`
    },
    {
        id: "best-time-to-buy-and-sell-stock",
        leetcodeNum: 121,
        title: "Best Time to Buy and Sell Stock",
        category: "sliding-window",
        difficulty: "easy",
        solved: true,
        code: `int maxProfit(vector<int>& prices) {
    int mn=prices[0];
    int ans=0;
    for(int i=1;i<prices.size();i++) {
        ans=max(ans,prices[i]-mn);
        mn=min(mn,prices[i]);
    }
    return ans;
}`
    },
    {
        id: "longest-substring-without-repeating-characters",
        leetcodeNum: 3,
        title: "Longest Substring Without Repeating Characters",
        category: "sliding-window",
        difficulty: "medium",
        solved: true,
        code: `int lengthOfLongestSubstring(string s) {
    unordered_set<char> st;
    int l=0,ans=0;
    for(int r=0;r<s.size();r++) {
        while(st.count(s[r])) {
            st.erase(s[l]);
            l++;
        }
        st.insert(s[r]);
        ans=max(ans,r-l + 1);
    }
    return ans;
}`
    },
    {
        id: "longest-repeating-character-replacement",
        leetcodeNum: 424,
        title: "Longest Repeating Character Replacement",
        category: "sliding-window",
        difficulty: "medium",
        solved: true,
        code: `int characterReplacement(string s,int k) {
    int cnt[26]={};
    int l=0,maxf=0,ans=0;
    for(int r=0;r<s.size();r++) {
        cnt[s[r]-'A']++;
        maxf=max(maxf,cnt[s[r]-'A']);
        while(r-l + 1-maxf> k) {
            cnt[s[l]-'A']--;
            l++;
        }
        ans=max(ans,r-l + 1);
    }
    return ans;
}`
    },
    {
        id: "minimum-window-substring",
        leetcodeNum: 76,
        title: "Minimum Window Substring",
        category: "sliding-window",
        difficulty: "hard",
        solved: true,
        code: `string minWindow(string s,string t) {
    unordered_map<char,int> need,have;
    for(char c:t) need[c]++;
    int required=need.size();
    int formed=0;
    int l=0,start=0,minLen=INT_MAX;
    for(int r=0;r<s.size();r++) {
        have[s[r]]++;
        if(need.count(s[r])&&have[s[r]]==need[s[r]]) {
            formed++;
        }
        while(formed==required) {
            if(r-l + 1<minLen) {
                minLen=r-l + 1;
                start=l;
            }
            have[s[l]]--;
            if(need.count(s[l])&&have[s[l]]<need[s[l]]) {
                formed--;
            }
            l++;
        }
    }
    return minLen==INT_MAX ? "" : s.substr(start,minLen);
}`
    },
    {
        id: "find-minimum-in-rotated-sorted-array",
        leetcodeNum: 153,
        title: "Find Minimum in Rotated Sorted Array",
        category: "binary-search",
        difficulty: "medium",
        solved: true,
        code: `int findMin(vector<int>& nums) {
    int l=0,r=nums.size()-1;
    while(l<r) {
        int m=l+(r-l)/2;
        if(nums[m]> nums[r]) {
            l=m+1;
        } else {
            r=m;
        }
    }
    return nums[l];
}`
    },
    {
        id: "search-in-rotated-sorted-array",
        leetcodeNum: 33,
        title: "Search in Rotated Sorted Array",
        category: "binary-search",
        difficulty: "medium",
        solved: true,
        code: `int search(vector<int>& nums,int target) {
    int l=0,r=nums.size()-1;
    while(l<=r) {
        int m=l+(r-l)/2;
        if(nums[m]==target) return m;
        if(nums[l]<=nums[m]) {
            if(target>=nums[l]&&target<nums[m]) {
                r=m-1;
            } else {
                l=m+1;
            }
        } else {
            if(target> nums[m]&&target<=nums[r]) {
                l=m+1;
            } else {
                r=m-1;
            }
        }
    }
    return-1;
}`
    },
    {
        id: "valid-parentheses",
        leetcodeNum: 20,
        title: "Valid Parentheses",
        category: "stack",
        difficulty: "easy",
        solved: true,
        code: `bool isValid(string s) {
    stack<char> st;
    for(char c:s) {
        if(c=='('||c=='{'||c=='[') {
            st.push(c);
        } else {
            if(st.empty()) return false;
            char top=st.top();
            st.pop();
            if(c==')'&&top!='(') return false;
            if(c=='}'&&top!='{') return false;
            if(c==']'&&top!='[') return false;
        }
    }
    return st.empty();
}`
    },
    {
        id: "reverse-linked-list",
        leetcodeNum: 206,
        title: "Reverse Linked List",
        category: "linked-list",
        difficulty: "easy",
        solved: true,
        code: `ListNode* reverseList(ListNode* head) {
    ListNode* prev=nullptr;
    ListNode* curr=head;
    while(curr) {
        ListNode* next=curr->next;
        curr->next=prev;
        prev=curr;
        curr=next;
    }
    return prev;
}`
    },
    {
        id: "merge-two-sorted-lists",
        leetcodeNum: 21,
        title: "Merge Two Sorted Lists",
        category: "linked-list",
        difficulty: "easy",
        solved: true,
        code: `ListNode* mergeTwoLists(ListNode* l1,ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail=&dummy;
    while(l1&&l2) {
        if(l1->val<=l2->val) {
            tail->next=l1;
            l1=l1->next;
        } else {
            tail->next=l2;
            l2=l2->next;
        }
        tail=tail->next;
    }
    tail->next=l1 ? l1 : l2;
    return dummy.next;
}`
    },
    {
        id: "linked-list-cycle",
        leetcodeNum: 141,
        title: "Linked List Cycle",
        category: "linked-list",
        difficulty: "easy",
        solved: true,
        code: `bool hasCycle(ListNode* head) {
    ListNode* slow=head;
    ListNode* fast=head;
    while(fast&&fast->next) {
        slow=slow->next;
        fast=fast->next->next;
        if(slow==fast) return true;
    }
    return false;
}`
    },
    {
        id: "remove-nth-node-from-end-of-list",
        leetcodeNum: 19,
        title: "Remove Nth Node From End of List",
        category: "linked-list",
        difficulty: "medium",
        solved: true,
        code: `ListNode* removeNthFromEnd(ListNode* head,int n) {
    ListNode dummy(0);
    dummy.next=head;
    ListNode* fast=&dummy;
    ListNode* slow=&dummy;
    for(int i=0;i<=n;i++) {
        fast=fast->next;
    }
    while(fast) {
        fast=fast->next;
        slow=slow->next;
    }
    ListNode* del=slow->next;
    slow->next=del->next;
    delete del;
    return dummy.next;
}`
    },
    {
        id: "reorder-list",
        leetcodeNum: 143,
        title: "Reorder List",
        category: "linked-list",
        difficulty: "medium",
        solved: false,
        code: `void reorderList(ListNode* head) {
    if(!head||!head->next) return;
    ListNode* slow=head;
    ListNode* fast=head;
    while(fast->next&&fast->next->next) {
        slow=slow->next;
        fast=fast->next->next;
    }
    ListNode* prev=nullptr;
    ListNode* curr=slow->next;
    slow->next=nullptr;
    while(curr) {
        ListNode* next=curr->next;
        curr->next=prev;
        prev=curr;
        curr=next;
    }
    ListNode* l1=head;
    ListNode* l2=prev;
    while(l2) {
        ListNode* n1=l1->next;
        ListNode* n2=l2->next;
        l1->next=l2;
        l2->next=n1;
        l1=n1;
        l2=n2;
    }
}`
    },
    {
        id: "merge-k-sorted-lists",
        leetcodeNum: 23,
        title: "Merge k Sorted Lists",
        category: "linked-list",
        difficulty: "hard",
        solved: false,
        code: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp=[](ListNode* a,ListNode* b) {
        return a->val> b->val;
    };
    priority_queue<ListNode*,vector<ListNode*>,decltype(cmp)> pq(cmp);
    for(ListNode* l:lists) {
        if(l) pq.push(l);
    }
    ListNode dummy(0);
    ListNode* tail=&dummy;
    while(!pq.empty()) {
        ListNode* node=pq.top();
        pq.pop();
        tail->next=node;
        tail=tail->next;
        if(node->next) pq.push(node->next);
    }
    return dummy.next;
}`
    },
    {
        id: "invert-binary-tree",
        leetcodeNum: 226,
        title: "Invert Binary Tree",
        category: "trees",
        difficulty: "easy",
        solved: true,
        code: `TreeNode* invertTree(TreeNode* root) {
    if(!root) return nullptr;
    swap(root->left,root->right);
    invertTree(root->left);
    invertTree(root->right);
    return root;
}`
    },
    {
        id: "maximum-depth-of-binary-tree",
        leetcodeNum: 104,
        title: "Maximum Depth of Binary Tree",
        category: "trees",
        difficulty: "easy",
        solved: true,
        code: `int maxDepth(TreeNode* root) {
    if(!root) return 0;
    return 1+max(maxDepth(root->left),maxDepth(root->right));
}`
    },
];
