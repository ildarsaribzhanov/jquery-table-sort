# JQuery sort table

### How use
```javascript
$('.js-table-sort').tableSort({
	sortRule: [null, 'word', 'digit', ['digit', 'dnf', 'dns'], 'word']
});
```

### Rules
* **null** - no sortable column
* **word** - sort column as strings
* **digiword** - sort column as digits + strings. Digits is first
* **[array]** - custom rule