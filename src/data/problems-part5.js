export const problemsPart5 = [
    {
        id: "contains-duplicate-ii",
        leetcodeNum: 219,
        title: "Contains Duplicate II",
        category: "sliding-window",
        difficulty: "easy",
        solved: true,
        sheet: "neetcode-150",
        code: `bool containsNearbyDuplicate(vector<int>& nums, int k){
    unordered_map<int, int> mp;
    for(int i=0;i<nums.size();i++){
        if(mp.count(nums[i]) && i-mp[nums[i]]<=k){
            return true;
        }
        mp[nums[i]]=i;
    }
    return false;
}`
    },
    {
        id: "permutation-in-string",
        leetcodeNum: 567,
        title: "Permutation In String",
        category: "sliding-window",
        difficulty: "medium",
        solved: true,
        sheet: "neetcode-150",
        code: `bool checkInclusion(string s1, string s2){
    if(s1.size()> s2.size()) return false;
    vector<int> c1(26, 0), c2(26, 0);
    for(int i=0;i<s1.size();i++){
        c1[s1[i]-'a']++;
        c2[s2[i]-'a']++;
    }
    if(c1==c2) return true;
    for(int i=s1.size();i<s2.size();i++){
        c2[s2[i]-'a']++;
        c2[s2[i-s1.size()]-'a']--;
        if(c1==c2) return true;
    }
    return false;
}`
    },
    {
        id: "minimum-size-subarray-sum",
        leetcodeNum: 209,
        title: "Minimum Size Subarray Sum",
        category: "sliding-window",
        difficulty: "medium",
        solved: true,
        sheet: "neetcode-150",
        code: `int minSubArrayLen(int target, vector<int>& nums){
    int n=nums.size();
    int ans=n+1;
    int sum=0;
    int l=0;
    for(int r=0;r<n;r++){
        sum+=nums[r];
        while(sum>=target){
            ans=min(ans, r-l + 1);
            sum-=nums[l];
            l++;
        }
    }
    return ans> n ? 0 : ans;
}`
    },
    {
        id: "find-k-closest-elements",
        leetcodeNum: 658,
        title: "Find K Closest Elements",
        category: "sliding-window",
        difficulty: "medium",
        solved: true,
        sheet: "neetcode-150",
        code: `vector<int> findClosestElements(vector<int>& arr, int k, int x){
    int l=0, r=arr.size()-k;
    while(l<r){
        int mid=l+(r-l)/2;
        if(x-arr[mid]> arr[mid+k]-x){
            l=mid+1;
        } else{
            r=mid;
        }
    }
    return vector<int>(arr.begin()+l, arr.begin()+l + k);
}`
    },
    {
        id: "sliding-window-maximum",
        leetcodeNum: 239,
        title: "Sliding Window Maximum",
        category: "sliding-window",
        difficulty: "hard",
        solved: true,
        sheet: "neetcode-150",
        code: `vector<int> maxSlidingWindow(vector<int>& nums, int k){
    deque<int> dq;
    vector<int> res;
    for(int i=0;i<nums.size();i++){
        if(!dq.empty() && dq.front()==i-k){
            dq.pop_front();
        }
        while(!dq.empty() && nums[dq.back()]<nums[i]){
            dq.pop_back();
        }
        dq.push_back(i);
        if(i>=k-1){
            res.push_back(nums[dq.front()]);
        }
    }
    return res;
}`
    },
    {
        id: "binary-search",
        leetcodeNum: 704,
        title: "Binary Search",
        category: "binary-search",
        difficulty: "easy",
        solved: true,
        sheet: "neetcode-150",
        code: `int search(vector<int>& nums, int target){
    int l=0, r=nums.size()-1;
    while(l<=r){
        int mid=l+(r-l)/2;
        if(nums[mid]==target) return mid;
        if(nums[mid]<target) l=mid+1;
        else r=mid-1;
    }
    return-1;
}`
    },
    {
        id: "search-insert-position",
        leetcodeNum: 35,
        title: "Search Insert Position",
        category: "binary-search",
        difficulty: "easy",
        solved: true,
        sheet: "neetcode-150",
        code: `int searchInsert(vector<int>& nums, int target){
    int l=0, r=nums.size()-1;
    while(l<=r){
        int mid=l+(r-l)/2;
        if(nums[mid]==target) return mid;
        if(nums[mid]<target) l=mid+1;
        else r=mid-1;
    }
    return l;
}`
    },
    {
        id: "guess-number-higher-or-lower",
        leetcodeNum: 374,
        title: "Guess Number Higher Or Lower",
        category: "binary-search",
        difficulty: "easy",
        solved: true,
        sheet: "neetcode-150",
        code: `int guessNumber(int n){
    int l=1, r=n;
    while(l<=r){
        int mid=l+(r-l)/2;
        int res=guess(mid);
        if(res==0) return mid;
        if(res<0) r=mid-1;
        else l=mid+1;
    }
    return-1;
}`
    },
    {
        id: "sqrtx",
        leetcodeNum: 69,
        title: "Sqrt(x)",
        category: "binary-search",
        difficulty: "easy",
        solved: true,
        sheet: "neetcode-150",
        code: `int mySqrt(int x){
    if(x==0) return 0;
    int l=1, r=x, ans=1;
    while(l<=r){
        int mid=l+(r-l)/2;
        if(mid<=x/mid){
            ans=mid;
            l=mid+1;
        } else{
            r=mid-1;
        }
    }
    return ans;
}`
    },
    {
        id: "search-a-2d-matrix",
        leetcodeNum: 74,
        title: "Search a 2D Matrix",
        category: "binary-search",
        difficulty: "medium",
        solved: true,
        sheet: "neetcode-150",
        code: `bool searchMatrix(vector<vector<int>>& matrix, int target){
    int m=matrix.size();
    int n=matrix[0].size();
    int l=0, r=m*n - 1;
    while(l<=r){
        int mid=l+(r-l)/2;
        int val=matrix[mid/n][mid%n];
        if(val==target) return true;
        if(val<target) l=mid+1;
        else r=mid-1;
    }
    return false;
}`
    },
    {
        id: "koko-eating-bananas",
        leetcodeNum: 875,
        title: "Koko Eating Bananas",
        category: "binary-search",
        difficulty: "medium",
        solved: true,
        sheet: "neetcode-150",
        code: `int minEatingSpeed(vector<int>& piles, int h){
    int l=1, r=*max_element(piles.begin(), piles.end());
    int ans=r;
    while(l<=r){
        int mid=l+(r-l)/2;
        long long hours=0;
        for(int p:piles){
            hours+=(p+mid-1)/mid;
        }
        if(hours<=h){
            ans=mid;
            r=mid-1;
        } else{
            l=mid+1;
        }
    }
    return ans;
}`
    },
    {
        id: "capacity-to-ship-packages-within-d-days",
        leetcodeNum: 1011,
        title: "Capacity to Ship Packages Within D Days",
        category: "binary-search",
        difficulty: "medium",
        solved: true,
        sheet: "neetcode-150",
        code: `int shipWithinDays(vector<int>& weights, int days){
    int l=*max_element(weights.begin(), weights.end());
    int r=accumulate(weights.begin(), weights.end(), 0);
    int ans=r;
    while(l<=r){
        int mid=l+(r-l)/2;
        int d=1, cur=0;
        for(int w:weights){
            if(cur+w> mid){
                d++;
                cur=0;
            }
            cur+=w;
        }
        if(d<=days){
            ans=mid;
            r=mid-1;
        } else{
            l=mid+1;
        }
    }
    return ans;
}`
    },
    {
        id: "search-in-rotated-sorted-array-ii",
        leetcodeNum: 81,
        title: "Search In Rotated Sorted Array II",
        category: "binary-search",
        difficulty: "medium",
        solved: true,
        sheet: "neetcode-150",
        code: `bool search(vector<int>& nums, int target){
    int l=0, r=nums.size()-1;
    while(l<=r){
        int mid=l+(r-l)/2;
        if(nums[mid]==target) return true;
        if(nums[l]==nums[mid] && nums[mid]==nums[r]){
            l++;
            r--;
        } else if(nums[l]<=nums[mid]){
            if(nums[l]<=target && target<nums[mid]) r=mid-1;
            else l=mid+1;
        } else{
            if(nums[mid]<target && target<=nums[r]) l=mid+1;
            else r=mid-1;
        }
    }
    return false;
}`
    },
    {
        id: "time-based-key-value-store",
        leetcodeNum: 981,
        title: "Time Based Key Value Store",
        category: "binary-search",
        difficulty: "medium",
        solved: true,
        sheet: "neetcode-150",
        code: `unordered_map<string, vector<pair<int, string>>> mp;

TimeMap(){}

void set(string key, string value, int timestamp){
    mp[key].push_back({timestamp, value});
}

string get(string key, int timestamp){
    if(!mp.count(key)) return "";
    auto& v=mp[key];
    int l=0, r=v.size()-1;
    string ans="";
    while(l<=r){
        int mid=l+(r-l)/2;
        if(v[mid].first<=timestamp){
            ans=v[mid].second;
            l=mid+1;
        } else{
            r=mid-1;
        }
    }
    return ans;
}`
    },
    {
        id: "split-array-largest-sum",
        leetcodeNum: 410,
        title: "Split Array Largest Sum",
        category: "binary-search",
        difficulty: "hard",
        solved: true,
        sheet: "neetcode-150",
        code: `int splitArray(vector<int>& nums, int k){
    long long l=*max_element(nums.begin(), nums.end());
    long long r=accumulate(nums.begin(), nums.end(), 0LL);
    long long ans=r;
    while(l<=r){
        long long mid=l+(r-l)/2;
        int count=1;
        long long cur=0;
        for(int x:nums){
            if(cur+x> mid){
                count++;
                cur=0;
            }
            cur+=x;
        }
        if(count<=k){
            ans=mid;
            r=mid-1;
        } else{
            l=mid+1;
        }
    }
    return ans;
}`
    },
    {
        id: "median-of-two-sorted-arrays",
        leetcodeNum: 4,
        title: "Median of Two Sorted Arrays",
        category: "binary-search",
        difficulty: "hard",
        solved: true,
        sheet: "neetcode-150",
        code: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2){
    if(nums1.size()> nums2.size()) return findMedianSortedArrays(nums2, nums1);
    int m=nums1.size(), n=nums2.size();
    int l=0, r=m;
    while(l<=r){
        int p1=l+(r-l)/2;
        int p2=(m+n + 1)/2 - p1;
        int max1=(p1==0) ? INT_MIN : nums1[p1-1];
        int min1=(p1==m) ? INT_MAX : nums1[p1];
        int max2=(p2==0) ? INT_MIN : nums2[p2-1];
        int min2=(p2==n) ? INT_MAX : nums2[p2];
        if(max1<=min2 && max2<=min1){
            if((m+n)%2==0){
                return (max(max1, max2)+min(min1, min2))/2.0;
            }
            return max(max1, max2);
        } else if(max1> min2){
            r=p1-1;
        } else{
            l=p1+1;
        }
    }
    return 0.0;
}`
    }
];
