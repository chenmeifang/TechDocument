// 为了防止别人滥用react element
// 需要将react element定义成为一个独一无二的值
// 在使用symbol之前，需要判断当前的宿主环境支不支持symbol
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;