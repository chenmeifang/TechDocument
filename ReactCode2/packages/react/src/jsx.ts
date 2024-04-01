// 需要定义ReactElement的构造函数
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';
const ReactElement = function (type: ElementType,
	key: Key,
	ref: Ref,
	props: Props): ReactElementType {
    const element = {
        // 怎么区分这种数据结构是一个react element呢？
        $$typeof: REACT_ELEMENT_TYPE,
        key,
        ref,
        props,
        type,
        __mark: 'kasong'
    }
    return element;
}

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
    let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val; // 传入的key会被强制转换为字符串
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
        // 判断是不是config自己的property，
        // 而不是config原型上的propetry
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}
	return ReactElement(type, key, ref, props);
}

export const jsxDEV = jsx;
// export const jsxDEV = (type: ElementType, config: any) => {
// 	let key: Key = null;
// 	const props: Props = {};
// 	let ref: Ref = null;

// 	for (const prop in config) {
// 		const val = config[prop];
// 		if (prop === 'key') {
// 			if (val !== undefined) {
// 				key = '' + val;
// 			}
// 			continue;
// 		}
// 		if (prop === 'ref') {
// 			if (val !== undefined) {
// 				ref = val;
// 			}
// 			continue;
// 		}
// 		if ({}.hasOwnProperty.call(config, prop)) {
// 			props[prop] = val;
// 		}
// 	}

// 	return ReactElement(type, key, ref, props);
// };