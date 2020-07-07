# Invoice view
Sample Invoice data viewer.

Features:
1. The app would be able to display the provided data in a list, showing all of the content except for the "invoiceLines"
2. The user is able to view the invoiceLines in a modal
3. The user is able to hide the grid columns that he/she does not want to see. There is no way to "unhide" them
4. The user is able to modify the "closed" status of the invoice inline in the grid
5. Account balance is shown at the top of the screen
6. The user is able to modify the price or quantity of the invoice line

This app uses [Mock Service Worker](https://github.com/mswjs/msw) to intercept fetch request with test JSON data.
The main JSON object is showing on the bottom of the page so You can track changes in real time.

No global state control library like Redux is used as not needed.
We could use "react-table" for inline edit, but I tried to make the editing process more customized.

## Available Scripts

In the project directory, you can run:

### `npm install`

To install all needed dependencies. Then

### `npm start`

To run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run update`

To re-create mocked Service Worker.

### `npm run build`

Builds the app for production to the `build` folder.<br />
Notice fetch requests are not mocked in production.
