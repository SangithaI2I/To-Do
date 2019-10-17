import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
    <header  className="head">
        <span className="to-doSign">To Do</span>
    </header>
    <div className="task-content">
      <Sidebar/>
      <Task/>
    </div>
    </div>
  );
}
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lists: [], value:''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
     return (
      <div className="sideBar" id="sideBar">  
      <a id="menu"  className="sidebar-menuIcon"><img src="assets/icons/menu.svg" className="menuIconDivision"/></a>
      <div className="sideBarContent">
          <div><p><a href="#"  className="sidebar-Icon"><i className="icon sunIcon" aria-hidden="true"></i></a></p></div>
          <div className="sideBarText" ><p> &nbsp;My Day</p></div>
      </div>
      <div className="sideBarContent">
          <div><p><a href="#" className="sidebar-Icon"><i className="icon starIcon"></i> </a></p></div>
          <div className="sideBarText" ><p> &nbsp;Important</p></div>
      </div>
      <div className="sideBarContent">
          <div><p><a href="#"  className="sidebar-Icon"><i className="icon calendarIcon"></i></a></p></div>
          <div className="sideBarText" ><p> &nbsp;Planned</p></div>
      </div>
      <div className="sideBarContent">
          <div><p><a href="#"  className="sidebar-Icon"><i className="icon customerIcon" aria-hidden="true" ></i></a></p></div>
          <div className="sideBarText"><p> &nbsp;Assigned to Me</p></div>
      </div>
      <div className="sideBarContent">
          <div><a href="#"  className="sidebar-Icon"><i className="icon homeIcon"></i></a></div>
          <div className="sideBarText" >
              <p className="defaultTask" > &nbsp;Tasks</p>
          </div>
      </div>
      <div className="sideBarContent" >         
        <ShowList className="sideBarText" lists = {this.state.lists}>
        
        </ShowList>
      </div>             
      <form  className="sideBarContent" >        
          <div><p><i className="icon plusIcon"></i></p></div>
          <div className="sideBarText">
              <input className="addList" onKeyUp={this.handleSubmit} placeholder= "New list" />
          </div>
      </form>
    </div>
     );
  }
    handleSubmit(e) {
        console.log(e.keyCode);
        this.setState({ value: e.target.value });
        console.log(this.state);
        if(e.key === 'Enter'){           
            var list = {
                id:this.state.lists.length,
                name:e.target.value
            }
            this.setState(state => ({
                lists: state.lists.concat(list)
              }));
            console.log("hello")
            console.log(this.state);
        }
    }
}

class ShowList extends React.Component {
    render() {
        return (
            
          <ul className="list-head">
              
            {this.props.lists.map(list => (
              <p key={list.id} className="set-flex">
            <div><p className="sideBarText"><i className="listIcon"></i></p></div>            
              {list.name}<br></br></p>
            ))}
          </ul>
        );
      }
}

class Task extends React.Component {
  render() {
    return (
        <div id="taskHead" className="taskHead"><input type="text"  className="taskSign"/>
            <div className="taskDiv">
                    <div className="task-subParent">
                        <input type="checkbox" className="task-checkbox" id="check"/>
                        <p className="existingTask"></p>
                    </div>
                <div className="task-input ">
                    <div><button className="sidebar-Icon addtask-button"><i className="icon plusIcon" aria-hidden="true"></i></button></div>
                    <div><input type="text" className="inputTask" id="inputTask" placeholder="Add Task"/></div>
                </div>
            </div>
        </div>
    );
  }
}


export default App;
