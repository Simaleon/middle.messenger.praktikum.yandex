const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi,
    stringRegexp = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/,
    methodRegexp = /\D+\(\)$/;

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

// deep merge objects
function merge(target, ...sources) {
    if (!sources.length) {
        return target;
    }

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }

                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
}

// get value from object by string path, for example 'user.description.displayName'
function get(obj, path, defaultValue) {
    const keys = path.split('.');

    let result = obj;
    for (let key of keys) {
        result = result[key];

        if (result === undefined) {
            return defaultValue;
        }
    }

    return result ?? defaultValue; // "??" — [оператор нулевого слияния]
}

// parse string (with variables and methods from context) to expression and calculate result
// logical, math, ternary condition operator and brackets not supported yet
function parseExpression(expression, context, localContext) {
    if(localContext) {
        context = Object.assign({}, context, { data: localContext });
    }

    function _parseExpression(expression) {
        expression = expression.trim();

        // comparison operators
        if (expression.indexOf('===') > -1) {
            const expressionArr = expression.split('===');

            return _parseExpression(expressionArr[0]) === _parseExpression(expressionArr[1]);
        }

        if (expression.indexOf('!==') > -1) {
            const expressionArr = expression.split('!==');

            return _parseExpression(expressionArr[0]) !== _parseExpression(expressionArr[1]);
        }

        if (expression.indexOf('>') > -1) {
            const expressionArr = expression.split('>');

            return _parseExpression(expressionArr[0]) > _parseExpression(expressionArr[1]);
        }

        if (expression.indexOf('>=') > -1) {
            const expressionArr = expression.split('>=');

            return _parseExpression(expressionArr[0]) >= _parseExpression(expressionArr[1]);
        }

        if (expression.indexOf('<') > -1) {
            const expressionArr = expression.split('<');

            return _parseExpression(expressionArr[0]) < _parseExpression(expressionArr[1]);
        }

        if (expression.indexOf('<=') > -1) {
            const expressionArr = expression.split('<=');

            return _parseExpression(expressionArr[0]) <= _parseExpression(expressionArr[1]);
        }

        // logical NOT
        if (expression.startsWith('!')) {
            return !_parseExpression(expression.substring(1));
        }

        // primitives
        if (stringRegexp.test(expression)) {
            return expression.substring(1, expression.length - 1);
        }

        const number = Number.parseFloat(expression);

        if (!isNaN(number)) {
            return number;
        }

        if (expression === 'true') {
            return true;
        }

        if (expression === 'false') {
            return false;
        }

        if (expression === 'null') {
            return null;
        }

        if (expression === 'undefined') {
            return undefined;
        }

        // check context variable
        const value = get(context.data, expression);

        if (value !== undefined) {
            return value;
        }

        // check context method
        if (methodRegexp.test(expression)) {
            const methodName = expression.substring(0, expression.length - 2);

            if (context.methods[methodName]) {
                return context.methods[methodName].call(Object.assign({}, context.data, context.methods));
            }
        }
    }

    return _parseExpression(expression);
}

function setEventHandlers(componentDesc, node, newNode = node) {
    node.getAttributeNames().forEach(attr => {
        if(attr.startsWith('@')) { // methods
            const method = componentDesc.methods && componentDesc.methods[node.getAttribute(attr)];

            if(method) {
                newNode.addEventListener(attr.substring(1), method);
            }
        }
    });
}

function proceedNode(node, componentDesc, localContext) {
    if(node.nodeType === 3) {    // text
        // parse variables
        let textContent = node.textContent,
            key = null;

        while ((key = TEMPLATE_REGEXP.exec(textContent))) {
            if (key[1]) {
                const tmplValue = key[1].trim(),
                    data = parseExpression(tmplValue, componentDesc, localContext);

                textContent = textContent.replace(new RegExp(key[0], "gi"), data);
            }
        }

        node.textContent = textContent;
    } else {
        const forAttr = node.getAttribute('for');

        if(forAttr) {
            const forAttSplit = forAttr.split('in'),
                forVariable = forAttSplit[0].trim(),
                forArray = get(componentDesc.data, forAttSplit[1].trim());

            node.removeAttribute('for');

            let currentNode = node;

            forArray.forEach(value => {
                const newNode = node.cloneNode(true);

                currentNode.after(newNode);

                currentNode = newNode;

                if(localContext) {
                    localContext = Object.assign({}, localContext, { [forVariable]: value });
                } else {
                    localContext = { [forVariable]: value };
                }

                proceedNode(newNode, componentDesc, localContext);
            });

            node.parentElement.removeChild(node);
        } else {
            if (node.tagName.indexOf('-') > -1) { // custom element
                if (componentDesc.components[node.localName]) {
                    const data = {};

                    for (let i = 0; i < node.attributes.length; i++) {
                        if (node.attributes[i].name.startsWith(':')) {
                            data[node.attributes[i].name.substring(1)] = parseExpression(node.attributes[i].value, componentDesc, localContext);
                        } else {
                            data[node.attributes[i].name] = node.attributes[i].value;
                        }
                    }

                    const newNode = Templator.compile(merge({}, componentDesc.components[node.localName], {data}));

                    node.classList.forEach(cssClass => {
                        newNode.classList.add(cssClass);
                    });

                    setEventHandlers(componentDesc, node, newNode);

                    node.replaceWith(newNode);
                }
            } else {
                node.getAttributeNames().forEach(attr => {
                    if (attr.startsWith(':')) {
                        node.setAttribute(attr.substring(1), parseExpression(node.getAttribute(attr), componentDesc, localContext));

                        node.removeAttribute(attr);
                    }
                });

                let condition = false;  // condition completed flag

                node.childNodes.forEach(child => {
                    if (child.nodeType === 3) {
                        proceedNode(child, componentDesc, localContext);
                    } else {
                        const ifStatement = child.getAttribute('if');

                        if (ifStatement) {
                            if (parseExpression(ifStatement, componentDesc, localContext)) {
                                proceedNode(child, componentDesc, localContext);

                                condition = true;
                            }
                        } else {
                            const elseIfStatement = child.getAttribute('else-if');

                            if (elseIfStatement) {
                                if (parseExpression(elseIfStatement, componentDesc, localContext)) {
                                    proceedNode(child, componentDesc, localContext);

                                    condition = true;
                                }
                            } else {
                                const elseStatement = child.getAttribute('else');

                                if (elseStatement === '') {
                                    if (!condition) {
                                        proceedNode(child, componentDesc, localContext);
                                    }
                                } else {
                                    proceedNode(child, componentDesc, localContext);
                                }

                                condition = false;
                            }
                        }
                    }
                });

                setEventHandlers(componentDesc, node);
            }
        }
    }
}

class Templator {
    static parser = new DOMParser();

    static compile(componentDesc, data) {
        const doc = this.parser.parseFromString(componentDesc.template, 'text/html').body.childNodes[0];

        if(data) {
            componentDesc = merge({}, componentDesc, { data });
        }

        proceedNode(doc, componentDesc);

        return doc;
    }
}

export default Templator;