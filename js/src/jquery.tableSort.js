(function ( $ ) {
	$.fn.tableSort = function ( options ) {
		options = $.extend({
			sortRule: []
		}, options);

		var make = function () {
			var self = $(this),
			    rule = options.sortRule,
			    first_line;

			// Сортировка как числа
			function sortDigit( a, b ) {
				var int_a = parseFloat(a.val),
				    int_b = parseFloat(b.val);

				if( int_a > int_b ) return 1;

				if( int_a < int_b ) return -1;

				return 0;
			}

			// Сортировка как строки
			function sortWord( a, b ) {
				var int_a = a.val.toLowerCase(),
				    int_b = b.val.toLowerCase();

				if( int_a > int_b ) return 1;

				if( int_a < int_b ) return -1;

				return 0;
			}

			var is_first = true;

			// Обработка сортировки на клик
			self.on('click', 'th', function () {

				var i = $(this).index();

				if( rule[i] === null ) {
					return false;
				}

				self.find('th').not(this).removeClass('asc desc');

				if( $(this).hasClass('asc') ) {
					$(this).removeClass('asc').addClass('desc');
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

				switch ( rule[i] ) {
					case 'digit':
						table_dom.sort(sortDigit);
						break;

					case 'word':
						table_dom.sort(sortWord);
						break;

					default:
						table_dom.sort(sortWord);
						break;
				}


				// for ( key in table_dom ) {
				// 	console.log(table_dom[key].val);
				// }

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
