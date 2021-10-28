module.exports = async (userId, sessionSecret) => {
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
                <script>
                    localStorage.setItem("__uxmd_session", JSON.stringify({user_id: ${userId}, secret: "${sessionSecret}"}))
                    window.location.href = "/"
                </script>
            </body>
        </html>`;
};
