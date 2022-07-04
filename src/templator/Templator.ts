import Component from "./Component";

type componentDesc = {
    components: Record<string, typeof Component>;
    data: Record<string, any>;
    methods: Record<string, () => void>;
};

const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi,
    stringRegexp = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/,
    methodRegexp = /\D+\(\)$/;

// get value from object by string path, for example 'user.description.displayName'
function get(obj: Record<string, any>, path: string): any {
    const keys: string[] = path.split('.');

    let result: Record<string, any> = obj;

    for (const key of keys) {
        result = result[key];
    }

    return result;
}

// parse string (with variables and methods from context) to expression and calculate result
// logical, math, ternary condition operator and brackets not supported yet
function parseExpression(expression: string, context: Record<string, any>, localContext?: Record<string, any>): any {
    if(localContext) {
        context = Object.assign({}, context, { data: localContext });
    }

    function _parseExpression(expression: string): any {
        expression = expression.trim();

        // comparison operators
        if (expression.indexOf('===') > -1) {
            const expressionArr: string[] = expression.split('===');

            return _parseExpression(expressionArr[0]) === _parseExpression(expressionArr[1]);
        }

        if (expression.indexOf('!==') > -1) {
            const expressionArr: string[] = expression.split('!==');

            return _parseExpression(expressionArr[0]) !== _parseExpression(expressionArr[1]);
        }

        if (expression.indexOf('>') > -1) {
            const expressionArr: string[] = expression.split('>');

            return _parseExpression(expressionArr[0]) > _parseExpression(expressionArr[1]);
        }

        if (expression.indexOf('>=') > -1) {
            const expressionArr: string[] = expression.split('>=');

            return _parseExpression(expressionArr[0]) >= _parseExpression(expressionArr[1]);
        }

        if (expression.indexOf('<') > -1) {
            const expressionArr: string[] = expression.split('<');

            return _parseExpression(expressionArr[0]) < _parseExpression(expressionArr[1]);
        }

        if (expression.indexOf('<=') > -1) {
            const expressionArr: string[] = expression.split('<=');

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
        const value: any = get(context.data, expression);

        if (value !== undefined) {
            return value;
        }

        // check context method
        if (methodRegexp.test(expression)) {
            const methodName: string = expression.substring(0, expression.length - 2);

            if (context.methods[methodName]) {
                return context.methods[methodName].call(Object.assign({}, context.data, context.methods));
            }
        }
    }

    return _parseExpression(expression);
}

function setEventHandlers(componentDesc: componentDesc, node: HTMLElement, newNode: HTMLElement = node) {
    node.getAttributeNames().forEach((attr: string) => {
        if(attr.startsWith('@')) { // methods
            const methodName: string = node.getAttribute(attr) || '';

            if(!methodName) {
                throw new Error('Method not defined');
            }

            const method: () => void | undefined = componentDesc.methods?.[methodName];

            if(method) {
                newNode.addEventListener(attr.substring(1), method);
            }
        }
    });
}

function proceedNode(node: HTMLElement, componentDesc: componentDesc, localContext?: Record<string, any>) {
    if(node.nodeType === 3) {    // text
        // parse variables
        let textContent: string = node.textContent || '',
            key = null;

        while ((key = TEMPLATE_REGEXP.exec(textContent))) {
            if (key[1]) {
                const tmplValue: string = key[1].trim(),
                    data: any = parseExpression(tmplValue, componentDesc, localContext);

                textContent = textContent.replace(new RegExp(key[0], "gi"), data);
            }
        }

        node.textContent = textContent;
    } else {
        const forAttr: string | null = node.getAttribute('for');

        if(forAttr) {
            const forAttSplit: string[] = forAttr.split('in'),
                forVariable: string = forAttSplit[0].trim(),
                forArray: any[] = get(componentDesc.data, forAttSplit[1].trim());

            node.removeAttribute('for');

            let currentNode: HTMLElement = node;

            forArray.forEach((value: any) => {
                const newNode: HTMLElement = node.cloneNode(true) as HTMLElement;

                currentNode.after(newNode);

                currentNode = newNode;

                if(localContext) {
                    localContext = Object.assign({}, localContext, { [forVariable]: value });
                } else {
                    localContext = { [forVariable]: value };
                }

                proceedNode(newNode, componentDesc, localContext);
            });

            node.parentElement?.removeChild(node);
        } else {
            if (node.tagName.indexOf('-') > -1) { // custom element
                if (componentDesc.components[node.localName]) {
                    const data: Record<string, any> = {};

                    for (let i = 0; i < node.attributes.length; i++) {
                        if (node.attributes[i].name.startsWith(':')) {
                            data[node.attributes[i].name.substring(1)] = parseExpression(node.attributes[i].value, componentDesc, localContext);
                        } else if (node.attributes[i].name === 'if' ||
                            node.attributes[i].name === 'for') {
                            // do nothing
                        } else {
                            data[node.attributes[i].name] = node.attributes[i].value;
                        }
                    }

                    const newNode: HTMLElement = new componentDesc.components[node.localName](data).element() as HTMLElement;

                    node.classList.forEach(cssClass => {
                        newNode.classList.add(cssClass);
                    });

                    setEventHandlers(componentDesc, node, newNode);

                    node.replaceWith(newNode);
                }
            } else {
                node.getAttributeNames().forEach((attr: string) => {
                    if (attr.startsWith(':')) {
                        const attrValue: string | null = node.getAttribute(attr);

                        if(!attrValue) {
                            throw new Error('Variable value not defined');
                        }

                        node.setAttribute(attr.substring(1), parseExpression(attrValue, componentDesc, localContext));

                        node.removeAttribute(attr);
                    }
                });

                let condition = false;  // condition completed flag

                const children: HTMLElement[] = [];

                // create separate array to avoid errors during 'for' attribute working
                node.childNodes.forEach(child => {
                    children.push(child as HTMLElement);
                });

                children.forEach((child: HTMLElement) => {
                    if (child.nodeType === 3) {
                        proceedNode(child, componentDesc, localContext);
                    } else {
                        const ifStatement: string | null = child.getAttribute('if');

                        if (ifStatement) {
                            if (parseExpression(ifStatement, componentDesc, localContext)) {
                                proceedNode(child, componentDesc, localContext);

                                condition = true;
                            } else {
                                child.parentElement?.removeChild(child);
                            }
                        } else {
                            const elseIfStatement: string | null = child.getAttribute('else-if');

                            if (elseIfStatement) {
                                if (parseExpression(elseIfStatement, componentDesc, localContext)) {
                                    proceedNode(child, componentDesc, localContext);

                                    condition = true;
                                } else {
                                    child.parentElement?.removeChild(child);
                                }
                            } else {
                                const elseStatement: string | null = child.getAttribute('else');

                                if (elseStatement === '') {
                                    if (condition) {
                                        child.parentElement?.removeChild(child);
                                    } else {
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
    static parser: DOMParser = new DOMParser();

    static compile(template: string, componentDesc: componentDesc = { components: {}, data: {}, methods: {} }): HTMLElement {
        const element: HTMLElement = this.parser.parseFromString(template, 'text/html').body.childNodes[0] as HTMLElement;

        proceedNode(element, componentDesc);

        return element;
    }
}

export default Templator;
