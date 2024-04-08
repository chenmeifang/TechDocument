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
	return root;
}

export function updateContainer(
	element: ReactElementType | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	const update = createUpdate<ReactElementType | null>(element);
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
