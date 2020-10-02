class Api {

  static isNull(param) {
    if (param == null) {
      return ''
    } else {
      return param
    }
  }

  static setLoading(active = true) {
    if (active) {
      $('.overlay-loading').show();
      $('#loading').show();
    } else {
      $('.overlay-loading').hide();
      $('#loading').hide();
    }
  }

  static async getUserInfo(profile) {
    this.setLoading()
    try {
      if (profile === 0) return
      const baseURL = 'https://api.github.com/users/'
      const response = await fetch(baseURL + profile)
      const data = await response.json()
      const twitter = data.twitter_username
      const avatar = data.avatar_url
      const bio = this.isNull(data.bio)
      const name = data.name
      const followers = data.followers
      const following = data.following
      const urlUser = data.html_url
      const login = data.login
      // Fetching repositories info
      const repos = data.repos_url
      const repos_fetch = await fetch(repos)
      const repos_data = await repos_fetch.json()
      const repos_length = repos_data.length
      let element = document.getElementById('root-div')
      element.innerHTML += `
      <div class="card mb-3" style="max-width: 500px;margin:auto 20px;">
      <div class="row no-gutters">
        <div class="col-md-4 text-center justify-content-center align-self-center">
          <img src="${avatar}" style="margin:auto 20px;" class="img-fluid card-img rounded-circle rounded-sm" alt="Foto de ${name}">
        </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title text-center" style="font-size: 25px">${name}</h5>
              <p class="card-text text-center" style="color: #88898a; font-size: 15px;font-weight:500;margin-top:-10px;">${bio}</p>
              <p class="card-text text-center">Seguidores: ${followers}</p>
              <p class="card-text text-center">Seguindo: ${following}</p>
              <p class="card-text text-center">Total de repositórios: ${repos_length}</p>
              <div class="col text-center">
              <a target="_blank" href="${urlUser}" class="text-center btn btn-dark">Visitar perfil no Github</a>
            </div>
          </div>
        </div>
      </div>
    </div>`
    } catch (error) {
      alert('Parece que o usuário inserido é invalido ou o campo está vazio.')
    }
    this.setLoading(false)
  }
}
document.querySelector('input[type=submit]').addEventListener('click', e => {
  e.preventDefault()
  var profile = document.querySelector('input[name=gituser]').value;
  Api.getUserInfo(profile)
  profile = 'a'
})