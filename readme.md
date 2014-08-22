## selector2tag

Utility function to build individual HTML tags from CSS selectors. Uses [Slick's parser](https://github.com/kamicane/slick) for most of the hard work. I should rework it to build multiple tags.

## Example

````js
	var sel2tag = require('selector2tag');
	var wrap = sel2tag('main#content.wrapper.foo[role="main"][bar]');
	
	var result = wrap.openingTag + 'Hello World' + wrap.closingTag;
````

Result:

````html
<main id="content" class="wrapper foo" role="main" bar>Hello World</main>
````

The tag name defaults to `div`.