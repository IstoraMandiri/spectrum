/**
 * Wait for the given element to become visible
 * @param  {String}   elem      Element selector
 * @param  {String}   falseCase Whether or not to expect a visible or hidden
 *                              state
 * @param  {Function} done      Function to execute when finished
 *
 * @todo  merge with waitfor
 */
module.exports = (elem, falseCase, done) => {
    /**
     * Maximum number of milliseconds to wait for
     * @type {Int}
     */
    const ms = 10000;

    const method = elem.indexOf('=') > -1 ? 'waitForText' : 'waitForVisible';

    browser[method](elem, ms, !!falseCase);

    done();
};
