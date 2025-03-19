const styles = new Proxy({}, {
    get: function (target, prop) {
        return prop ? `${prop}` : '';
    }
});

module.exports = styles;