https://www.bilibili.com/video/BV1bK4y1a7f2/?spm_id_from=333.337.search-card.all.click&vd_source=a7089a0e007e4167b4a61ef53acc6f7e

| <img src="10React Diff.assets/image-20240801100829651.png" alt="image-20240801100829651" style="zoom: 33%;" /> | <img src="10React Diff.assets/image-20240801100939167.png" alt="image-20240801100939167" style="zoom: 33%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="10React Diff.assets/image-20240801101248597.png" alt="image-20240801101248597" style="zoom: 67%;" /> | ![image-20240801101107059](10React Diff.assets/image-20240801101107059.png) |
| 上图中的第一点有问题：不使用虚拟DOM，也可以将多次操作合并为一次操作 |                                                              |
| <img src="10React Diff.assets/image-20240801102042289.png" alt="image-20240801102042289" style="zoom:50%;" /> | <img src="10React Diff.assets/image-20240801102231319.png" alt="image-20240801102231319" style="zoom: 50%;" /> |

# React中虚拟DOM的优点

React中的虚拟DOM（Virtual DOM）具有以下几个优点：

1. **性能提升**：虚拟DOM通过最小化直接操作真实DOM的次数，提高了性能。React在内部维护一个虚拟DOM树，当状态变化时，它会创建一个新的虚拟DOM树并与旧的虚拟DOM树进行比较。只将发生变化的部分更新到真实DOM，从而减少了DOM操作的次数，提高了应用的性能。

2. **高效的更新机制**：虚拟DOM通过"差异算法"（Diffing Algorithm）来确定哪些部分需要更新。这个算法可以快速地找出两棵虚拟DOM树之间的差异，并仅更新这些差异部分，从而优化了DOM的更新过程。

3. **跨浏览器兼容性**：直接操作真实DOM时，可能会遇到浏览器兼容性的问题。虚拟DOM作为一个抽象层，可以帮助处理这些问题，使得React应用在不同的浏览器上表现一致。

4. **简化开发**：使用虚拟DOM，开发者可以专注于编写组件的逻辑，而不需要担心频繁的DOM操作和更新。React会处理复杂的DOM操作，使得开发过程更简单、代码更清晰。

5. **避免性能瓶颈**：在传统的DOM操作中，每次更新都可能导致重新渲染整个页面，尤其是在数据变化频繁的情况下。虚拟DOM通过优化更新过程，避免了这种性能瓶颈，使得应用更流畅。

总的来说，虚拟DOM通过提高性能、简化开发过程和优化更新机制，使得React在构建现代前端应用时具有很大的优势。

