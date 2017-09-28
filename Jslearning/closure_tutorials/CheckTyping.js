goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.provide('test.checktyping');


/**
 *
 * @constructor
 * @struct
 *
 */
test.checktyping.TypingKeyHandler = function(element, pressTimeout)
{

    // Super class constructor.
    goog.events.KeyHandler.call(this, element);
    this.current_timeout = undefined;
    this.typing_text_set = false;
    this.press_timeout = pressTimeout;

};

goog.inherits(test.checktyping.TypingKeyHandler, goog.events.KeyHandler);

test.checktyping.TypingKeyHandler.prototype.key_pressed_handler = function (key)
{
    console.log(key.charCode + ' pressed');
    if (this.typing_text_set === false)
    {
        goog.dom.getDocument().getElementById('hi').innerHTML = "You're typing now...";
        this.typing_text_set = true;
    }

    if (this.current_timeout !== undefined)
    {
        clearTimeout(this.current_timeout);
    }

    this.current_timeout = setTimeout(this.finished_typing_notifier, this.press_timeout, this);
};


test.checktyping.TypingKeyHandler.prototype.attach_checkTyping_handler = function ()
{
    goog.events.listen(this, goog.events.KeyHandler.EventType.KEY, this.key_pressed_handler);
};

test.checktyping.TypingKeyHandler.prototype.finished_typing_notifier = function (context)
{
    goog.dom.getDocument().getElementById('hi').innerHTML = "You finished typing.";
    context.typing_text_set = false;
};

