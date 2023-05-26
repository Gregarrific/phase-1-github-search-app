let searchForm = document.getElementById('github-form');
//Event Listeners
searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const inputText = document.getElementById('search');
    fetch(`https://api.github.com/search/users?q=${inputText.value}`, {
        headers: {'Accept': 'application/vnd.github.v3+json'}
        })
    .then (response => response.json())
    .then (json => retrieveUsers(json.items));
})
document.addEventListener('click', event => {
    const repo = event.target.alt;
    if (event.target.alt) {
        console.log(repo);
        fetch(repo, {
            headers: {'Accept': 'application/vnd.github.v3+json'}
            })
        .then (response => response.json())
        .then (json => retrieveRepo(json));
    };
})
//Functions
function retrieveUsers(items) {
    //Remove list of github users from DOM
    let oldList = document.getElementById('user-list');
        while (oldList.firstChild) {
            oldList.firstChild.remove();
        };
    //Remove list of repos-if any-from DOM
    oldList = document.getElementById('repos-list');
        while (oldList.firstChild) {
            oldList.firstChild.remove();
        };
    items.forEach(element => {
        let userContainer = document.createElement('li');
        userContainer.id = element.id;
        let userName = document.createElement('a');
        userName.setAttribute('href', element.html_url);
        userName.setAttribute('target', '_blank');
        userName.innerText = element.login;
        let userAvatar = document.createElement('img');
        userAvatar.src = element.avatar_url;
        userAvatar.setAttribute('style', 'height: 40px');
        userAvatar.setAttribute('alt', element.repos_url);
        document.getElementById('user-list').appendChild(userContainer);
        document.getElementById(userContainer.id).appendChild(userAvatar);
        document.getElementById(userContainer.id).appendChild(userName);
    });
}
function retrieveRepo(items) {
    //Remove list of repos-if any-from DOM
    let oldList = document.getElementById('repos-list');
        while (oldList.firstChild) {
            oldList.firstChild.remove();
        };
        // Add github user info back to DOM
        let userHeader = document.createElement('h2');
        userHeader.innerText = `Repositories for ${items[0].owner.login}`;
        document.getElementById('repos-list').appendChild(userHeader);
    items.forEach(element => {
        let repoContainer = document.createElement('li');
        repoContainer.id = element.id;
        let repoName = document.createElement('a');
        repoName.setAttribute('href', element.html_url);
        repoName.setAttribute('target', '_blank');
        repoName.innerText = element.name;
        let repoDescription = document.createElement('p');
        repoDescription.innerText = element.description;
        document.getElementById('repos-list').appendChild(repoContainer);
        document.getElementById(repoContainer.id).appendChild(repoName);
        document.getElementById(repoContainer.id).appendChild(repoDescription);
    });
}