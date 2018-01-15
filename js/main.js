$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        //make request to github
        $.ajax({
            url: 'https://api.github.com/users/'+username,
            data: {
                client_id: '1a59d8b2124be23378b2',
                client_secret: 'a8afbfcec620ad7056fdae7b3dda3592ea13cedb'
            }
        }).done(function(user){
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '1a59d8b2124be23378b2',
                    client_secret: 'a8afbfcec620ad7056fdae7b3dda3592ea13cedb',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                        <a class="collection-item grey-text text-darken-2" href="${repo.html_url}" target="_blank" >
                                ${repo.name}: ${repo.description}
                                <span class="new badge" data-badge-caption="forks">${repo.forks_count}</span>
                                <span class="new badge" data-badge-caption="watchers">${repo.watchers_count}</span>
                                <span class="new badge" data-badge-caption="stars">${repo.stargazers_count}</span>
                        </a>
                    `);
                });
            });
            $('#profile').html(`
                <div class="row">
                    <div class="col s12 m12">
                        <div class="card horizontal">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${user.avatar_url}">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <span class="card-title activator grey-text text-darken-4">${user.name}
                                        <i class="material-icons right">more_vert</i>
                                    </span>
                                    <br>
                                    <br>
                                    <p class="left">
                                        <span class="new badge" data-badge-caption="public repos">${user.public_repos}</span>
                                        <span class="new badge" data-badge-caption="public gists">${user.public_gists}</span>
                                        <span class="new badge" data-badge-caption="followers">${user.followers}</span>
                                        <span class="new badge" data-badge-caption="following">${user.following}</span>
                                    </p>
                                    <br>
                                    <br>
                                    <ul class="collection">
                                        <li class="collection-item">Company: ${user.company}</li>
                                        <li class="collection-item">Website/blog: ${user.blog}</li>
                                        <li class="collection-item">Location: ${user.location}</li>
                                        <li class="collection-item">Member since: ${user.created_at}</li>
                                    </ul>

                                </div>
                                <div class="card-action">
                                <a href="${user.html_url}" target="_blank">View Profile</a>
                                </div>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">${user.name}
                                    <i class="material-icons right">close</i>
                                </span>
                                <p>${user.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="collection with-header grey-text text-darken-2" id="repos">
                    <div class="collection-header"><h4>Latest Repos</h4></div>
                </div>
            `);
        });
    });
});