import { Container } from 'hostConfig';
import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode, FiberRootNode } from './fiber';
import {
	createUpdate,
	createUpdateQueue,
	enqueueUpdate,
	UpdateQueue
} from './updateQueue';
import { scheduleUpdateOnFiber } from './workLoop';
import { HostRoot } from './workTags';

// ReactDOM.createRoot(rootElement).render(<App/>)
// 当执行ReactDOM.createRoot()之后，
// createRoot方法内部就会执行createContainer
// 而当我们在执行updateContainer以后，
// 在render方法内部就会执行updateContainer
export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null); // WorkTag, pendingProps, key
	const root = new FiberRootNode(container, hostRootFiber); // FiberRootNode：当前应用统一的根节点
	hostRootFiber.updateQueue = createUpdateQueue(); // hostRootFiber：rootElement对应的DOM对应的Fiber节点
	// 创建updateQueue：这样就能跟之前实现的更新机制联系上了
	// 为fiber对象初始化updateQueue属性
	// updateQueue用于存放Update对象
	// Update对象用于记录组件状态的变化
	return root;
}

/**
 * 所做的最核心的事情：创建一个任务对象,将其放在任务队列中
 * 当前所做的事情是初始化渲染，它会把初始化渲染当做一个任务去执行
 * @param element 要渲染的React元素
 * @param root Fiber Root对象
 * @returns
 */
export function updateContainer(
	element: ReactElementType | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current; // rootFiber
	// 创建一个待执行任务
	const update = createUpdate<ReactElementType | null>(element);
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);
	// 调度和更新current对象
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
