function Zero(params) {
    // Default Parameters
    this.params = {
        // Modals
        modalButtonOk: '确定',
        modalButtonCancel: '取消',
        modalTitle: '系统消息',
        modalStack: true
    };

    this._init(params);
}

Zero.prototype = {
    constructor: Zero,
    version: version,
    util: util,
    validate: validate,
    client: client
};

Zero.prototype._init = function (params) {
    params = params || {};
    // Extend defaults with parameters
    for (var param in params) {
        this.params[param] = params[param];
    }
};

//Return instance
return Zero;