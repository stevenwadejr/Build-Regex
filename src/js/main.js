var $conditions_container = $('#conditions'),
    row_html = $('#row-template').html(),
    tester,
    options_without_params = ['anything', 'endOfLine', 'lineBreak', 'something', 'startOfLine', 'tab', 'word'],
    match_options = {
        add: 'Add',
        any: 'Any',
        anyOf: 'Any Of',
        anything: 'Anything',
        anythingBut: 'Anything But',
        endOfLine: 'End of Line',
        find: 'Find',
        lineBreak: 'Line Break',
        maybe: 'Maybe',
        or: 'Or',
        something: 'Something',
        somethingBut: 'Something But',
        startOfLine: 'Start of Line',
        tab: 'Tab',
        then: 'Then',
        word: 'Word'
    };

$('#new-condition').on('click', function(){
    $('<div />', { class: 'row' })
        .html(row_html)
        .find('select')
            .chain(function(){
                var $select = $(this);
                $.each(match_options, function(key, val){
                    $('<option />', { value: key }).text(val).appendTo($select);
                });
            })
            .on('change', function(){
                if ($.inArray($(this).val(), options_without_params) > -1) {
                    $(this).parents('.row').find('input').attr('disabled', 'disabled');
                } else {
                    $(this).parents('.row').find('input').removeAttr('disabled');
                }
                $(document).trigger('update-expression');
            })
        .end()
        .find('.match-param')
            .on('keyup', function(){
                $(document).trigger('update-expression');
            })
        .end()
        .find('.remove-match-option')
            .on('click', function(){
                $(this).parents('.row').remove();
                $(document).trigger('update-expression');
            })
            .end()
        .appendTo($conditions_container);
}).one('click', function(){
    $(document).trigger('first-row-created');
});

$(document).on({
    'first-row-created': function(){
        $conditions_container.dragsort({ 
            dragSelector: '.move-match-option',
            dragSelectorExclude: 'select, input',
            dragEnd: function(){
                $(document).trigger('update-expression');
            }
        });
    },
    'update-expression': function(){
        buildExpression();
    }
});

$('input[name="modifiers[]"]').on('change', function(){
    $(document).trigger('update-expression');
})


function buildExpression()
{
    var modifiers = $('input[name="modifiers[]"]:checked').map(function(){ return $(this).val(); });

    expression = new VerEx();
    $conditions_container.find('.row').each(function(){
        var $this = $(this),
            condition = $this.find('.match-options').val(),
            param = $this.find('.match-param').val();

        if ($.inArray(condition, options_without_params) > -1) {
            expression[condition]();
        } else {
            expression[condition](param);
        }
    });

    if ($conditions_container.children().length == 0) {
        expression = '';
    }

    for (var i = 0; i < modifiers.length; i++) {
        expression.addModifier(modifiers[i]);
    }

    $('#expression').find('span').text(expression);
}

$.fn.chain = function(fn) 
{
    fn.apply(this);
    return this;
}