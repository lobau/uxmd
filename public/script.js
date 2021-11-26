const render = () => {
  // Grab the route from the URL
  let route = window.location.hash.substr(1);
  if (route === "") {
    route = "root";
  }

  // Grab the current markdown
  let uxdatafield = window.editor.getValue();

  // Generate the data object
  let uxdataraw = uxdatafield.slice(1);
  let uxdata = uxdataraw.split("\n/"); //cut each state
  let data = {};
  for (let i = 0; i < uxdata.length; i++) {
    let lines = uxdata[i].split(/\r?\n/);
    let slug = lines.shift();
    let body = lines.join("\n");
    let bodyHtml = marked.parse(body);
    data[slug] = bodyHtml;
  }

  if (data[route] === undefined) {
    if (route == "root") {
      $("render").innerHTML = `
        <div class="route_name">/error</div>
        <div class="card error">
        <h1>Root is missing</h1>
        <p>The first state <strong>has</strong> to be called /root</p>
        <p>Make sure the first line is "/root"</p>
        `;
    } else {
      $("render").innerHTML = `
        <div class="card error">
        <h1>${route}</h1>
        <p>
            State doesn't exist yet.
            <a href="javascript:window.history.back()">Back</a>
        </p>
        `;
    }
  } else {
    $("render").innerHTML = `
        <div class="card">
          <div class="route_name">/${route}</div>
          ${data[route]}
        </div>
        `;
  }
};

const $ = (el) => {
  return document.getElementById(el);
};

window.addEventListener("popstate", function () {
  render();
});

window.onload = () => {
  window.editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "markdown",
    theme: "uxmap",
    lineNumbers: true,
    lineWrapping: true
  });
  window.editor.on('change', function (i, op) {
    socket.emit('change', op);
    socket.emit('refresh', window.editor.getValue());
    socket.emit('updateDb', window.editor.getValue());
    render();
  });

  socket.on('refresh', function (data) {
    window.editor.setValue(data.body);
  });
  socket.on('change', function (data) {
    window.editor.replaceRange(data.text, data.from, data.to);
  });

  $("fab").addEventListener("click", function() {
    $("help_layer").style.visibility = "visible";
  })

  $("close_help").addEventListener("click", function() {
    $("help_layer").style.visibility = "hidden";
  })

  window.currentRoute = "root";

  render();

};
