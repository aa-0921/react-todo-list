import React, { Component } from 'react';
import './App.css';
import ToDoListItem from "./ToDoListItem.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <form className="App-form"
        >
          <div>
            <input
              id="title"
              placeholder="title"
            />
            <textarea
              id="title"
              placeholder="description"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              登録
            </button>
          </div>
        </form>
        <div>
          <ToDoListItem
            title="ホームページ作成"
            description="サークルホームページを今週中に作成する"
          />
        </div>
      </div>
    );
  }
}

export default App;
