'use strict';

var parse = require('slick').parse;
/* Slick.parse returns: https://github.com/kamicane/slick#format */



module.exports = selector2tag;



function selector2tag(raw) {

	return new ParsedSelector(raw);

}



function ParsedSelector(raw) {

	var selectorObj = parse(raw);

	var oneSelector = (selectorObj.length === 1) && (selectorObj[0].length === 1);
	if (!oneSelector) { // todo: Rework to handle multi-tag selectors?
		throw new Error('selector2tag only handles one-tag selectors.');
	}

	this.selectorObj = selectorObj;

}

Object.defineProperties(ParsedSelector.prototype, {
	'tagName': { get: getTagName },
	'id': { get: getId },
	'classNames': { get: getClassNames },
	'miscAttrs':  { get: getMiscAttrs },
	'openingTag': { get: getOpeningTag },
	'closingTag': { get: getClosingTag },
	'toString': {
		value: function parsedSelectorToString() {
			return this.selectorObj.raw;
		}
	},
});


function getTagName() {
	var tag = this.selectorObj[0][0].tag;
	if (tag === '*') tag = 'div';
	return tag;
}

function getId() {
	var id = this.selectorObj[0][0].id;
	if (id === undefined) return '';
	return id;
}

function getClassNames() {
	var classList = this.selectorObj[0][0].classList;
	if (classList === undefined) return '';
	return classList.join(' ');
}


function getMiscAttrs() {
	var selAttrs = this.selectorObj[0][0].attributes;
	if (selAttrs === undefined) return '';

	var attrs = {};
	/* Find the attribute rules specified */
	selAttrs.forEach(function(v) {
		var attr = attrs[v.escapedName] || (attrs[v.escapedName] = {});
		

		switch (v.operator) {
		case '=':
			attr.value = v.escapedValue;
		break;
		case '^=': /* Starts with value */
		case '|=': /* Start with value or value- */
			attr.starts = v.escapedValue;
		break;
		case '~=': /* Includes value (space-seperated) */
		case '*=': /* Includes value (with or without spaces) */
			attr.has = attr.has || '';
			attr.has += ' '+v.escapedValue+' ';
		break;
		case '$=': /* Ends with value */
			attr.ends = v.escapedValue;
		break;
		default: /* [attr] */
			attrs[v.escapedName] = Object.keys(attr) === 0
				? attr
				: null;
		}
	});

	var result = '';
	/* Build attributes which match those rules */
	for (var attrName in attrs) {
		var attr = attrs[attrName];
		
		if (attr === null) {
			result += ' ' + attrName;
			continue;
		}

		attr.starts = attr.starts || '';
		attr.has = attr.has || '';
		attr.ends = attr.ends || '';

		attr.value = attr.value || (attr.starts + attr.has + attr.ends);
		result += ' ' + attrName + '="' + attr.value + '"';
	}

	
	return result;
}



function getOpeningTag() {

	var result = '<' + this.tagName;

	if (this.id) result += ' id="' + this.id + '"';
	if (this.classNames) result += ' class="' + this.classNames + '"';
	result += this.miscAttrs;

	result += '>';

	return result;
}

function getClosingTag() {

	return '</' + this.tagName + '>';
}