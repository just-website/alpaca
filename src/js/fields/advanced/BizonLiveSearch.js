(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.LiveSearchField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.LiveSearchField.prototype
     */
    {

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "live-search";
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
			setup: function()
			{
            this.base();
			this.inputType = "live-search";
		},

		/**
		 * Инициализация, вызывается после рендеринга элемента
		 */
		init: function() 
		{
			let that = this;
			$(`#input_relation_create_${that.options.relation.type_id}`).tokenfield({
				autocomplete: {
					source: function (request, response) {
						DataProvider.get_data('form_builder', {
							command: 'get_related',
							element_type: 'item',
							element_id: that.options.relation.type_id,
							q: request.term
						}).then(data => 
						{
							let goods = Object.entries(data)
								.map(([index, content]) => 
							{ 
								return {
									label: content, 
									value: index, 
									index
								}
							});
							response(goods);
						})
					},
					appendTo: `#td_relation_create_${that.options.relation.type_id }`,
					delay: 500
				},
				showAutocompleteOnFocus: true,
				limit: 1
			}).on('tokenfield:createtoken', function (e) {
				let field_value = e.attrs.value;
				$(`#${that.id}`).val(field_value);
				$(`#like_input__${that.options.relation.type_id}`).html(e.attrs.label);
				$(`#toggler_relation_edit_${that.options.relation.type_id}`).show();
				$(`#td_relation_create_${that.options.relation.type_id}`).hide();
				that.setValue(field_value);
			
			}).on('tokenfield:removedtoken', function (e) {
				$(`#${that.id}`).val('');
				$(`#like_input__${that.options.relation.type_id}`).html('<s>БЕЗ ЗНАЧЕНИЯ</s>');
				$(`#toggler_relation_edit_${that.options.relation.type_id}`).show();
				$(`#td_relation_create_${that.options.relation.type_id}`).hide();
				that.setValue('');
			});

			that.setValue($(`#${that.id}`).val())
	
			if (jQuery.ui.autocomplete.prototype._resizeMenu)
			{
				jQuery.ui.autocomplete.prototype._resizeMenu = function () { // без понятия что это
					var ul = this.menu.element;
					ul.outerWidth(this.element.parent(".tokenfield.form-control").outerWidth());
				};
			}
		},
		
		/**
		 * Очищаем поле по клику на "урну"
		 */
		create_table_remove_relation: function(rel_id)
		{
			let that = this;
			$(`#${that.id}`).val('');
			$('#like_input__' + rel_id + '').html('<s>БЕЗ ЗНАЧЕНИЯ</s>');
			$('#toggler_relation_edit_' + rel_id + '').show();
			$('#td_relation_create_' + rel_id + '').hide();
			that.setValue('');
		},

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val)
        {
			return this.base(val);
        },

        /**
         * @see Alpaca.ControlField#onKeyPress
         */
        onKeyPress: function(e)
        {
            this.base(e);

            var _this = this;

            Alpaca.later(25, this, function() {
                var v = _this.getValue();
                _this.setValue(v);
            });
        }

        /* builder_helpers */
        ,

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Live search";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Text field for live search autocomplete.";
        }

        /* end_builder_helpers */
    });

    Alpaca.registerFieldClass("live-search", Alpaca.Fields.LiveSearchField);
    // Alpaca.registerDefaultFormatFieldMapping("uppercase", "uppercase");

})(jQuery);