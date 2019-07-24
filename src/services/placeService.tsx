import React, { Component } from 'react'
import axios from 'axios'

export default class placeService extends Component {
    async getAllPlace() {
        return await axios.get("https://aivbnbapi.herokuapp.com/api/places");
    }
}

