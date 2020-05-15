import React, { Component } from 'react';
import './App.css';
import ToDoListItem from "./ToDoListItem.js"

class App extends Component {

  // ToDoListをstateに定義、初期値はlocalStorageから取得、空であれば[]
  state = {
    todoList: JSON.parse(localStorage.getItem("todoList")) || []
  }

  // todoListへのitemの追加 を行うaddTodoという関数を定義
  addTodo = (item, callBack) => {
    // todoList stateに追加
    this.setState(
      {
        // concat() メソッドは、配列に他の配列や値をつないでできた新しい配列を返します。元々のstate.todoListに追加のTodoをつなげてtodoListに代入
        todoList: this.state.todoList.concat(item)
      },
      () => {
        // localStorageにtodoList stateを保存
        // storage.setItem(keyName, keyValue);という形
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
        // callBack関数が引数に渡されていた場合に実行
        callBack && callBack()
      }
    )
  }

  // todoListからitemを削除
  removeTodo = (item, callBack) => {
    this.setState(
      {
        // ボタンを押した時に、「その要素以外」の要素で再度配列をつくり、todoListを更新
        todoList: this.state.todoList.filter(x => x !== item)
      },
      () => {
        // localStorageにtodoList stateを保存、
        // JSON.stringify() メソッドは、ある JavaScript のオブジェクトや値を JSON 文字列に変換します。
        // つまり、stateのtodoListにJSON形式で、todoListをセット！
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
        // callBack関数が引数に渡されていて、存在するなら（true）それを実行
        callBack && callBack()
      }
    )
  }

  render() {
    return (
      <div className="App">
        {/* 以下でどのようなformか設定 */}
        <form
          className="App-form"
          onSubmit={e => {
            // formのデフォルトのイベントをキャンセル
            e.preventDefault();

            // idがtitleのElementを取得
            const titleElement = e.target.elements["title"]
            // idがdescriptionのElementを取得
            const descriptionElement = e.target.elements["description"];

            this.addTodo(
              {
                title: titleElement.value,
                description: descriptionElement.value
              },
              () => {
                // stateの変更後に入力した値を空にする
                titleElement.value = "";
                descriptionElement.value = "";
              }
            )
          }}
        >
          <div>
            <input
              id="title"
              placeholder="ToDo" />
            <textarea
              id="description"
              placeholder="memo"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              ok!
            </button>
          </div>
        </form>
        <div>
        {/* todoList配列の要素数分ToDoListItemコンポーネントを展開 */}
          {this.state.todoList.map(todo => (
            <ToDoListItem
              // this.state.todoListの各要素のtitle,descriptionを順番に表示
              key={todo.title}
              title={todo.title}
              description={todo.description}
              // クリックされたItemをtodoList stateから削除
              onClick={() => this.removeTodo(todo)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;

