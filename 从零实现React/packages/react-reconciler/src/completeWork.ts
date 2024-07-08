import {
	appendInitialChild,
	createInstance,
	createTextInstance
} from 'hostConfig';
import { FiberNode } from './fiber';
import { NoFlags } from './fiberFlags';
import { HostRoot, HostText, HostComponent } from './workTags';

/**
 * 递归中的归
 * 创建节点真实DOM对象并将其添加到stateNode属性中
 * @param wip 
 * @returns 
 */
export const completeWork = (wip: FiberNode) => {
	const newProps = wip.pendingProps;
	const current = wip.alternate;

	// 匹配当前Fiber节点的类型（不是所有的Fiber节点都能创建其对应的DOM对象）
	switch (wip.tag) {
		// 普通的react元素
		case HostComponent:
			if (current !== null && wip.stateNode) {
				// update
			} else {
				// 1. 构建真实的DOM div span
				const instance = createInstance(wip.type, newProps);
				// 2. 将DOM插入到DOM树中；将所有的子级追加到父级
				appendAllChildren(instance, wip);
				wip.stateNode = instance;
			}
			bubbleProperties(wip);
			return null;
		case HostText:
			if (current !== null && wip.stateNode) {
				// update
			} else {
				// 1. 构建DOM
				const instance = createTextInstance(newProps.content);
				wip.stateNode = instance;
			}
			bubbleProperties(wip);
			return null;
		case HostRoot:
			bubbleProperties(wip);
			return null;
		default:
			// if (__DEV__) {
			// 	console.warn('未处理的completeWork情况', wip);
			// }
			break;
	}
};

/**
 * 这里的parent应该不是FiberNode，是dom节点???
 * @param parent 
 * @param wip 
 * @returns 
 */
function appendAllChildren(parent: FiberNode, wip: FiberNode) {
	let node = wip.child;

	while (node !== null) {
		if (node.tag === HostComponent || node.tag === HostText) {
			// node是普通react元素或者文本
			appendInitialChild(parent, node?.stateNode);
		} else if (node.child !== null) {
			node.child.return = node;
			node = node.child;
			continue;
		}

		// 如果node和wip是同一个节点
		// 说明node已经退回到父级，终止循环
		// 说明此时所有子级都已经追加到父级了
		if (node === wip) {
			return;
		}

		while (node.sibling === null) {
			if (node.return === null || node.return === wip) {
				return;
			}
			node = node?.return;
		}
		node.sibling.return = node.return;
		node = node.sibling;
	}
}

function bubbleProperties(wip: FiberNode) {
	let subtreeFlags = NoFlags;
	let child = wip.child;

	while (child !== null) {
		subtreeFlags |= child.subtreeFlags;
		subtreeFlags |= child.flags;

		child.return = wip;
		child = child.sibling;
	}
	wip.subtreeFlags |= subtreeFlags;
}
