
function fetchUsername(UsernameSpan) {
    const user = localStorage.getItem('taskflowUser');
    if (user) {
        const parsedUser = JSON.parse(user);
        const fullName = parsedUser.name;
        const parts = fullName.split(" ");
        const displayName = parts.slice(0, 2).join("-");
        UsernameSpan.textContent = displayName;
        return displayName;  
    }
    return "";
}


const fetchAvatar = (avatar, displayName) => {
    const avatarUrl = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(displayName)}`;
    avatar.src = avatarUrl;
};


export const fetchUserInfo = (UsernameSpan, avatar) => {
    const displayName = fetchUsername(UsernameSpan);
    fetchAvatar(avatar, displayName);
};
