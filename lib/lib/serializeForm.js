/* eslint no-param-reassign: 0, guard-for-in: 0, no-lonely-if: 0, prefer-const: 0, max-len: 0, no-restricted-syntax: 0, arrow-parents: 0, arrow-body-style: 0, no-useless-escape: 0, no-undef: 0, arrow-parens: 0, no-underscore-dangle: 0 */
/*!
 SerializeJSON jQuery plugin.
 https://github.com/marioizquierdo/jquery.serializeJSON
 version 2.7.2 (Dec, 2015)
 Copyright (c) 2012, 2015 Mario Izquierdo
 Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

 The original jquery version was translated into this ES2015 functional version.
 Mike Kornelson - July 19, 2016
 */
import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';
import isNumeric from 'lodash/isNumber';
import isArray from 'lodash/isArray';
import extend from 'lodash/extend';
import $ from 'jquery';

/**
 * Given a string, apply the type or the relevant "parse" options, to return the parsed value
 * @param valStr
 * @param inputName
 * @param type
 * @param opts
 * @return {*}
 */
function parseValue(valStr, inputName, type, opts) {
	let parsedVal = valStr; // if no parsing is needed, the returned value will be the same

	if (opts.typeFunctions && type && opts.typeFunctions[type]) { // use a type if available
		parsedVal = opts.typeFunctions[type](valStr);
	} else if (opts.parseNumbers && isNumeric(valStr)) { // auto: number
		parsedVal = Number(valStr);
	} else if (opts.parseBooleans && (valStr === 'true' || valStr === 'false')) { // auto: boolean
		parsedVal = (valStr === 'true');
	} else if (opts.parseNulls && valStr === 'null') { // auto: null
		parsedVal = null;
	}
	if (opts.parseWithFunction && !type) { // custom parse function (apply after previous parsing options, but not if there's a specific type)
		parsedVal = opts.parseWithFunction(parsedVal, inputName);
	}

	return parsedVal;
}

const defaultOptions = {
	checkboxUncheckedValue: undefined, // to include that value for unchecked checkboxes (instead of ignoring them)

	parseNumbers: false, // convert values like "1", "-2.33" to 1, -2.33
	parseBooleans: false, // convert "true", "false" to true, false
	parseNulls: false, // convert "null" to null
	parseAll: false, // all of the above
	parseWithFunction: null, // to use custom parser, a function like: function(val){ return parsed_val; }

	customTypes: {}, // override defaultTypes
	defaultTypes: {
		string(str) {
			return String(str);
		},
		number(str) {
			return Number(str);
		},
		boolean(str) {
			let falses = ['false', 'null', 'undefined', '', '0'];
			return falses.indexOf(str) === -1;
		},
		null(str) {
			let falses = ['false', 'null', 'undefined', '', '0'];
			return falses.indexOf(str) === -1 ? str : null;
		},
		array(str) {
			return JSON.parse(str);
		},
		object(str) {
			return JSON.parse(str);
		},
		auto(str) {
			return parseValue(str, null, null, {
				parseNumbers: true,
				parseBooleans: true,
				parseNulls: true,
			});
		}, // try again with something like 'parseAll'
		skip: null, // skip is a special type that makes it easy to ignore elements
	},

	useIntKeysAsArrayIndex: false, // name="foo[2]" value="v" => {foo: [null, null, "v"]}, instead of {foo: ["2": "v"]}
};

/**
 * Merge option defaults into the options
 * @param options
 * @return {{checkboxUncheckedValue, parseNumbers: *, parseBooleans: *, parseNulls: *, parseWithFunction, typeFunctions: *, useIntKeysAsArrayIndex}}
 */
function setupOpts(options) {
	let opts = options || {};

	// Make sure that the user didn't misspell an option
	let validOpts = ['checkboxUncheckedValue', 'parseNumbers', 'parseBooleans', 'parseNulls', 'parseAll', 'parseWithFunction', 'customTypes', 'defaultTypes', 'useIntKeysAsArrayIndex']; // re-define because the user may override the defaultOptions
	let opt;
	for (opt in opts) {
		if (validOpts.indexOf(opt) === -1) {
			throw new Error(`serializeJSON ERROR: invalid option '${opt}'. Please use one of ${validOpts.join(', ')}`);
		}
	}

	// Helper to get the default value for this option if none is specified by the user
	let optWithDefault = (key) => {
		return (opts[key] !== false) && (opts[key] !== '') && (opts[key] || defaultOptions[key]);
	};

	// Return computed options (opts to be used in the rest of the script)
	let parseAll = optWithDefault('parseAll');
	return {
		checkboxUncheckedValue: optWithDefault('checkboxUncheckedValue'),
		parseNumbers: parseAll || optWithDefault('parseNumbers'),
		parseBooleans: parseAll || optWithDefault('parseBooleans'),
		parseNulls: parseAll || optWithDefault('parseNulls'),
		parseWithFunction: optWithDefault('parseWithFunction'),
		typeFunctions: extend({}, optWithDefault('defaultTypes'), optWithDefault('customTypes')),
		useIntKeysAsArrayIndex: optWithDefault('useIntKeysAsArrayIndex'),
	};
}

/**
 * 1,2,3,4 ... are valid array indexes
 * @param val
 * @return {boolean}
 */
function isValidArrayIndex(val) {
	return /^[0-9]+$/.test(String(val));
} // 1,2,3,4 ... are valid array indexes

function optionKeys(obj) {
	if (Object.keys) {
		return Object.keys(obj);
	}
	let key;
	let keys = [];
	for (key in obj) {
		keys.push(key);
	}
	return keys;
} // polyfill Object.keys to get option keys in IE<9

/**
 * Fill the formAsArray object with values for the unchecked checkbox inputs,
 * using the same format as the jquery.serializeArray function.
 * The value of the unchecked values is determined from the opts.checkboxUncheckedValue
 * and/or the data-unchecked-value attribute of the inputs.
 * @param formAsArray
 * @param options
 * @param $form
 */
function readCheckboxUncheckedValues(formAsArray, options, $form) {
	let opts = options || {};
	let selector = 'input[type=checkbox][name]:not(:checked):not([disabled])';
	let $uncheckedCheckboxes = $form.find(selector).add($form.filter(selector));
	$uncheckedCheckboxes.each((i, el) => {
		let $el = $(el);
		let dataUncheckedValue = $el.attr('data-unchecked-value');
		if (dataUncheckedValue) { // data-unchecked-value has precedence over option opts.checkboxUncheckedValue
			formAsArray.push({name: el.name, value: dataUncheckedValue});
		} else {
			if (!isUndefined(opts.checkboxUncheckedValue)) {
				formAsArray.push({name: el.name, value: opts.checkboxUncheckedValue});
			}
		}
	});
}

/**
 * Returns and object with properties {name_without_type, type} from a given name.
 * The type is null if none specified. Example:
 *   "foo"           =>  {nameWithNoType: "foo",      type:  null}
 *   "foo:boolean"   =>  {nameWithNoType: "foo",      type: "boolean"}
 *   "foo[bar]:null" =>  {nameWithNoType: "foo[bar]", type: "null"}
 * @param name
 * @return {*}
 */
function extractTypeAndNameWithNoType(name) {
	let match = name.match(/(.*):([^:]+)$/);
	if (match) {
		return {nameWithNoType: match[1], type: match[2]};
	}
	return {nameWithNoType: name, type: null};
}

/**
 * Find an input in the $form with the same name,
 * and get the data-value-type attribute.
 * Returns nil if none found. Returns the first data-value-type found if many inputs have the same name.
 * @param name
 * @param $form
 * @return {*|null}
 */
function tryToFindTypeFromDataAttr(name, $form) {
	let escapedName = name.replace(/(:|\.|\[|\]|\s)/g, '\\$1'); // every non-standard character need to be escaped by \\
	let selector = `[name="${escapedName}"]`;
	let $input = $form.find(selector).add($form.filter(selector));
	let typeFromDataAttr = $input.attr('data-value-type'); // NOTE: this returns only the first $input element if multiple are matched with the same name (i.e. an "array[]"). So, arrays with different element types specified through the data-value-type attr is not supported.
	return typeFromDataAttr || null;
}

/**
 * Raise an error if the type is not recognized.
 * @param name
 * @param type
 * @param opts
 * @return {boolean}
 */
function validateType(name, type, opts) {
	let validTypes = optionKeys(opts ? opts.typeFunctions : defaultOptions.defaultTypes);
	if (!type || validTypes.indexOf(type) !== -1) {
		return true;
	}
	throw new Error(`serializeJSON ERROR: Invalid type ${type} found in input name '${name}', please use one of ${validTypes.join(', ')}`);
}

/**
 * Split the input name in programatically readable keys.
 * Examples:
 * "foo"              => ['foo']
 * "[foo]"            => ['foo']
 * "foo[inn][bar]"    => ['foo', 'inn', 'bar']
 * "foo[inn[bar]]"    => ['foo', 'inn', 'bar']
 * "foo[inn][arr][0]" => ['foo', 'inn', 'arr', '0']
 * "arr[][val]"       => ['arr', '', 'val']
 * @param nameWithNoType
 * @return {*}
 */
function splitInputNameIntoKeysArray(nameWithNoType) {
	let keys = nameWithNoType.split('['); // split string into array
	keys = keys.map(key => key.replace(/\]/g, ''));
	if (keys[0] === '') {
		keys.shift();
	} // ensure no opening bracket ("[foo][inn]" should be same as "foo[inn]")
	return keys;
}

/**
 * Set a value in an object or array, using multiple keys to set in a nested object or array:
 * deepSet(obj, ['foo'], v)               // obj['foo'] = v
 * deepSet(obj, ['foo', 'inn'], v)        // obj['foo']['inn'] = v // Create the inner obj['foo'] object, if needed
 * deepSet(obj, ['foo', 'inn', '123'], v) // obj['foo']['arr']['123'] = v
 *
 * deepSet(obj, ['0'], v)                                   // obj['0'] = v
 * deepSet(arr, ['0'], v, {useIntKeysAsArrayIndex: true})   // arr[0] = v
 * deepSet(arr, [''], v)                                    // arr.push(v)
 * deepSet(obj, ['arr', ''], v)                             // obj['arr'].push(v)
 *
 * arr = [];
 * deepSet(arr, ['', v]          // arr => [v]
 * deepSet(arr, ['', 'foo'], v)  // arr => [v, {foo: v}]
 * deepSet(arr, ['', 'bar'], v)  // arr => [v, {foo: v, bar: v}]
 * deepSet(arr, ['', 'bar'], v)  // arr => [v, {foo: v, bar: v}, {bar: v}]
 * @param o
 * @param keys
 * @param value
 * @param options
 */
function deepSet(o, keys, value, options) {
	let opts = options || {};

	if (isUndefined(o)) {
		throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined");
	}
	if (!keys || keys.length === 0) {
		throw new Error("ArgumentError: param 'keys' expected to be an array with least one element");
	}

	let key = keys[0];

	// Only one key, then it's not a deepSet, just assign the value.
	if (keys.length === 1) {
		if (key === '') {
			o.push(value); // '' is used to push values into the array (assume o is an array)
		} else {
			o[key] = value; // other keys can be used as object keys or array indexes
		}

		// With more keys is a deepSet. Apply recursively.
	} else {
		let nextKey = keys[1];

		// '' is used to push values into the array,
		// with nextKey, set the value into the same object, in object[nextKey].
		// Covers the case of ['', 'foo'] and ['', 'var'] to push the object {foo, var}, and the case of nested arrays.
		if (key === '') {
			let lastIdx = o.length - 1; // asume o is array
			let lastVal = o[lastIdx];
			if (isObject(lastVal) && (isUndefined(lastVal[nextKey]) || keys.length > 2)) { // if nextKey is not present in the last object element, or there are more keys to deep set
				key = lastIdx; // then set the new value in the same object element
			} else {
				key = lastIdx + 1; // otherwise, point to set the next index in the array
			}
		}

		// '' is used to push values into the array "array[]"
		if (nextKey === '') {
			if (isUndefined(o[key]) || !isArray(o[key])) {
				o[key] = []; // define (or override) as array to push values
			}
		} else {
			if (opts.useIntKeysAsArrayIndex && isValidArrayIndex(nextKey)) { // if 1, 2, 3 ... then use an array, where nextKey is the index
				if (isUndefined(o[key]) || !isArray(o[key])) {
					o[key] = []; // define (or override) as array, to insert values using int keys as array indexes
				}
			} else { // for anything else, use an object, where nextKey is going to be the attribute name
				if (isUndefined(o[key]) || !isObject(o[key])) {
					o[key] = {}; // define (or override) as object, to set nested properties
				}
			}
		}

		// Recursively set the inner object
		let tail = keys.slice(1);
		deepSet(o[key], tail, value, opts);
	}
}

/**
 * Serialize an HTML form
 * @param {Element} elem
 * @param {Object} options
 * @return {*}
 */
export default function serializeForm(elem, options) {
	let $form = $(elem); // NOTE: the set of matched elements is most likely a form, but it could also be a group of inputs
	let opts = setupOpts(options); // calculate values for options {parseNumbers, parseBoolens, parseNulls, ...} with defaults

	// Use native `serializeArray` function to get an array of {name, value} objects.
	let formAsArray = $form.serializeArray();
	readCheckboxUncheckedValues(formAsArray, opts, $form); // add objects to the array from unchecked checkboxes if needed

	// Convert the formAsArray into a serializedObject with nested keys
	let serializedObject = {};
	formAsArray.forEach((obj) => {
		let name = obj.name; // original input name
		let value = obj.value; // input value
		let _obj = extractTypeAndNameWithNoType(name);
		let nameWithNoType = _obj.nameWithNoType; // input name with no type (i.e. "foo:string" => "foo")
		let type = _obj.type; // type defined from the input name in :type colon notation
		if (!type) type = tryToFindTypeFromDataAttr(name, $form); // type defined in the data-value-type attr
		validateType(name, type, opts); // make sure that the type is one of the valid types if defined

		if (type !== 'skip') { // ignore elements with type 'skip'
			let keys = splitInputNameIntoKeysArray(nameWithNoType);
			value = parseValue(value, name, type, opts); // convert to string, number, boolean, null or customType
			deepSet(serializedObject, keys, value, opts);
		}
	});
	return serializedObject;
}
