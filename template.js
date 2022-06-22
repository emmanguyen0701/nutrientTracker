export default () => {
    return `<doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <title>Bad Nutrients Tracker</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,600">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            </head>
            <body>
                <div id="root"></div>
                <script type="text/javascript" src="/dist/bundle.js" async defer></script>
                <script src="https://accounts.google.com/gsi/client" async defer></script>
            </body>
        </html>
    `
}