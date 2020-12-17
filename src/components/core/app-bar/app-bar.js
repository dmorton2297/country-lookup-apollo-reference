import React from 'react'
import { AppBarContainer } from './app-bar.style';

/**
 * 
 * @param {object} params - Object containing props
 * @param {string} params.title - Title to display
 */
const AppBar = ({ title }) => {
    return (
        <AppBarContainer>
            <h3>{title}</h3>
        </AppBarContainer>
    )
}

export default AppBar;

