import React, { Component } from 'react'

export default class TodoList extends Component {
    componentDidMount(): void {
        const oInput: HTMLInputElement = document.querySelector('input');
        const oAddBtn: HTMLButtonElement = document.querySelector('.add-btn');
        const oTodoList: HTMLElement = document.querySelector('.todo-list');
    }
    render() {
        return (
            <div className="todo">
                <div className="todo-input">
                    <input type="text" placeholder="请输入代办项"></input>
                    <button className="add-btn">增加</button>
                </div>
                <div className="todo-list"></div>
            </div>
        )
    }
}
