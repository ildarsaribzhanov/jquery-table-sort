# JQuery sort table

### How use
```javascript
$('.js-table-sort').tableSort({
	sortRule: [null, 'word', 'digit', ['digit', 'dnf', 'dns'], 'word']
});
```

### Rules
* **null** - no sortable column
* **digit** - sort column as numbers
* **word** - sort column as strings
* **digiword** - sort column as numbers + strings. Digits is first
* **[array]** - custom rule