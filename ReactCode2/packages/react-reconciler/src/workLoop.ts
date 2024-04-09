/* eslint-disable no-constant-condition */
import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;

// function prepareFreshStack(fiber: FiberNode) {
// 	workInProgress = fiber;
// }

/**
 * 构建workInProgress Fiber树以及里面的rootFiber对象
 * @param root 
 */
function prepareFreshStack(root: FiberRootNode) {
	// FiberRootNode不是一个普通的Fiber，不能直接拿来当workInProgress
	// 所以需要一个方法来创建workInProgress
	// workInProgress = root;

    // workInProgress：全局变量。表示每次为react元素构建的fiber对象
	workInProgress = createWorkInProgress(root.current, {});
}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// 在fiber中调度Update
	// 1.对于首屏渲染，传进来的fiber是hostRootFiber；
	// 2.对于其他流程，例如：this.setState，传进来的就是class component对应的fiber
	//					要从当前的fiber一直向上遍历到我们的根节点————FiberRootNode
	// TODO 调度功能

	// fiberRootNode
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}

/**
 * performSyncWorkOnRoot
 * renderRoot是谁调用的？
 * renderRoot接下来会执行更新的过程
 * 那么可以推测：触发更新的那些api会调用renderRoot
 * @param root 
 */
function renderRoot(root: FiberRootNode) {
	// 初始化:让当前workInProgress指向我们需要遍历的第一个FiberNode
	prepareFreshStack(root);

	do {
		try {
			workLoop();
			break;
		} catch (e) {
			console.warn('workLoop发生错误', e);
			workInProgress = null;
		}
	} while (true);
}

/**
 * workLoopSync
 * 开启一个循环，以同步的方式开始去构建Fiber对象
 * 构建其他react元素对应的fiber对象
 * 当该方法被调用完成以后，
 * 就说明workInProgress Fiber树当中的每一个Fiber节点就都已经构建完成了
 */
function workLoop() {
    // workInProgress是一个fiber对象
    // 它的值不为null意味着该fiber对象上仍然有更新要执行偶fiber
    // while方法支撑render阶段所有fiber节点的构建
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

// function workLoop() { 
// 	while (workInProgress !== null) {
// 		workInProgress = performUnitOfWork(workInProgress);
// 	}
// }

/**
 * 
 * @param fiber 
 */
function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;

	if (next === null) {
		// 说明没有子fiber，已经递归到最深层了，接下来需要开始‘归’了
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;

	do {
		completeWork(node);
		const sibling = node.sibling;

		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
