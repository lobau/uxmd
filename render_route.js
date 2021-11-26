module.exports = async (route, body) => {
  return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>UXMD</title>
          <meta charset="UTF-8" />
          <link rel="icon" href="public/favicon.svg" />

          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

          <script src="https://cdn.jsdelivr.net/npm/codemirror@5.63.1/lib/codemirror.min.js"></script>
          <script src="https://cdn.jsdelivr.net/combine/npm/codemirror@5.63.1,npm/codemirror@5.63.1/mode/markdown/markdown.min.js"></script>

          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.63.1/lib/codemirror.min.css" />

          
          <script src="/socket.io/socket.io.js"></script>
          <script type="text/javascript">
            var socket = io.connect('', {query: 'name=${route}'});
          </script>

          <script src="public/script.js"></script>
          <link rel="stylesheet" href="public/style.css" />
          <link rel="stylesheet" href="public/syntax.css" />

          <script defer data-domain="uxmd.io" src="https://plausible.io/js/plausible.js"></script>

        </head>
        <body>
          <div class="main_layout">
            <textarea id="editor" style="visibility: hidden;">${body}</textarea>
            <div id="render"></div>
          </div>
          <div id="fab">?</div>
          <div id="help_layer">
            <div class="help_content">
              <div class="help_sidebar">
                <div id="close_help">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3L8 8M13 13L8 8M8 8L13 3M8 8L3 13" stroke="#444" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>                
              </div>
              <div class="help_tutorial">

              <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M58 22L48 32M48 12L58 22L48 12ZM68 32L58 22L68 32ZM58 22L68 12L58 22Z" stroke="#FFCB70" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
                            <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s" from="0 58 22" to="360 58 22" repeatCount="indefinite"></animateTransform>
                        </path>
                        <g stroke="#444" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 12V24C12 29.5228 16.4772 34 22 34C27.5228 34 32 29.5228 32 24V12"/>
                            <path d="M32 68V48L22 58L12 48V68"/>
                            <path d="M58 48H48V68H58C63.5228 68 68 63.5228 68 58C68 52.4772 63.5228 48 58 48Z"/>
                        </g>
                    </svg>
              <h2>About UXMD</h2>
              <p>
                UXMD is a simple tool allowing anybody with some markdown knowledge to
                quickly draft UX flows.
              </p>
              <p>
                In UXMD, you define each state of your user journey. Any time a user is
                faced with a new set of actions, this is a new state. For example, a new
                page the user visit is a new state, but opening a popover is also a new
                state, since it offers new affordances, alongside a way to close the
                popover.
              </p>

              <h2>Real-time Collaboration</h2>
              <p>
                Any change you make to the markup is instantly saved. Just bookmark the link and you can come back at any time. Share the link and collaborate in real-time.
              </p>

              <h2>Create a new state</h2>
              <p>
                To create a new state, enter a new line, followed by / and a unique tag (no
                space, no special characters)
              </p>
              <pre class="help_pre">
/state_tag
# The big title
A short description

/another_state
# Another state
A short description</pre>
              <p></p>

              <h2>Link states</h2>
              <p>
                To link states, just name a state, and in a button of another state, write
                the same name.
              </p>
              <pre class="help_pre">
/state_a
# First State
[Button](#state_b)

/state_b
# Second State
[Button](#state_a)</pre
              >
            <hr />
            <p>Made by Laurent Baumann. Built using Node.js, Socket.io, CodeMirror and PostgreSQL</p>
              <a class="socialLink" target="_blank" href="https://twitter.com/lobau" rel="nofollow">
              <svg role="img" class="social_image" width="16" height="16" viewBox="0 0 16 16">
                <path d="m 15.964644,3.0544278 c -0.593685,0.260423 -1.226283,0.433041 -1.885823,0.516855 0.678497,-0.405103 1.19635,-1.041693 1.439811,-1.808993 -0.632599,0.377165 -1.331052,0.643575 -2.075404,0.792245 -0.60067,-0.639583 -1.456774,-1.035706 -2.390706,-1.035706 -1.8119861,0 -3.2707555,1.470743 -3.2707555,3.273749 0,0.259426 0.021954,0.508874 0.075832,0.746348 -2.7209744,-0.132706 -5.1286422,-1.436818 -6.7460602,-3.423418 -0.28237458,0.489914 -0.44800779,1.050672 -0.44800779,1.654335 0,1.13349 0.58370729,2.138265 1.45378039,2.719977 -0.5258355,-0.01 -1.0416931,-0.16264 -1.47872516,-0.403107 0,0.01 0,0.02295 0,0.03592 0,1.590477 1.13448746,2.911552 2.62219276,3.215877 -0.26641,0.07284 -0.5567669,0.107761 -0.8580996,0.107761 -0.209536,0 -0.4210674,-0.01197 -0.6196277,-0.05587 0.4240608,1.2961302 1.6273959,2.2490202 3.0582271,2.2799522 -1.1135339,0.871068 -2.5274027,1.395906 -4.05801298,1.395906 -0.26840553,0 -0.52583547,-0.01197 -0.78326532,-0.04491 1.4497892,0.934931 3.167984,1.468749 5.0208806,1.468749 6.0226624,0 9.3153704,-4.9889522 9.3153704,-9.3133742 0,-0.14468 -0.005,-0.28437 -0.01197,-0.423063 0.64956,-0.460979 1.195353,-1.036705 1.640367,-1.699237 z"></path>
              </svg>@lobau</a>
              <a class="socialLink" target="_blank" href="https://github.com/lobau" rel="nofollow">
              <svg role="img" class="social_image" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>lobau</a>
              <a class="socialLink" target="_blank" href="https://lobau.io" rel="nofollow">
              <svg role="img" class="social_image" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
               <path fill="#000" fill-rule="evenodd" d="M5.93 14.7c3.38.91 8.38-.34 9.82-5.73.87-3.23-.56-7.16-3.8-8.17a.15.15 0 0 0-.18.16l.03.37c.06.8.11 1.45.26 2.06.05.22-.13.44-.35.41l-.1-.01c-.72-.08-1.53-.18-2.44-.56-.1-.04-.22.04-.21.15.27 3.15 3.7 4.18 4.7 3.86h.02c.03-.02.05 0 .04.03-.2.62-1.04.96-2.06.69L.56 4.99a.3.3 0 0 0-.35.21c-1.1 4.77 2.41 8.62 5.72 9.5ZM6 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"/>
              </svg>lobau.io</a>       
              </div>
            </div>
          </div>
        </body>
        </html>
        `;
};

