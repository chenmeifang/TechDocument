/* eslint-disable @typescript-eslint/no-explicit-any */
import { Props, Key, Ref, ReactElementType } from 'shared/ReactTypes';
import { FunctionComponent, HostComponent, WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';

export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	memoizedProps: Props | null; // 上一次组件更新后的props（即 旧的props）
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags; // 各种操作标记
	updateQueue: unknown;

	// tag: WorkTag————fiberNode是什么类型的节点
	// pendingProps: 当前fiberNode接下来有哪些props需要改变
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 在Fiber对象中,有很多属性,主要分为四类:
		// 1.和dom实例对象相关的属性
		this.tag = tag;
		this.key = key;
		// HostComponent <div> div DOM
		this.stateNode = null;
		// 如果当前fiber表示的是普通dom节点，stateNode属性当中存储的就是节点对应的真实dom对象
		// 如果当前fiber表示的是类组件，stateNode属性当中存储的就是类组件的实例对象
		// 如果当前fiber表示的是函数组件，stateNode属性当中存储的就是null，因为函数组件没有实例
		// FunctionComponent () => {}
		this.type = null;
		// type: createElement方法的第一个参数，表示节点的类型
		// 如果当前节点是div或者span，type属性存储的就是字符类型的div，span
		// 如果当前元素是组件，type属性当中存储的就是组件的构造函数

		// 2.和构建fiber树相关的属性
		this.return = null; // 指向父fiberNode
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.ref = null;

		// 3.和组件状态相关的属性
		this.pendingProps = pendingProps; // 组件中即将更新的props
		this.memoizedProps = null; // 上一次组件更新后的props（即 旧的props）
		this.memoizedState = null; // 上一次组件更新后的state (即 旧的state)
		this.updateQueue = null; // 该Fiber对应的组件产生的状态更新会存放在这个这个队列里面

		this.alternate = null;
		// 4.和副作用相关的属性————可触发dom操作的属性
		this.flags = NoFlags;
	}
}

export function createFiberFromElement(element: ReactElementType): FiberNode {
	const { type, key, props } = element;
	let fiberTag: WorkTag = FunctionComponent;

	if (typeof type === 'string') {
		// <div/> type: 'div'
		fiberTag = HostComponent;
	}
	// else if (typeof type !== 'function' && __DEV__) {
	// 	console.warn('为定义的type类型', element);
	// }
	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	return fiber;
}

export class FiberRootNode {
	// ReactDOM.createRoot(rootElement).render(<App/>)
	container: Container; // 保存对应的宿主环境挂载的节点————rootElement节点
	current: FiberNode; // current指向hostRootFiber
	finishedWork: FiberNode | null; // 指向整个更新完成以后的hostRootFiber
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

/**
 * 构建workInProgress Fiber树中的rootFiber
 * 构建完成后会替换current fiber
 * 初始渲染pendingProps为null
 * @param current FiberRootNode.current 即 rootFiber
 * 				 current是currentFiber树中的rootFiber
 * current.alternate：表示workInProgress Fiber树里面的rootFiber
 * @param pendingProps
 * @returns FiberNode
 */
export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;

	if (wip === null) {
		// mount 首屏渲染
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	// 每次传进来一个FiberNode，经过一堆操作以后，返回FiberNode的alternate
	return wip;
};
