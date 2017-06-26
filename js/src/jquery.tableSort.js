(function ( $ ) {
	$.fn.tableSort = function ( options ) {
		options = $.extend({
			sortRule   : [],
			defaultRule: 'word'
		}, options);

		var make = function () {
			var self        = $(this),
			    rule        = options.sortRule,
			    defaultRule = options.defaultRule,
			    first_line;

			// Сортировка как числа
			function sortDigit( a, b ) {
				var int_a = parseFloat(a.val),
				    int_b = parseFloat(b.val);

				if( isNaN(int_a) ) {
					return 1;
				}

				if( int_a > int_b ) return 1;

				if( int_a < int_b ) return -1;

				return 0;
			}

			// Сортировка как строки
			function sortWord( a, b ) {
				var str_a = a.val.toLowerCase(),
				    str_b = b.val.toLowerCase();

				if( str_a > str_b ) return 1;

				if( str_a < str_b ) return -1;

				return 0;
			}

			// Сортировка как строки
			function sortDigiWord( a, b ) {
				var int_a = parseFloat(a.val),
				    int_b = parseFloat(b.val);

				if( isNaN(int_a) && isNaN(int_b) ) {
					return sortWord(a, b);
				}

				if( isNaN(int_a) && !isNaN(int_b) ) {
					return 1;
				}

				if( !isNaN(int_a) && isNaN(int_b) ) {
					return -1;
				}

				if( int_a > int_b ) return 1;

				if( int_a < int_b ) return -1;

				return 0;
			}

			// Сортировка по своему правилу
			function sortCustom( arr, ruleArray ) {
				var res = [],
				    key;

				for ( var i = 0; i < ruleArray.length; i++ ) {
					var sortArrDigit = [];

					// Если тут цифры
					if( ruleArray[i] === 'digit' ) {
						for ( key in arr ) {

							if( !isNaN(parseFloat(arr[key].val)) ) {
								sortArrDigit.push(arr[key]);
							}
						}

						sortArrDigit.sort(sortDigit);

						for ( key in sortArrDigit ) {
							res.push(sortArrDigit[key]);
						}
					}


					// Все остальное
					for ( key in arr ) {

						if( arr[key].val === ruleArray[i] ) {
							res.push(arr[key]);
						}
					}
				}

				return res;
			}

			var is_first = true;

			// Обработка сортировки на клик
			self.on('click', 'th', function () {

				var i     = $(this).index(),
				    order = 1;

				if( rule[i] === null ) {
					return false;
				}

				self.find('th').not(this).removeClass('asc desc');

				if( $(this).hasClass('asc') ) {
					$(this).removeClass('asc').addClass('desc');
					order = -1;
				} else {
					$(this).removeClass('desc').addClass('asc');
				}


				var table_dom  = [],
				    sort_array = [];

				self.find('tr').each(function () {
					if( is_first ) {
						first_line = $(this);
						is_first   = false;
						return;
					}

					table_dom.push({'val': $(this).find('td').eq(i).text(), 'html': $(this)});
					sort_array.push($(this).find('td').eq(i).text());

				});

				is_first = true;

				// Обработка правила сортировки
				if( rule[i] === 'digit' ) {
					table_dom.sort(sortDigit);

				} else if( rule[i] === 'word' ) {
					table_dom.sort(sortWord);

				} else if( rule[i] === 'digiword' ) {
					table_dom.sort(sortDigiWord);

				} else if( Array.isArray(rule[i]) ) {
					table_dom = sortCustom(table_dom, rule[i]);

				} else {

					switch ( defaultRule ) {
						case 'digit':
							table_dom.sort(sortDigit);
							break;

						case 'word':
							table_dom.sort(sortWord);
							break;

						case 'digiword':
							table_dom.sort(sortDigiWord);
							break;
					}
				}


				if( order < 0 ) {
					table_dom.reverse();
				}

				// Пересоберем таблицу
				self.html(first_line);
				for ( var key in table_dom ) {
					self.append(table_dom[key].html);
				}
			})
		};

		return this.each(make);
	};
})(jQuery);
