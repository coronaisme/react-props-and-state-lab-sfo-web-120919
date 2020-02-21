import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    }, () => console.log(this.state.filters))
  }

  createUrl = () => {
    console.log(this.state.filters.type)
    if(this.state.filters.type === 'all') {
      return '/api/pets'
    } else if (this.state.filters.type === "dog" || this.state.filters.type === "cat" || this.state.filters.type === "micropig" ){
      return `/api/pets?type=${this.state.filters.type}`
    } 
  }

  onFindPetsClick = () => {
    fetch(this.createUrl()).then(res => res.json()).then(data => this.setState((previousState) => {
      return {
        ...previousState, 
        pets: data
      }
    }, () => console.log(this.state)))
  }

  onAdoptPet = (petId) => {
    console.log("firing")
    this.setState((previousState) => {
      return {
        ...previousState, //get into state object
        pets: previousState.pets.map(pet => { //map over pets array to get a single pet
          if(pet.id === petId) {
            return {
              ...pet, //get into pet object
              isAdopted: true 
            }
          } else {
            return pet
          }
        }) 
      }
    }, () => console.log(petId))
}

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} filterType={this.state.filters.type} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
