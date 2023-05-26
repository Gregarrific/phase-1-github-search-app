let searchForm = document.getElementById('github-form');
// console.log(searchForm);

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const inputText = document.getElementById('search');
    fetch(`https://api.github.com/search/users?q=${inputText.value}`, {
        headers: {'Accept': 'application/vnd.github.v3+json'}
        })
    .then (response => response.json())
    .then (json => retrieveItems(json.items));
})

document.addEventListener('click', event => {
    console.log(event.target);
    if (event.target.alt) {
        console.log('hell yeah');
    };
    // fetch(event.alt, {
    //     headers: {'Accept': 'application/vnd.github.v3+json'}        
    // })
    // .then (response => response.json())
    // .then (json => console.log(json));
})

function retrieveItems(items) {
    let oldList = document.getElementById('user-list');
        while (oldList.firstChild) {
            oldList.firstChild.remove();
        };
    items.forEach(element => {
        console.log(element);
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