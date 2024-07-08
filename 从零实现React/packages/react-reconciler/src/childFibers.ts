import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { ReactElementType } from 'shared/ReactTypes';
import { createFiberFromElement, FiberNode } from './fiber';
import { Placement } from './fiberFlags';
import { HostText } from './workTags';

/**
 *
 * @param shouldTrackEffects 是否为Fiber对象添加effectTag属性
 * 为true时，用于更新
 * 为false时，用于初始渲染
 * 注：初始化渲染有一个特别的地方，只有根组件需要添加effectTag属性，
 * 		根组件内部的元素不需要添加effectTag。（为了防止过多的dom操作）
 * @returns
 */
function ChildReconciler(shouldTrackEffects: boolean) {
	// 处理子元素是单个对象的情况
	function reconcileSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElementType
	) {
		// createFiberFromElement：根据element创建fiber；根据vdom创建Fiber对象
		const fiber = createFiberFromElement(element);
		fiber.return = returnFiber;
		return fiber;
	}

	// 处理子元素是文本或者数值的情况
	function reconcileSingleTextNode(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | number
	) {
		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber;
		return fiber;
	}

	function placeSingleChild(fiber: FiberNode) {
		if (shouldTrackEffects && fiber.alternate === null) {
			fiber.flags |= Placement;
		}
		return fiber;
	}

	return function reconcileChildFibers(
		returnFiber: FiberNode, // 父级Fiber对象
		currentFiber: FiberNode | null, // 旧的第一个子Fiber(当前的子节点的current FiberNode)
		newChild?: ReactElementType // 新的子级vdom对象（我们要构建这个vdom对象所对应的Fiber对象）；子节点的react element
	) {
		// 判断当前fiber的类型
		if (typeof newChild === 'object' && newChild !== null) {
			switch (newChild.$$typeof) {
				// 子元素为ReactElement
				case REACT_ELEMENT_TYPE:
					return placeSingleChild(
						reconcileSingleElement(returnFiber, currentFiber, newChild)
					);
				default:
					// if (__DEV__) {
					// 	console.warn('未实现的reconcile类型', newChild);
					// }
					break;
			}
		}
		// TODO 多节点的情况 ul> li*3

		// HostText
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return placeSingleChild(
				reconcileSingleTextNode(returnFiber, currentFiber, newChild)
			);
		}

		// if (__DEV__) {
		// 	console.warn('未实现的reconcile类型', newChild);
		// }
		return null;
	};
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
