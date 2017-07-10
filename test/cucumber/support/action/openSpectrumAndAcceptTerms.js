/**
 * Open the given URL
 * @param  {String}   type Type of navigation (url or site)
 * @param  {String}   page The URL to navigate to
 * @param  {Function} done Function to execute when finished
 */
module.exports = (done) => {
    /**
     * The URL to navigate to
     * @type {String}
     */

    browser.url('http://localhost:8080');

    browser.click(".modal .green.button");

    done();
};
