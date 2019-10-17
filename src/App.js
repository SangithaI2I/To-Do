import React from 'react';
import './App.css';

function App() {
    return (
        <Body></Body>
    );
}
class Body extends React.Component {
    render() {
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
}
export default App;

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lists: [], value:'', sideBarClose:false};
        this.addList = this.addList.bind(this);
    }
    render() {
        let sidebarClassname = this.state.sideBarClose ? 'none' : 'sideBarText block';
        let sidebarWidth = this.state.sideBarClose ? 'sideBar closeSideBar' : 'sideBar';
        return (       
            <div className={sidebarWidth} id="sideBar"> 
                <a href="#1" id="menu"  className="sidebar-menuIcon" onClick={this.toggleSideMenu.bind(this)}><img src="assets/icons/menu.svg" alt="side-menu" className="menuIconDivision"/></a>
                <div className="sideBarContent">
                    <div><p><a href="#2" className="sidebar-Icon"><i className="icon sunIcon"></i></a></p></div>
                    <div className={sidebarClassname} ><p>&nbsp;My Day</p></div>
                </div>
                <div className="sideBarContent">
                    <div><p><a href="#3" className="sidebar-Icon"><i className="icon starIcon"></i> </a></p></div>
                    <div className={sidebarClassname} ><p> &nbsp;Important</p></div>
                </div>
                <div className="sideBarContent">
                    <div><p><a href="#4"  className="sidebar-Icon"><i className="icon calendarIcon"></i></a></p></div>
                    <div className={sidebarClassname} ><p> &nbsp;Planned</p></div>
                </div>
                <div className="sideBarContent">
                    <div><p><a href="#5"  className="sidebar-Icon"><i className="icon customerIcon" ></i></a></p></div>
                    <div className={sidebarClassname}><p> &nbsp;Assigned to Me</p></div>
                </div>
                <div className="sideBarContent">
                    <div><a href="#6"  className="sidebar-Icon"><i className="icon homeIcon"></i></a></div>
                    <div className={sidebarClassname}>
                        <p className="defaultTask" > &nbsp;Tasks</p>
                    </div>
                </div>
                <div className="sideBarContent" >         
                    <ShowList className={sidebarClassname} lists = {this.state.lists} ></ShowList>
                    
                </div>             
                <div className="sideBarContent" >        
                    <div><p><i className="icon plusIcon"></i></p></div>
                    <div className={sidebarClassname}>
                        <input className="addList" onKeyUp={this.addList}  placeholder= "New list" />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * It Add List into list array  
     * @param {Event} event - whenever keyup performed
     */
    addList(event) {
        this.setState({ value: event.target.value });
        if(event.key === 'Enter'){        
            var list = {
                id:this.state.lists.length,
                name:event.target.value,
                tasks:[],
                taskLength: 0,
                isFinished:false
            }
            this.setState(state => ({
                lists: state.lists.concat(list)
            }));
            console.log(this.state)
        }
    }

  toggleSideMenu(e) {
    this.setState({ sideBarClose: !this.state.sideBarClose});
  }
}

class ShowList extends React.Component {
    constructor(props) {
        super(props);
        this.showListDetails = this.showListDetails.bind(this);
    }
    render() {
        return (
          <ul className="list-head">
            {this.props.lists.map(list => (
              <div key={list.id} className="set-flex"  onClick={this.showListDetails.bind(this,list)}>
            <div><p className="sideBarText"><i className="listIcon"></i></p></div>            
              {list.name}<br></br></div>
            ))}
          </ul>
        );
    }
    showListDetails(list) {
        console.log("dsfdsf",list);
        return(
            <h1>dfg</h1>
        );
    }
}

class Task extends React.Component {
  render() {
    return (       
       <div id="taskHead" className="taskHead"><input type="text" value={this.props.name} className="taskSign"/>
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



