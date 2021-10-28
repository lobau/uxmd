const querystring = require("querystring")

const REDIRECT_ENDPOINT = 'github_auth'

const getGithubRedirectUrl = () => {
  if(process.env.UXMD_ENV == "development") {
    return `http://localhost:${process.env.PORT}/${REDIRECT_ENDPOINT}`
  } else {
    return `https://www.uxmd.io/${REDIRECT_ENDPOINT}`
  }
}

const getGithubUrl = (state) => {
  const host = "https://github.com/login/oauth/authorize"
  const query = querystring.stringify({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: getGithubRedirectUrl(),
    state: state,
    scope: "user"
  })
  return `${host}?${query}`
}

const renderLoginOrDashboard = (state) => {
  return `<script>
    const session = localStorage.getItem("__uxmd_session")
    const parent = document.getElementById("contents")
    if(session) {
      const page = document.createElement("div")
      page.innerHTML = "Have session"
      parent.appendChild(page)
    } else {
      const page = document.createElement("a")
      page.setAttribute("href", "${getGithubUrl(state)}")
      page.innerHTML = "Login with GitHub"
      parent.appendChild(page)
    }
  </script>`

}

module.exports = async (state) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>UXMD</title>
        <meta charset="UTF-8" />
        <link rel="icon" href="public/favicon.svg" />
        <link rel="stylesheet" href="public/style.css" />
        <script defer data-domain="uxmd.io" src="https://plausible.io/js/plausible.js"></script>
      </head>
      <body>
        <div id="loader">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M58 22L48 32M48 12L58 22L48 12ZM68 32L58 22L68 32ZM58 22L68 12L58 22Z" stroke="#FFCB70" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1.5s" from="0 58 22" to="360 58 22" repeatCount="indefinite"></animateTransform>
            </path>
            <g stroke="#444" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 12V24C12 29.5228 16.4772 34 22 34C27.5228 34 32 29.5228 32 24V12"/>
              <path d="M32 68V48L22 58L12 48V68"/>
              <path d="M58 48H48V68H58C63.5228 68 68 63.5228 68 58C68 52.4772 63.5228 48 58 48Z"/>
            </g>
          </svg>
          <div id="contents"/>
          ${renderLoginOrDashboard(state)}
        </div>
      </body>
    </html>
  `
};
