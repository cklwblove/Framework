/*======================================================
************   Modals   ************
======================================================*/
var _modalTemplateTempDiv = document.createElement('div');
Zero.modalStack = [];
Zero.modalStackClearQueue = function () {
    if (Zero.modalStack.length) {
        (Zero.modalStack.shift())();
    }
};
var modal = function (params) {
    params = params || {};
    var buttonsHTML = '';
    if (params.buttons && params.buttons.length > 0) {
        for (var i = 0; i < params.buttons.length; i++) {
            buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
        }
    }
    var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
    var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
    var afterTextHTML = params.afterText ? params.afterText : '';
    var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
    var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical': '';
    var modalButtonsHTML = params.buttons && params.buttons.length > 0 ? '<div class="modal-buttons modal-buttons-' + params.buttons.length + ' ' + verticalButtons + '">' + buttonsHTML + '</div>' : '';
    modalHTML = '<div class="modal ' + noButtons + ' ' + (params.cssClass || '') + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div>' + modalButtonsHTML + '</div>';

    _modalTemplateTempDiv.innerHTML = modalHTML;

    var modal = $$(_modalTemplateTempDiv).children();

    $$('body').append(modal[0]);

    // Add events on buttons
    modal.find('.modal-button').each(function (index, el) {
        $$(el).on('click', function (e) {
            if (params.buttons[index].close !== false) Zero.closeModal(modal);
            if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
            if (params.onClick) params.onClick(modal, index);
        });
    });
    Zero.openModal(modal);
    return modal[0];
};
Zero.alert = function (text, title, callbackOk) {
    if (typeof title === 'function') {
        callbackOk = arguments[1];
        title = undefined;
    }
    return Zero.modal({
        text: text || '',
        title: typeof title === 'undefined' ? Zero.params.modalTitle : title,
        buttons: [ {text: Zero.params.modalButtonOk, bold: true, onClick: callbackOk} ]
    });
};
Zero.confirm = function (text, title, callbackOk, callbackCancel) {
    if (typeof title === 'function') {
        callbackCancel = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return Zero.modal({
        text: text || '',
        title: typeof title === 'undefined' ? Zero.params.modalTitle : title,
        buttons: [
            {text: Zero.params.modalButtonCancel, onClick: callbackCancel},
            {text: Zero.params.modalButtonOk, bold: true, onClick: callbackOk}
        ]
    });
};
Zero.prompt = function (text, title, callbackOk, callbackCancel) {
    if (typeof title === 'function') {
        callbackCancel = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return Zero.modal({
        text: text || '',
        title: typeof title === 'undefined' ? Zero.params.modalTitle : title,
        afterText: '<div class="input-field"><input type="text" class="modal-text-input"></div>',
        buttons: [
            {
                text: Zero.params.modalButtonCancel
            },
            {
                text: Zero.params.modalButtonOk,
                bold: true
            }
        ],
        onClick: function (modal, index) {
            if (index === 0 && callbackCancel) callbackCancel($$(modal).find('.modal-text-input').val());
            if (index === 1 && callbackOk) callbackOk($$(modal).find('.modal-text-input').val());
        }
    });
};
Zero.popup = function (modal, removeOnClose) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        var _modal = document.createElement('div');
        _modal.innerHTML = modal.trim();
        if (_modal.childNodes.length > 0) {
            modal = _modal.childNodes[0];
            if (removeOnClose) modal.classList.add('remove-on-close');
            $$('body').append(modal);
        }
        else return false; //nothing found
    }
    modal = $$(modal);
    if (modal.length === 0) return false;
    modal.show();

    Zero.openModal(modal);
    return modal[0];
};
Zero.openModal = function (modal) {
    modal = $$(modal);
    var isModal = modal.hasClass('modal');
    if ($$('.modal.modal-in:not(.modal-out)').length && Zero.params.modalStack && isModal) {
        Zero.modalStack.push(function () {
            Zero.openModal(modal);
        });
        return;
    }
    var isPopup = modal.hasClass('popup');
    if (isModal) {
        modal.show();
        modal.css({
            marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
        });
    }

    var overlay;

    if ($$('.modal-overlay').length === 0 && !isPopup) {
        $$('body').append('<div class="modal-overlay"></div>');
    }
    if ($$('.popup-overlay').length === 0 && isPopup) {
        $$('body').append('<div class="popup-overlay"></div>');
    }
    overlay = isPopup ? $$('.popup-overlay') : $$('.modal-overlay');

    // Trugger open event
    modal.trigger('open');

    // Classes for transition in
    overlay.addClass('modal-overlay-visible');
    modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
        if (modal.hasClass('modal-out')) modal.trigger('closed');
        else modal.trigger('opened');
    });
    return true;
};
Zero.closeModal = function (modal) {
    modal = $$(modal || '.modal-in');
    if (typeof modal !== 'undefined' && modal.length === 0) {
        return;
    }
    var isModal = modal.hasClass('modal');
    var isPopup = modal.hasClass('popup');
    var removeOnClose = modal.hasClass('remove-on-close');

    var overlay;
    
    if (isPopup) overlay = $$('.popup-overlay');
    else {
       overlay = $$('.modal-overlay');
    }

    if (isPopup){
        if (modal.length === $$('.popup.modal-in').length) {
            overlay.removeClass('modal-overlay-visible');
        }
    }
    else if (overlay && overlay.length > 0) {
        overlay.removeClass('modal-overlay-visible');
    }

    modal.trigger('close');

    if (isModal) {
        Zero.modalStackClearQueue();
    }
    modal.removeClass('modal-in modal-out').trigger('closed').hide();
    if (removeOnClose) {
        modal.remove();
    }

    return true;
};
