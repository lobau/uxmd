module.exports = async () => {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>UXMD</title>
                <meta charset="UTF-8" />
                <link rel="icon" href="public/favicon.svg" />
                <link href="http://fonts.cdnfonts.com/css/cpmonov07" rel="stylesheet"></link>
                <link rel="stylesheet" href="public/style.css" />
                <script defer data-domain="uxmd.io" src="https://plausible.io/js/plausible.js"></script>
            </head>
            <body>
                <div id="error_not_found">404<a href="/">Go Back</a></div>
            </body>
        </html>`;
};
