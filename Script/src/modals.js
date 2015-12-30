/*======================================================
************   Modals   ************
======================================================*/
var _modalTemplateTempDiv = document.createElement('div');
zero.modalStack = [];
zero.modalStackClearQueue = function () {
    if (zero.modalStack.length) {
        (zero.modalStack.shift())();
    }
};
zero.modal = function (params) {
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
            if (params.buttons[index].close !== false) zero.closeModal(modal);
            if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
            if (params.onClick) params.onClick(modal, index);
        });
    });
    zero.openModal(modal);
    return modal[0];
};
zero.alert = function (text, title, callbackOk) {
    if (typeof title === 'function') {
        callbackOk = arguments[1];
        title = undefined;
    }
    return zero.modal({
        text: text || '',
        title: typeof title === 'undefined' ? zero.params.modalTitle : title,
        buttons: [ {text: zero.params.modalButtonOk, bold: true, onClick: callbackOk} ]
    });
};
zero.confirm = function (text, title, callbackOk, callbackCancel) {
    if (typeof title === 'function') {
        callbackCancel = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return zero.modal({
        text: text || '',
        title: typeof title === 'undefined' ? zero.params.modalTitle : title,
        buttons: [
            {text: zero.params.modalButtonCancel, onClick: callbackCancel},
            {text: zero.params.modalButtonOk, bold: true, onClick: callbackOk}
        ]
    });
};
zero.prompt = function (text, title, callbackOk, callbackCancel) {
    if (typeof title === 'function') {
        callbackCancel = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return zero.modal({
        text: text || '',
        title: typeof title === 'undefined' ? zero.params.modalTitle : title,
        afterText: '<div class="input-field"><input type="text" class="modal-text-input"></div>',
        buttons: [
            {
                text: zero.params.modalButtonCancel
            },
            {
                text: zero.params.modalButtonOk,
                bold: true
            }
        ],
        onClick: function (modal, index) {
            if (index === 0 && callbackCancel) callbackCancel($$(modal).find('.modal-text-input').val());
            if (index === 1 && callbackOk) callbackOk($$(modal).find('.modal-text-input').val());
        }
    });
};
zero.popup = function (modal, removeOnClose) {
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

    zero.openModal(modal);
    return modal[0];
};
zero.openModal = function (modal) {
    modal = $$(modal);
    var isModal = modal.hasClass('modal');
    if ($$('.modal.modal-in:not(.modal-out)').length && zero.params.modalStack && isModal) {
        zero.modalStack.push(function () {
            zero.openModal(modal);
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
zero.closeModal = function (modal) {
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
        zero.modalStackClearQueue();
    }
    modal.removeClass('modal-in modal-out').trigger('closed').hide();
    if (removeOnClose) {
        modal.remove();
    }

    return true;
};
