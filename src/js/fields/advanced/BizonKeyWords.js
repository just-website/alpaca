(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.KeyWordsField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.KeyWordsField.prototype
     */
    {

        /**
         * @see Alpaca.Fields.KeyWordsField#getFieldType
         */
        getFieldType: function() {
            return "bizon-key-words";
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
			setup: function()
			{
            this.base();
			this.inputType = "bizon-key-words";
		},

		/**
		 * Инициализация, вызывается после рендеринга элемента
		 */
		init: function() 
		{
			/* для ключевых слов */
			let that = this;
			$(`#${that.id}`).tokenfield();
		},

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val)
        {
            if (!val) {
                return this.base(val);
            }

            var upperValue = null;
            if (val && Alpaca.isString(val)) {
                upperValue = val;
            }

            if (upperValue != this.getValue()) // jshint ignore:line
            {
                this.base(upperValue);
			}
			console.log('set value live search');
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
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Key words";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Text field for key words.";
        }

        /* end_builder_helpers */
    });

    Alpaca.registerFieldClass("bizon-key-words", Alpaca.Fields.KeyWordsField);
    // Alpaca.registerDefaultFormatFieldMapping("uppercase", "uppercase");

})(jQuery);