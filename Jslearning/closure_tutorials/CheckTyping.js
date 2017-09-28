goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyHandler');
goog.provide('test.checktyping');

// /**
//  *
//  * @constructor
//  * @struct
//  *
//  */
// test.checktyping.CheckTyping = function (pressTimeout)
// {

    test.checktyping.current_timeout = undefined;
    test.checktyping.typing_text_set = false;
    test.checktyping.press_timeout = 250;

//
// };

test.checktyping/*.CheckTyping.prototype*/.key_pressed_handler = function (key)
{
    console.log(key.charCode + ' pressed');
    if (test.checktyping.typing_text_set === false)
    {
        goog.dom.getDocument().getElementById('hi').innerHTML = "You're typing now...";
        test.checktyping.typing_text_set = true;
    }

    if (test.checktyping.current_timeout !== undefined)
    {
        clearTimeout(test.checktyping.current_timeout);
    }

    test.checktyping.current_timeout = setTimeout(test.checktyping.finished_typing_notifier,
        test.checktyping.press_timeout);
};


test.checktyping/*.CheckTyping.prototype*/.attach_checkTyping_handler = function (element,
                                                                                  press_timeout)
{
    var keyHandler = new goog.events.KeyHandler(element);
    test.checktyping.press_timeout = press_timeout;
    goog.events.listen(keyHandler, goog.events.KeyHandler.EventType.KEY,
        test.checktyping.key_pressed_handler);
};

test.checktyping/*.CheckTyping.prototype*/.finished_typing_notifier = function ()
{
    goog.dom.getDocument().getElementById('hi').innerHTML = "You finished typing.";
    test.checktyping.typing_text_set = false;
};