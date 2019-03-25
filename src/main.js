import React, { Component } from 'react';
import './App.css';
import './main.css';
import Dashboard from './compopnents/Dashboard';
import Model from './compopnents/Model';
import ReactModal from 'react-modal';

const customStyles = {
    content:{
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '53%',
        height                : '60%'
    }
};

ReactModal.setAppElement('#root');

class Main extends Component{
    constructor (props) {
        super(props);

        //if no authenticate
        console.log(props.location.state);
        if(!props.location.state){
            props.history.push('/Login');
        }

        this.state = {
          showModal: false,
          icao: '',
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
      
    handleOpenModal = (title) => {
        this.setState({ showModal: true });
        console.log("AA: "+title);
        this.setState({icao: title});
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    subtractMin = (min) => {
        var result = new Date();
        result.setMinutes(result.getMinutes() - min);
        return Math.round(result.getTime()/1000);
    }

    ICAO = ["KDFW","KIAH","KJFK","KATL","KSFO","KLAX","KORD","KDEN","KLAS","KSEA"];
    

    render() {

         const airports = this.ICAO.map(airport => {
             return <Dashboard 
                key={airport}
                title={airport}
                clicked={() => this.handleOpenModal(airport)}
            />;
         });

        return (
            
            <div>
                <section className="dashboard">
                    {airports}
                </section>
                <ReactModal 
                    style={customStyles}
                    isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                >
                    <Model title={this.state.icao}/>
                    <button onClick={this.handleCloseModal}>Close</button>
                </ReactModal>
            </div>
            
        );
      }

}

export default Main;